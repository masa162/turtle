import { createMiddleware } from 'hono/factory'
import type { Bindings, Variables } from '../types/bindings'

// Basic認証ミドルウェア
export const adminAuth = createMiddleware<{ Bindings: Bindings; Variables: Variables }>(
  async (c, next) => {
    const authHeader = c.req.header('Authorization')

    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return c.text('Unauthorized', 401, {
        'WWW-Authenticate': 'Basic realm="Admin Area"'
      })
    }

    try {
      // Basic認証のデコード
      const base64Credentials = authHeader.split(' ')[1]
      const credentials = atob(base64Credentials)
      const [username, password] = credentials.split(':')

      // 環境変数から認証情報を取得
      const adminUserId = c.env.ADMIN_USER_ID
      const adminPassword = c.env.ADMIN_PASSWORD

      // 認証チェック
      if (username === adminUserId && password === adminPassword) {
        c.set('userId', username)
        await next()
      } else {
        return c.text('Unauthorized', 401, {
          'WWW-Authenticate': 'Basic realm="Admin Area"'
        })
      }
    } catch (error) {
      return c.text('Unauthorized', 401, {
        'WWW-Authenticate': 'Basic realm="Admin Area"'
      })
    }
  }
)
