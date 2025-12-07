/** @jsxImportSource hono/jsx */

import { AdminLayout } from './admin-layout'
import type { Chapter } from '../../types/bindings'

export const ChaptersPage = ({ 
  chapters 
}: { 
  chapters: Chapter[]
}) => {
  return (
    <AdminLayout title="章管理">
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-4xl font-bold font-serif text-sumi mb-2">章管理</h1>
          <p class="text-sumi opacity-70">章の一覧・作成・編集・削除</p>
        </div>
        <a
          href="/admin/chapters/new"
          class="px-6 py-3 bg-matcha hover:bg-matcha-dark text-white rounded-lg transition-colors font-medium inline-flex items-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          新規章を追加
        </a>
      </div>

      {chapters.length === 0 ? (
        <div class="text-center py-16 bg-white rounded-xl border-2 border-matcha-light">
          <p class="text-gray-500 mb-4 text-lg">章が登録されていません</p>
          <a
            href="/admin/chapters/new"
            class="inline-block px-6 py-3 bg-matcha hover:bg-matcha-dark text-white rounded-lg transition-colors font-medium"
          >
            最初の章を追加
          </a>
        </div>
      ) : (
        <div class="bg-white rounded-xl border-2 border-matcha-light overflow-hidden">
          <table class="w-full">
            <thead class="bg-washi border-b-2 border-matcha-light">
              <tr>
                <th class="px-6 py-4 text-left text-sm font-bold text-sumi">順序</th>
                <th class="px-6 py-4 text-left text-sm font-bold text-sumi">タイトル</th>
                <th class="px-6 py-4 text-left text-sm font-bold text-sumi">スラッグ</th>
                <th class="px-6 py-4 text-right text-sm font-bold text-sumi">操作</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-matcha-light">
              {chapters.map((chapter) => (
                <tr key={chapter.id} class="hover:bg-washi transition-colors">
                  <td class="px-6 py-4">
                    <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-matcha/10 text-matcha font-bold">
                      {chapter.order_index}
                    </span>
                  </td>
                  <td class="px-6 py-4">
                    <div class="font-bold text-sumi">{chapter.title}</div>
                    {chapter.description && (
                      <div class="text-sm text-sumi opacity-70 mt-1 line-clamp-1">
                        {chapter.description}
                      </div>
                    )}
                  </td>
                  <td class="px-6 py-4">
                    <code class="text-sm bg-washi px-2 py-1 rounded text-matcha-dark">
                      {chapter.slug}
                    </code>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex items-center justify-end gap-2">
                      <a
                        href={`/chapters/${chapter.slug}`}
                        target="_blank"
                        class="px-3 py-2 text-sm bg-washi hover:bg-washi-dark text-sumi rounded-lg transition-colors"
                      >
                        表示
                      </a>
                      <a
                        href={`/admin/chapters/edit/${chapter.id}`}
                        class="px-3 py-2 text-sm bg-matcha hover:bg-matcha-dark text-white rounded-lg transition-colors"
                      >
                        編集
                      </a>
                      <form method="POST" action={`/admin/chapters/delete/${chapter.id}`} class="inline">
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
    </AdminLayout>
  )
}
