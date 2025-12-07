import type { Chapter, Verse } from '../types/bindings'

export class Database {
  constructor(private db: D1Database) {}

  // ========== 章（Chapter）関連 ==========

  // 全章を取得（order_index順）
  async getChapters(): Promise<Chapter[]> {
    const result = await this.db
      .prepare('SELECT * FROM chapters ORDER BY order_index ASC')
      .all<Chapter>()
    return result.results || []
  }

  // slugで章を取得
  async getChapterBySlug(slug: string): Promise<Chapter | null> {
    const result = await this.db
      .prepare('SELECT * FROM chapters WHERE slug = ?')
      .bind(slug)
      .first<Chapter>()
    return result
  }

  // IDで章を取得
  async getChapterById(id: string): Promise<Chapter | null> {
    const result = await this.db
      .prepare('SELECT * FROM chapters WHERE id = ?')
      .bind(id)
      .first<Chapter>()
    return result
  }

  // 章を作成
  async createChapter(chapter: Omit<Chapter, 'created_at' | 'updated_at'>): Promise<void> {
    await this.db
      .prepare(
        `INSERT INTO chapters (id, slug, title, description, order_index, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, unixepoch(), unixepoch())`
      )
      .bind(
        chapter.id,
        chapter.slug,
        chapter.title,
        chapter.description,
        chapter.order_index
      )
      .run()
  }

  // 章を更新
  async updateChapter(id: string, updates: Partial<Omit<Chapter, 'id' | 'created_at' | 'updated_at'>>): Promise<void> {
    const fields: string[] = []
    const values: any[] = []

    if (updates.slug !== undefined) {
      fields.push('slug = ?')
      values.push(updates.slug)
    }
    if (updates.title !== undefined) {
      fields.push('title = ?')
      values.push(updates.title)
    }
    if (updates.description !== undefined) {
      fields.push('description = ?')
      values.push(updates.description)
    }
    if (updates.order_index !== undefined) {
      fields.push('order_index = ?')
      values.push(updates.order_index)
    }

    if (fields.length === 0) return

    fields.push('updated_at = unixepoch()')
    values.push(id)

    await this.db
      .prepare(`UPDATE chapters SET ${fields.join(', ')} WHERE id = ?`)
      .bind(...values)
      .run()
  }

  // 章を削除
  async deleteChapter(id: string): Promise<void> {
    await this.db
      .prepare('DELETE FROM chapters WHERE id = ?')
      .bind(id)
      .run()
  }

  // ========== 節（Verse）関連 ==========

  // 章IDで節を取得（verse_order順）
  async getVersesByChapterId(chapterId: string): Promise<Verse[]> {
    const result = await this.db
      .prepare('SELECT * FROM verses WHERE chapter_id = ? ORDER BY verse_order ASC')
      .bind(chapterId)
      .all<Verse>()
    return result.results || []
  }

  // IDで節を取得
  async getVerseById(id: string): Promise<Verse | null> {
    const result = await this.db
      .prepare('SELECT * FROM verses WHERE id = ?')
      .bind(id)
      .first<Verse>()
    return result
  }

  // 節を作成
  async createVerse(verse: Omit<Verse, 'created_at' | 'updated_at'>): Promise<void> {
    await this.db
      .prepare(
        `INSERT INTO verses (id, chapter_id, verse_order, title, content, audio_url, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, unixepoch(), unixepoch())`
      )
      .bind(
        verse.id,
        verse.chapter_id,
        verse.verse_order,
        verse.title,
        verse.content,
        verse.audio_url
      )
      .run()
  }

  // 節を更新
  async updateVerse(id: string, updates: Partial<Omit<Verse, 'id' | 'chapter_id' | 'created_at' | 'updated_at'>>): Promise<void> {
    const fields: string[] = []
    const values: any[] = []

    if (updates.verse_order !== undefined) {
      fields.push('verse_order = ?')
      values.push(updates.verse_order)
    }
    if (updates.title !== undefined) {
      fields.push('title = ?')
      values.push(updates.title)
    }
    if (updates.content !== undefined) {
      fields.push('content = ?')
      values.push(updates.content)
    }
    if (updates.audio_url !== undefined) {
      fields.push('audio_url = ?')
      values.push(updates.audio_url)
    }

    if (fields.length === 0) return

    fields.push('updated_at = unixepoch()')
    values.push(id)

    await this.db
      .prepare(`UPDATE verses SET ${fields.join(', ')} WHERE id = ?`)
      .bind(...values)
      .run()
  }

  // 節を削除
  async deleteVerse(id: string): Promise<void> {
    await this.db
      .prepare('DELETE FROM verses WHERE id = ?')
      .bind(id)
      .run()
  }

  // 前後の節を取得（ナビゲーション用）
  async getPreviousVerse(chapterId: string, currentOrder: number): Promise<Verse | null> {
    const result = await this.db
      .prepare(
        'SELECT * FROM verses WHERE chapter_id = ? AND verse_order < ? ORDER BY verse_order DESC LIMIT 1'
      )
      .bind(chapterId, currentOrder)
      .first<Verse>()
    return result
  }

  async getNextVerse(chapterId: string, currentOrder: number): Promise<Verse | null> {
    const result = await this.db
      .prepare(
        'SELECT * FROM verses WHERE chapter_id = ? AND verse_order > ? ORDER BY verse_order ASC LIMIT 1'
      )
      .bind(chapterId, currentOrder)
      .first<Verse>()
    return result
  }
}
