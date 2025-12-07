/** @jsxImportSource hono/jsx */

export interface LayoutProps {
  title: string
  children: any
}

export const Layout = ({ title, children }: LayoutProps) => {
  return (
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title} - 黃亀図書室</title>
        <meta name="description" content="黄帝内経の原文朗読と解説を配信する学習プラットフォーム" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&family=Noto+Serif+JP:wght@400;600;700;900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/styles.css" />
        <script>{`
          function toggleMobileMenu() {
            const menu = document.getElementById('mobile-menu');
            if (menu.classList.contains('hidden')) {
              menu.classList.remove('hidden');
            } else {
              menu.classList.add('hidden');
            }
          }
          
          function scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
          
          // ページトップに戻るボタンの表示/非表示
          window.addEventListener('scroll', function() {
            const scrollBtn = document.getElementById('scroll-to-top');
            if (window.scrollY > 300) {
              scrollBtn.classList.remove('hidden');
            } else {
              scrollBtn.classList.add('hidden');
            }
          });
        `}</script>
      </head>
      <body class="min-h-screen flex flex-col bg-white">
        {/* モバイルヘッダー */}
        <header class="lg:hidden border-b-2 border-matcha-light bg-washi sticky top-0 z-50 shadow-sm">
          <div class="flex items-center justify-between px-4 py-3">
            <button
              class="p-2 hover:bg-washi-dark rounded-lg transition-colors text-sumi"
              onclick="toggleMobileMenu()"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 class="text-lg font-bold font-serif text-sumi">黃亀図書室</h1>
            <div class="w-10"></div>
          </div>
        </header>

        {/* モバイルメニュー */}
        <div id="mobile-menu" class="lg:hidden hidden bg-washi border-b-2 border-matcha-light">
          <nav class="p-4">
            <a
              href="/"
              class="block px-4 py-3 rounded-lg transition-all duration-200 mb-2 font-medium hover:bg-washi-dark hover:text-shu text-sumi"
              onclick="toggleMobileMenu()"
            >
              ホーム
            </a>
          </nav>
        </div>

        <div class="flex flex-1">
          {/* デスクトップサイドバー */}
          <aside class="hidden lg:block w-64 bg-washi sticky top-0 h-screen overflow-y-auto border-r-2 border-matcha">
            <div class="p-6 border-b-2 border-matcha-light bg-gradient-to-b from-washi to-washi-dark">
              <a href="/">
                <h1 class="text-2xl font-bold font-serif mb-2 text-sumi hover:text-matcha-dark transition-colors">
                  黃亀図書室
                </h1>
                <p class="text-sm text-matcha-dark font-medium">
                  黄帝内経を学ぶ
                </p>
              </a>
            </div>

            <nav class="p-4">
              <a
                href="/"
                class="block px-4 py-3 rounded-lg transition-all duration-200 mb-2 font-medium hover:bg-washi-dark hover:text-shu hover:pl-6 text-sumi"
              >
                ホーム
              </a>
            </nav>

            <div class="p-4 text-xs text-sumi opacity-70">
              <p>&copy; 2025 黃亀図書室</p>
              <p class="mt-1">運営: 中山正之（薬剤師）</p>
            </div>
          </aside>

          {/* メインコンテンツ */}
          <main class="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>

        {/* フッター */}
        <footer class="bg-sumi text-white p-4 text-center border-t-4 border-matcha">
          <p class="text-sm">&copy; 2025 黃亀図書室</p>
          <p class="text-xs text-gray-400 mt-1">運営: 中山正之（薬剤師）</p>
        </footer>

        {/* ページトップに戻るボタン */}
        <button
          id="scroll-to-top"
          onclick="scrollToTop()"
          class="hidden fixed bottom-6 right-6 w-12 h-12 bg-matcha hover:bg-matcha-dark text-white rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center z-50"
          aria-label="ページトップに戻る"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </body>
    </html>
  )
}
