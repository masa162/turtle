/** @jsxImportSource hono/jsx */

import { Hono } from 'hono'
import { getAssetFromKV } from '@cloudflare/kv-asset-handler'
import type { Bindings, Variables } from './types/bindings'
import { Database } from './lib/db'
import { HomePage } from './views/home'
import { ChapterDetailPage } from './views/chapter-detail'
import { VerseDetailPage } from './views/verse-detail'
import { DashboardPage } from './views/admin/dashboard'
import { ChaptersPage } from './views/admin/chapters'
import { ChapterFormPage } from './views/admin/chapter-form'
import { VersesPage } from './views/admin/verses'
import { VerseFormPage } from './views/admin/verse-form'
import { adminAuth } from './lib/auth'
import manifestJSON from '__STATIC_CONTENT_MANIFEST'

const assetManifest = JSON.parse(manifestJSON)

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>()

// 静的ファイル配信（Workers Sites KV）
app.get('/styles.css', async (c) => {
  try {
    return await getAssetFromKV(
      {
        request: c.req.raw,
        waitUntil: c.executionCtx.waitUntil.bind(c.executionCtx),
      },
      {
        ASSET_NAMESPACE: c.env.__STATIC_CONTENT,
        ASSET_MANIFEST: assetManifest,
      }
    )
  } catch (e) {
    return c.text('File not found', 404)
  }
})

// ========== 公開ページ ==========

// ホームページ（章一覧）
app.get('/', async (c) => {
  const db = new Database(c.env.DB)
  const chapters = await db.getChapters()
  return c.html(<HomePage chapters={chapters} />)
})

// 章詳細ページ（節一覧）
app.get('/chapters/:slug', async (c) => {
  const slug = c.req.param('slug')
  const db = new Database(c.env.DB)

  const chapter = await db.getChapterBySlug(slug)
  if (!chapter) {
    return c.text('章が見つかりません', 404)
  }

  const verses = await db.getVersesByChapterId(chapter.id)
  return c.html(<ChapterDetailPage chapter={chapter} verses={verses} />)
})

// 節詳細ページ
app.get('/chapters/:slug/verses/:verseId', async (c) => {
  const slug = c.req.param('slug')
  const verseId = c.req.param('verseId')
  const db = new Database(c.env.DB)

  const verse = await db.getVerseById(verseId)
  if (!verse) {
    return c.text('節が見つかりません', 404)
  }

  const chapter = await db.getChapterBySlug(slug)
  if (!chapter) {
    return c.text('章が見つかりません', 404)
  }

  const previousVerse = await db.getPreviousVerse(chapter.id, verse.verse_order)
  const nextVerse = await db.getNextVerse(chapter.id, verse.verse_order)

  return c.html(
    <VerseDetailPage 
      verse={verse} 
      chapter={chapter} 
      previousVerse={previousVerse}
      nextVerse={nextVerse}
    />
  )
})

// ========== 管理画面 ==========

// ダッシュボード
app.get('/admin', adminAuth, async (c) => {
  const db = new Database(c.env.DB)
  const chapters = await db.getChapters()

  let totalVerses = 0
  let versesWithAudio = 0

  for (const chapter of chapters) {
    const verses = await db.getVersesByChapterId(chapter.id)
    totalVerses += verses.length
    versesWithAudio += verses.filter(v => v.audio_url).length
  }

  const stats = {
    totalChapters: chapters.length,
    totalVerses,
    versesWithAudio
  }

  return c.html(<DashboardPage stats={stats} />)
})

// ========== 章管理 ==========

// 章一覧
app.get('/admin/chapters', adminAuth, async (c) => {
  const db = new Database(c.env.DB)
  const chapters = await db.getChapters()
  return c.html(<ChaptersPage chapters={chapters} />)
})

// 章作成フォーム
app.get('/admin/chapters/new', adminAuth, async (c) => {
  return c.html(<ChapterFormPage isEdit={false} />)
})

// 章作成処理
app.post('/admin/chapters/new', adminAuth, async (c) => {
  const db = new Database(c.env.DB)

  try {
    const formData = await c.req.parseBody()
    const title = formData.title as string
    const slug = formData.slug as string
    const description = formData.description as string
    const orderIndex = parseInt(formData.order_index as string)

    if (!title || !slug || !orderIndex) {
      return c.html(
        <ChapterFormPage 
          isEdit={false} 
          error="すべての必須項目を入力してください。"
        />
      )
    }

    const id = `chapter-${slug}`

    await db.createChapter({
      id,
      slug,
      title,
      description: description || null,
      order_index: orderIndex
    })

    return c.redirect('/admin/chapters')

  } catch (error) {
    console.error('Create chapter error:', error)
    return c.html(
      <ChapterFormPage 
        isEdit={false} 
        error="章の作成に失敗しました。"
      />
    )
  }
})

// 章編集フォーム
app.get('/admin/chapters/edit/:id', adminAuth, async (c) => {
  const db = new Database(c.env.DB)
  const chapterId = c.req.param('id')

  const chapter = await db.getChapterById(chapterId)

  if (!chapter) {
    return c.redirect('/admin/chapters')
  }

  return c.html(<ChapterFormPage chapter={chapter} isEdit={true} />)
})

// 章編集処理
app.post('/admin/chapters/edit/:id', adminAuth, async (c) => {
  const db = new Database(c.env.DB)
  const chapterId = c.req.param('id')

  try {
    const formData = await c.req.parseBody()
    const title = formData.title as string
    const slug = formData.slug as string
    const description = formData.description as string
    const orderIndex = parseInt(formData.order_index as string)

    const chapter = await db.getChapterById(chapterId)
    if (!chapter) {
      return c.redirect('/admin/chapters')
    }

    if (!title || !slug || !orderIndex) {
      return c.html(
        <ChapterFormPage 
          chapter={chapter}
          isEdit={true} 
          error="すべての必須項目を入力してください。"
        />
      )
    }

    await db.updateChapter(chapterId, {
      title,
      slug,
      description: description || null,
      order_index: orderIndex
    })

    return c.redirect('/admin/chapters')

  } catch (error) {
    console.error('Update chapter error:', error)
    const chapter = await db.getChapterById(chapterId)
    return c.html(
      <ChapterFormPage 
        chapter={chapter}
        isEdit={true} 
        error="章の更新に失敗しました。"
      />
    )
  }
})

// 章削除処理
app.post('/admin/chapters/delete/:id', adminAuth, async (c) => {
  const db = new Database(c.env.DB)
  const chapterId = c.req.param('id')

  try {
    await db.deleteChapter(chapterId)
    return c.redirect('/admin/chapters')
  } catch (error) {
    console.error('Delete chapter error:', error)
    return c.redirect('/admin/chapters')
  }
})

// ========== 節管理 ==========

// 節一覧
app.get('/admin/verses', adminAuth, async (c) => {
  const db = new Database(c.env.DB)
  const chapters = await db.getChapters()

  const chapterIdParam = c.req.query('chapter_id')
  const selectedChapterId = chapterIdParam || undefined

  let verses
  let selectedChapter
  if (selectedChapterId) {
    verses = await db.getVersesByChapterId(selectedChapterId)
    selectedChapter = chapters.find(ch => ch.id === selectedChapterId)
  }

  return c.html(
    <VersesPage 
      chapters={chapters} 
      verses={verses} 
      selectedChapter={selectedChapter}
    />
  )
})

// 節作成フォーム
app.get('/admin/verses/new', adminAuth, async (c) => {
  const db = new Database(c.env.DB)
  const chapters = await db.getChapters()

  const chapterIdParam = c.req.query('chapter_id')
  const selectedChapterId = chapterIdParam || undefined
  const selectedChapter = selectedChapterId ? chapters.find(ch => ch.id === selectedChapterId) : undefined

  return c.html(
    <VerseFormPage 
      chapters={chapters} 
      selectedChapter={selectedChapter}
      isEdit={false} 
    />
  )
})

// 節作成処理
app.post('/admin/verses/new', adminAuth, async (c) => {
  const db = new Database(c.env.DB)

  try {
    const formData = await c.req.parseBody()
    const chapterId = formData.chapter_id as string
    const title = formData.title as string
    const verseOrder = parseInt(formData.verse_order as string)
    const content = formData.content as string
    const audioUrl = formData.audio_url as string

    if (!chapterId || !title || !verseOrder || !content) {
      const chapters = await db.getChapters()
      return c.html(
        <VerseFormPage 
          chapters={chapters}
          isEdit={false} 
          error="すべての必須項目を入力してください。"
        />
      )
    }

    const id = `${chapterId}-verse-${verseOrder}`

    await db.createVerse({
      id,
      chapter_id: chapterId,
      verse_order: verseOrder,
      title,
      content,
      audio_url: audioUrl || null
    })

    return c.redirect(`/admin/verses?chapter_id=${chapterId}`)

  } catch (error) {
    console.error('Create verse error:', error)
    const chapters = await db.getChapters()
    return c.html(
      <VerseFormPage 
        chapters={chapters}
        isEdit={false} 
        error="節の作成に失敗しました。"
      />
    )
  }
})

// 節編集フォーム
app.get('/admin/verses/edit/:id', adminAuth, async (c) => {
  const db = new Database(c.env.DB)
  const verseId = c.req.param('id')

  const verse = await db.getVerseById(verseId)

  if (!verse) {
    return c.redirect('/admin/verses')
  }

  const chapters = await db.getChapters()

  return c.html(
    <VerseFormPage 
      chapters={chapters} 
      verse={verse} 
      isEdit={true} 
    />
  )
})

// 節編集処理
app.post('/admin/verses/edit/:id', adminAuth, async (c) => {
  const db = new Database(c.env.DB)
  const verseId = c.req.param('id')

  try {
    const formData = await c.req.parseBody()
    const title = formData.title as string
    const verseOrder = parseInt(formData.verse_order as string)
    const content = formData.content as string
    const audioUrl = formData.audio_url as string

    const verse = await db.getVerseById(verseId)
    if (!verse) {
      return c.redirect('/admin/verses')
    }

    if (!title || !verseOrder || !content) {
      const chapters = await db.getChapters()
      return c.html(
        <VerseFormPage 
          chapters={chapters}
          verse={verse}
          isEdit={true} 
          error="すべての必須項目を入力してください。"
        />
      )
    }

    await db.updateVerse(verseId, {
      title,
      verse_order: verseOrder,
      content,
      audio_url: audioUrl || null
    })

    return c.redirect(`/admin/verses?chapter_id=${verse.chapter_id}`)

  } catch (error) {
    console.error('Update verse error:', error)
    const chapters = await db.getChapters()
    const verse = await db.getVerseById(verseId)
    return c.html(
      <VerseFormPage 
        chapters={chapters}
        verse={verse}
        isEdit={true} 
        error="節の更新に失敗しました。"
      />
    )
  }
})

// 節削除処理
app.post('/admin/verses/delete/:id', adminAuth, async (c) => {
  const db = new Database(c.env.DB)
  const verseId = c.req.param('id')

  try {
    const verse = await db.getVerseById(verseId)
    const chapterId = verse?.chapter_id

    await db.deleteVerse(verseId)

    return c.redirect(`/admin/verses?chapter_id=${chapterId}`)

  } catch (error) {
    console.error('Delete verse error:', error)
    return c.redirect('/admin/verses')
  }
})

// ヘルスチェック
app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

export default app
