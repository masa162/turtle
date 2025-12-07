/** @jsxImportSource hono/jsx */

import { AdminLayout } from './admin-layout'
import type { Chapter, Verse } from '../../types/bindings'

export const VersesPage = ({ 
  chapters,
  verses,
  selectedChapter
}: { 
  chapters: Chapter[]
  verses?: Verse[]
  selectedChapter?: Chapter
}) => {
  return (
    <AdminLayout title="節管理">
      <div class="mb-8">
        <h1 class="text-4xl font-bold font-serif text-sumi mb-2">節管理</h1>
        <p class="text-sumi opacity-70">節の一覧・作成・編集・削除</p>
      </div>

      {/* 章選択 */}
      <div class="mb-6 bg-white rounded-xl border-2 border-matcha-light p-6">
        <label for="chapter_select" class="block text-sm font-bold text-sumi mb-3">
          章を選択
        </label>
        <select
          id="chapter_select"
          onchange="window.location.href = '/admin/verses?chapter_id=' + this.value"
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

      {selectedChapter && (
        <>
          <div class="mb-6 flex items-center justify-between">
            <div>
              <h2 class="text-2xl font-bold font-serif text-sumi">
                {selectedChapter.title} の節一覧
              </h2>
            </div>
            <a
              href={`/admin/verses/new?chapter_id=${selectedChapter.id}`}
              class="px-6 py-3 bg-matcha hover:bg-matcha-dark text-white rounded-lg transition-colors font-medium inline-flex items-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              新規節を追加
            </a>
          </div>

          {!verses || verses.length === 0 ? (
            <div class="text-center py-16 bg-white rounded-xl border-2 border-matcha-light">
              <p class="text-gray-500 mb-4 text-lg">節が登録されていません</p>
              <a
                href={`/admin/verses/new?chapter_id=${selectedChapter.id}`}
                class="inline-block px-6 py-3 bg-matcha hover:bg-matcha-dark text-white rounded-lg transition-colors font-medium"
              >
                最初の節を追加
              </a>
            </div>
          ) : (
            <div class="bg-white rounded-xl border-2 border-matcha-light overflow-hidden">
              <table class="w-full">
                <thead class="bg-washi border-b-2 border-matcha-light">
                  <tr>
                    <th class="px-6 py-4 text-left text-sm font-bold text-sumi">順序</th>
                    <th class="px-6 py-4 text-left text-sm font-bold text-sumi">タイトル</th>
                    <th class="px-6 py-4 text-left text-sm font-bold text-sumi">音声</th>
                    <th class="px-6 py-4 text-right text-sm font-bold text-sumi">操作</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-matcha-light">
                  {verses.map((verse) => (
                    <tr key={verse.id} class="hover:bg-washi transition-colors">
                      <td class="px-6 py-4">
                        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-matcha/10 text-matcha font-bold">
                          {verse.verse_order}
                        </span>
                      </td>
                      <td class="px-6 py-4">
                        <div class="font-bold text-sumi">{verse.title}</div>
                      </td>
                      <td class="px-6 py-4">
                        {verse.audio_url ? (
                          <span class="inline-flex items-center gap-1 text-sm text-matcha">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                            </svg>
                            あり
                          </span>
                        ) : (
                          <span class="text-sm text-gray-400">なし</span>
                        )}
                      </td>
                      <td class="px-6 py-4">
                        <div class="flex items-center justify-end gap-2">
                          <a
                            href={`/chapters/${selectedChapter.slug}/verses/${verse.id}`}
                            target="_blank"
                            class="px-3 py-2 text-sm bg-washi hover:bg-washi-dark text-sumi rounded-lg transition-colors"
                          >
                            表示
                          </a>
                          <a
                            href={`/admin/verses/edit/${verse.id}`}
                            class="px-3 py-2 text-sm bg-matcha hover:bg-matcha-dark text-white rounded-lg transition-colors"
                          >
                            編集
                          </a>
                          <form method="POST" action={`/admin/verses/delete/${verse.id}`} class="inline">
                            <button
                              type="submit"
                              onclick="return confirm('本当に削除しますか？')"
                              class="px-3 py-2 text-sm bg-shu hover:bg-shu-light text-white rounded-lg transition-colors"
                            >
                              削除
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </AdminLayout>
  )
}
