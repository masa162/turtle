/** @jsxImportSource hono/jsx */

export const LoginPage = ({ error }: { error?: string }) => {
  return (
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>管理画面ログイン - 黃亀図書室</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&family=Noto+Serif+JP:wght@400;600;700;900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body class="min-h-screen flex items-center justify-center bg-gradient-to-br from-washi via-kinari to-washi">
        <div class="w-full max-w-md px-4">
          <div class="bg-white rounded-2xl shadow-2xl p-8 border-2 border-matcha-light">
            <div class="text-center mb-8">
              <h1 class="text-3xl font-bold font-serif text-sumi mb-2">黃亀図書室</h1>
              <p class="text-matcha-dark">管理画面</p>
            </div>

            {error && (
              <div class="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                <p class="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <form method="POST" action="/admin/login">
              <div class="mb-6">
                <label for="userId" class="block text-sm font-medium text-sumi mb-2">
                  ユーザーID
                </label>
                <input
                  type="text"
                  id="userId"
                  name="userId"
                  required
                  class="w-full px-4 py-3 border-2 border-matcha-light rounded-lg focus:outline-none focus:border-matcha transition-colors"
                  placeholder="ユーザーIDを入力"
                />
              </div>

              <div class="mb-6">
                <label for="password" class="block text-sm font-medium text-sumi mb-2">
                  パスワード
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  class="w-full px-4 py-3 border-2 border-matcha-light rounded-lg focus:outline-none focus:border-matcha transition-colors"
                  placeholder="パスワードを入力"
                />
              </div>

              <button
                type="submit"
                class="w-full bg-matcha hover:bg-matcha-dark text-white font-bold py-3 px-4 rounded-lg transition-colors"
              >
                ログイン
              </button>
            </form>

            <div class="mt-6 text-center">
              <a href="/" class="text-sm text-matcha hover:text-matcha-dark transition-colors">
                ← サイトトップに戻る
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
