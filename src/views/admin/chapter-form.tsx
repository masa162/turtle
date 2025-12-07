/** @jsxImportSource hono/jsx */

import { AdminLayout } from './admin-layout'
import type { Chapter } from '../../types/bindings'

export const ChapterFormPage = ({ 
  chapter,
  error,
  isEdit
}: { 
  chapter?: Chapter
  error?: string
  isEdit: boolean
}) => {
  return (
    <AdminLayout title={isEdit ? '章を編集' : '新規章を追加'}>
      <div class="mb-8">
        <a href="/admin/chapters" class="text-matcha hover:text-matcha-dark transition-colors inline-flex items-center mb-4">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          章管理に戻る
        </a>
        <h1 class="text-4xl font-bold font-serif text-sumi mb-2">
          {isEdit ? '章を編集' : '新規章を追加'}
        </h1>
      </div>

      {error && (
        <div class="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
          <p class="text-red-600">{error}</p>
        </div>
      )}

      <form 
        method="POST" 
        action={isEdit ? `/admin/chapters/edit/${chapter?.id}` : '/admin/chapters/new'}
        class="bg-white rounded-xl border-2 border-matcha-light p-8"
      >
        <div class="space-y-6">
          <div>
            <label for="title" class="block text-sm font-bold text-sumi mb-2">
              タイトル <span class="text-shu">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={chapter?.title || ''}
              class="w-full px-4 py-3 border-2 border-matcha-light rounded-lg focus:outline-none focus:border-matcha transition-colors"
              placeholder="例: 上古天真論"
            />
          </div>

          <div>
            <label for="slug" class="block text-sm font-bold text-sumi mb-2">
              スラッグ <span class="text-shu">*</span>
            </label>
            <input
              type="text"
              id="slug"
              name="slug"
              required
              value={chapter?.slug || ''}
              class="w-full px-4 py-3 border-2 border-matcha-light rounded-lg focus:outline-none focus:border-matcha transition-colors font-mono"
              placeholder="例: shang-gu-tian-zhen-lun"
              pattern="[a-z0-9-]+"
            />
            <p class="text-sm text-sumi opacity-70 mt-1">
              半角英数字とハイフンのみ使用可能
            </p>
          </div>

          <div>
            <label for="description" class="block text-sm font-bold text-sumi mb-2">
              説明
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              class="w-full px-4 py-3 border-2 border-matcha-light rounded-lg focus:outline-none focus:border-matcha transition-colors"
              placeholder="章の説明を入力してください"
            >{chapter?.description || ''}</textarea>
          </div>

          <div>
            <label for="order_index" class="block text-sm font-bold text-sumi mb-2">
              表示順序 <span class="text-shu">*</span>
            </label>
            <input
              type="number"
              id="order_index"
              name="order_index"
              required
              min="1"
              value={chapter?.order_index || 1}
              class="w-full px-4 py-3 border-2 border-matcha-light rounded-lg focus:outline-none focus:border-matcha transition-colors"
            />
            <p class="text-sm text-sumi opacity-70 mt-1">
              小さい数字ほど上に表示されます
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
            href="/admin/chapters"
            class="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-sumi rounded-lg transition-colors font-medium"
          >
            キャンセル
          </a>
        </div>
      </form>
    </AdminLayout>
  )
}
