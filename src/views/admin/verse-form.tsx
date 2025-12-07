/** @jsxImportSource hono/jsx */

import { AdminLayout } from './admin-layout'
import type { Chapter, Verse } from '../../types/bindings'

export const VerseFormPage = ({ 
  chapters,
  verse,
  selectedChapter,
  error,
  isEdit
}: { 
  chapters: Chapter[]
  verse?: Verse
  selectedChapter?: Chapter
  error?: string
  isEdit: boolean
}) => {
  return (
    <AdminLayout title={isEdit ? '節を編集' : '新規節を追加'}>
      <div class="mb-8">
        <a href="/admin/verses" class="text-matcha hover:text-matcha-dark transition-colors inline-flex items-center mb-4">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          節管理に戻る
        </a>
        <h1 class="text-4xl font-bold font-serif text-sumi mb-2">
          {isEdit ? '節を編集' : '新規節を追加'}
        </h1>
      </div>

      {error && (
        <div class="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
          <p class="text-red-600">{error}</p>
        </div>
      )}

      <form 
        method="POST" 
        action={isEdit ? `/admin/verses/edit/${verse?.id}` : '/admin/verses/new'}
        class="bg-white rounded-xl border-2 border-matcha-light p-8"
      >
        <div class="space-y-6">
          {!isEdit && (
            <div>
              <label for="chapter_id" class="block text-sm font-bold text-sumi mb-2">
                章 <span class="text-shu">*</span>
              </label>
              <select
                id="chapter_id"
                name="chapter_id"
                required
                class="w-full px-4 py-3 border-2 border-matcha-light rounded-lg focus:outline-none focus:border-matcha transition-colors"
              >
                <option value="">章を選択してください</option>
                {chapters.map((chapter) => (
                  <option 
                    key={chapter.id} 
                    value={chapter.id}
                    selected={selectedChapter?.id === chapter.id}
                  >
                    {chapter.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label for="title" class="block text-sm font-bold text-sumi mb-2">
              タイトル <span class="text-shu">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={verse?.title || ''}
              class="w-full px-4 py-3 border-2 border-matcha-light rounded-lg focus:outline-none focus:border-matcha transition-colors"
              placeholder="例: 第一節"
            />
          </div>

          <div>
            <label for="verse_order" class="block text-sm font-bold text-sumi mb-2">
              表示順序 <span class="text-shu">*</span>
            </label>
            <input
              type="number"
              id="verse_order"
              name="verse_order"
              required
              min="1"
              value={verse?.verse_order || 1}
              class="w-full px-4 py-3 border-2 border-matcha-light rounded-lg focus:outline-none focus:border-matcha transition-colors"
            />
            <p class="text-sm text-sumi opacity-70 mt-1">
              小さい数字ほど上に表示されます
            </p>
          </div>

          <div>
            <label for="content" class="block text-sm font-bold text-sumi mb-2">
              本文（Markdown） <span class="text-shu">*</span>
            </label>
            <textarea
              id="content"
              name="content"
              required
              rows={20}
              class="w-full px-4 py-3 border-2 border-matcha-light rounded-lg focus:outline-none focus:border-matcha transition-colors font-mono text-sm"
              placeholder="Markdown形式で本文を入力してください"
            >{verse?.content || ''}</textarea>
            <p class="text-sm text-sumi opacity-70 mt-1">
              Markdown形式で記述できます。改行は2回で段落になります。
            </p>
          </div>

          <div>
            <label for="audio_url" class="block text-sm font-bold text-sumi mb-2">
              音声URL
            </label>
            <input
              type="url"
              id="audio_url"
              name="audio_url"
              value={verse?.audio_url || ''}
              class="w-full px-4 py-3 border-2 border-matcha-light rounded-lg focus:outline-none focus:border-matcha transition-colors font-mono text-sm"
              placeholder="例: https://wave.be2nd.com/xxxxx.m4a"
            />
            <p class="text-sm text-sumi opacity-70 mt-1">
              wavestkから発行された音声URLを入力してください
            </p>
          </div>
        </div>

        <div class="mt-8 flex items-center gap-4">
          <button
            type="submit"
            class="px-6 py-3 bg-matcha hover:bg-matcha-dark text-white rounded-lg transition-colors font-medium"
          >
            {isEdit ? '更新する' : '作成する'}
          </button>
          <a
            href="/admin/verses"
            class="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-sumi rounded-lg transition-colors font-medium"
          >
            キャンセル
          </a>
        </div>
      </form>
    </AdminLayout>
  )
}
