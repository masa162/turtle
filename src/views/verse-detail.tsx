/** @jsxImportSource hono/jsx */

import { Layout } from './layout'
import type { Chapter, Verse } from '../types/bindings'

export const VerseDetailPage = ({ 
  verse,
  chapter,
  previousVerse,
  nextVerse
}: { 
  verse: Verse
  chapter: Chapter
  previousVerse: Verse | null
  nextVerse: Verse | null
}) => {
  return (
    <Layout title={`${verse.title} - ${chapter.title}`}>
      {/* パンくずナビゲーション */}
      <div class="bg-washi border-b border-matcha-light">
        <div class="container mx-auto px-4 py-4 max-w-4xl">
          <div class="flex items-center gap-2 text-sm text-sumi opacity-70">
            <a href="/" class="hover:text-matcha transition-colors">ホーム</a>
            <span>/</span>
            <a href={`/chapters/${chapter.slug}`} class="hover:text-matcha transition-colors">{chapter.title}</a>
            <span>/</span>
            <span class="text-sumi font-medium">{verse.title}</span>
          </div>
        </div>
      </div>

      {/* 節ヘッダー */}
      <div class="bg-gradient-to-br from-washi via-kinari to-washi border-b-4 border-matcha">
        <div class="container mx-auto px-4 py-12 max-w-4xl">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-16 h-16 rounded-full bg-matcha/10 flex items-center justify-center">
              <span class="text-2xl font-bold text-matcha">{verse.verse_order}</span>
            </div>
            <h1 class="text-4xl md:text-5xl font-bold font-serif text-sumi leading-tight">
              {verse.title}
            </h1>
          </div>
        </div>
      </div>

      {/* 音声プレーヤー */}
      {verse.audio_url && (
        <div class="bg-washi-dark border-b-2 border-matcha-light">
          <div class="container mx-auto px-4 py-6 max-w-4xl">
            <div class="flex items-center gap-4">
              <svg class="w-8 h-8 text-matcha flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
              </svg>
              <div class="flex-1">
                <audio controls class="w-full" preload="metadata">
                  <source src={verse.audio_url} type="audio/mpeg" />
                  お使いのブラウザは音声再生に対応していません。
                </audio>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 本文コンテンツ */}
      <div class="container mx-auto px-4 py-16 max-w-4xl">
        <article class="prose prose-lg max-w-none">
          <div 
            class="text-sumi leading-relaxed"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(verse.content) }}
          />
        </article>
      </div>

      {/* 前後ナビゲーション */}
      <div class="bg-washi border-t-2 border-matcha-light">
        <div class="container mx-auto px-4 py-8 max-w-4xl">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 前の節 */}
            {previousVerse ? (
              <a
                href={`/chapters/${chapter.slug}/verses/${previousVerse.id}`}
                class="group flex items-center gap-4 p-6 bg-white border-2 border-matcha-light rounded-xl hover:border-matcha hover:shadow-lg transition-all"
              >
                <svg class="w-8 h-8 text-matcha group-hover:text-shu group-hover:-translate-x-1 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
                </svg>
                <div class="flex-1 min-w-0">
                  <div class="text-sm text-matcha-dark mb-1">前の節</div>
                  <div class="font-bold text-sumi group-hover:text-shu transition-colors truncate">
                    {previousVerse.title}
                  </div>
                </div>
              </a>
            ) : (
              <div class="p-6 bg-gray-100 border-2 border-gray-200 rounded-xl opacity-50">
                <div class="text-sm text-gray-500">前の節はありません</div>
              </div>
            )}

            {/* 次の節 */}
            {nextVerse ? (
              <a
                href={`/chapters/${chapter.slug}/verses/${nextVerse.id}`}
                class="group flex items-center gap-4 p-6 bg-white border-2 border-matcha-light rounded-xl hover:border-matcha hover:shadow-lg transition-all"
              >
                <div class="flex-1 min-w-0 text-right">
                  <div class="text-sm text-matcha-dark mb-1">次の節</div>
                  <div class="font-bold text-sumi group-hover:text-shu transition-colors truncate">
                    {nextVerse.title}
                  </div>
                </div>
                <svg class="w-8 h-8 text-matcha group-hover:text-shu group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            ) : (
              <div class="p-6 bg-gray-100 border-2 border-gray-200 rounded-xl opacity-50 text-right">
                <div class="text-sm text-gray-500">次の節はありません</div>
              </div>
            )}
          </div>

          {/* 章一覧に戻る */}
          <div class="mt-6 text-center">
            <a
              href={`/chapters/${chapter.slug}`}
              class="inline-flex items-center gap-2 px-6 py-3 bg-matcha text-white rounded-lg hover:bg-matcha-dark transition-colors font-medium"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              {chapter.title}の節一覧に戻る
            </a>
          </div>
        </div>
      </div>
    </Layout>
  )
}

// 簡易Markdownレンダラー（改行とリンクのみ対応）
function renderMarkdown(markdown: string): string {
  return markdown
    .split('\n\n')
    .map(para => `<p>${para.replace(/\n/g, '<br>')}</p>`)
    .join('')
}
