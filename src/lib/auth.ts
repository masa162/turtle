import { createMiddleware } from 'hono/factory'
import { getCookie } from 'hono/cookie'
import type { Bindings, Variables } from '../types/bindings'

// パスワードハッシュ生成（初回セットアップ用）
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hash = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

// パスワード検証
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const passwordHash = await hashPassword(password)
  return passwordHash === hash
}

// JWTトークン生成（簡易版）
export async function generateToken(userId: string, secret: string): Promise<string> {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const payload = btoa(JSON.stringify({ userId, exp: Date.now() + 86400000 })) // 24時間
  const signature = await hashPassword(`${header}.${payload}.${secret}`)
  return `${header}.${payload}.${signature}`
}

// JWTトークン検証（簡易版）
export async function verifyToken(token: string, secret: string): Promise<string | null> {
  try {
    const [header, payload, signature] = token.split('.')
    const expectedSignature = await hashPassword(`${header}.${payload}.${secret}`)
    
    if (signature !== expectedSignature) {
      return null
    }

    const decodedPayload = JSON.parse(atob(payload))
    
    if (decodedPayload.exp < Date.now()) {
      return null
    }

    return decodedPayload.userId
  } catch {
    return null
  }
}

// 管理画面認証ミドルウェア
export const adminAuth = createMiddleware<{ Bindings: Bindings; Variables: Variables }>(
  async (c, next) => {
    const token = getCookie(c, 'admin_token')

    if (!token) {
      return c.redirect('/admin/login')
    }

    const userId = await verifyToken(token, c.env.JWT_SECRET)

    if (!userId) {
      return c.redirect('/admin/login')
    }

    c.set('userId', userId)
    await next()
  }
)
