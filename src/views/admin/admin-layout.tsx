/** @jsxImportSource hono/jsx */

export interface AdminLayoutProps {
  title: string
  children: any
}

export const AdminLayout = ({ title, children }: AdminLayoutProps) => {
  return (
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title} - 管理画面 - 黃亀図書室</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&family=Noto+Serif+JP:wght@400;600;700;900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body class="min-h-screen bg-washi">
        {/* ヘッダー */}
        <header class="bg-white border-b-2 border-matcha-light sticky top-0 z-50 shadow-sm">
          <div class="container mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-6">
                <a href="/admin" class="text-2xl font-bold font-serif text-sumi hover:text-matcha transition-colors">
                  黃亀図書室 管理画面
                </a>
                <nav class="hidden md:flex items-center gap-4">
                  <a href="/admin" class="px-4 py-2 rounded-lg hover:bg-washi transition-colors text-sumi">
                    ダッシュボード
                  </a>
                  <a href="/admin/chapters" class="px-4 py-2 rounded-lg hover:bg-washi transition-colors text-sumi">
                    章管理
                  </a>
                  <a href="/admin/verses" class="px-4 py-2 rounded-lg hover:bg-washi transition-colors text-sumi">
                    節管理
                  </a>
                </nav>
              </div>
              <div class="flex items-center gap-4">
                <a href="/" target="_blank" class="text-sm text-matcha hover:text-matcha-dark transition-colors">
                  サイトを表示
                </a>
                <form method="POST" action="/admin/logout">
                  <button
                    type="submit"
                    class="px-4 py-2 bg-shu hover:bg-shu-light text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    ログアウト
                  </button>
                </form>
              </div>
            </div>
          </div>
        </header>

        {/* メインコンテンツ */}
        <main class="container mx-auto px-4 py-8 max-w-7xl">
          {children}
        </main>
      </body>
    </html>
  )
}
