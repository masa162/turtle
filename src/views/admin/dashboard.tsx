/** @jsxImportSource hono/jsx */

import { AdminLayout } from './admin-layout'

interface DashboardStats {
  totalChapters: number
  totalVerses: number
  versesWithAudio: number
}

export const DashboardPage = ({ stats }: { stats: DashboardStats }) => {
  return (
    <AdminLayout title="ダッシュボード">
      <div class="mb-8">
        <h1 class="text-4xl font-bold font-serif text-sumi mb-2">ダッシュボード</h1>
        <p class="text-sumi opacity-70">黃亀図書室の管理画面</p>
      </div>

      {/* 統計カード */}
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-gradient-to-br from-kinari to-washi border-2 border-matcha-light p-6 rounded-xl">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-matcha-dark mb-1">章の数</p>
              <p class="text-4xl font-bold text-sumi">{stats.totalChapters}</p>
            </div>
            <div class="w-16 h-16 bg-matcha/10 rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 text-matcha" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-kinari to-washi border-2 border-matcha-light p-6 rounded-xl">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-matcha-dark mb-1">節の数</p>
              <p class="text-4xl font-bold text-sumi">{stats.totalVerses}</p>
            </div>
            <div class="w-16 h-16 bg-matcha/10 rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 text-matcha" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-kinari to-washi border-2 border-matcha-light p-6 rounded-xl">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-matcha-dark mb-1">音声付き節</p>
              <p class="text-4xl font-bold text-sumi">{stats.versesWithAudio}</p>
            </div>
            <div class="w-16 h-16 bg-matcha/10 rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 text-matcha" fill="currentColor" viewBox="0 0 20 20">
                <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* クイックアクション */}
      <div class="bg-white border-2 border-matcha-light p-6 rounded-xl">
        <h2 class="text-2xl font-bold font-serif text-sumi mb-4">クイックアクション</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/admin/chapters"
            class="flex items-center gap-4 p-4 border-2 border-matcha-light rounded-lg hover:border-matcha hover:shadow-lg transition-all group"
          >
            <div class="w-12 h-12 bg-matcha/10 rounded-lg flex items-center justify-center group-hover:bg-matcha/20 transition-colors">
              <svg class="w-6 h-6 text-matcha" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
            </div>
            <div>
              <div class="font-bold text-sumi group-hover:text-shu transition-colors">章を管理</div>
              <div class="text-sm text-sumi opacity-70">章の作成・編集・削除</div>
            </div>
          </a>

          <a
            href="/admin/verses"
            class="flex items-center gap-4 p-4 border-2 border-matcha-light rounded-lg hover:border-matcha hover:shadow-lg transition-all group"
          >
            <div class="w-12 h-12 bg-matcha/10 rounded-lg flex items-center justify-center group-hover:bg-matcha/20 transition-colors">
              <svg class="w-6 h-6 text-matcha" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd" />
              </svg>
            </div>
            <div>
              <div class="font-bold text-sumi group-hover:text-shu transition-colors">節を管理</div>
              <div class="text-sm text-sumi opacity-70">節の作成・編集・削除</div>
            </div>
          </a>
        </div>
      </div>
    </AdminLayout>
  )
}
