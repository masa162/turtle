/** @jsxImportSource hono/jsx */

// Cloudflare Workers環境変数の型定義
export interface Bindings {
  DB: D1Database
  __STATIC_CONTENT: KVNamespace
  ADMIN_USER_ID: string
  ADMIN_PASSWORD_HASH: string
  JWT_SECRET: string
}

// Honoコンテキスト変数の型定義
export interface Variables {
  userId?: string
}

// 章の型定義
export interface Chapter {
  id: string
  slug: string
  title: string
  description: string | null
  order_index: number
  created_at: number
  updated_at: number
}

// 節の型定義
export interface Verse {
  id: string
  chapter_id: string
  verse_order: number
  title: string
  content: string  // Markdown形式
  audio_url: string | null
  created_at: number
  updated_at: number
}
