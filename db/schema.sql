-- 黃亀図書室 データベーススキーマ
-- 黄帝内経の章・節を管理

-- 章テーブル（例：上古天真論）
CREATE TABLE IF NOT EXISTS chapters (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at INTEGER NOT NULL DEFAULT (unixepoch())
);

-- 節テーブル（章の下の小さな単位）
CREATE TABLE IF NOT EXISTS verses (
  id TEXT PRIMARY KEY,
  chapter_id TEXT NOT NULL,
  verse_order INTEGER NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,  -- Markdown形式
  audio_url TEXT,
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at INTEGER NOT NULL DEFAULT (unixepoch()),
  FOREIGN KEY (chapter_id) REFERENCES chapters(id) ON DELETE CASCADE
);

-- インデックス
CREATE INDEX IF NOT EXISTS idx_verses_chapter_id ON verses(chapter_id);
CREATE INDEX IF NOT EXISTS idx_verses_order ON verses(chapter_id, verse_order);
CREATE INDEX IF NOT EXISTS idx_chapters_order ON chapters(order_index);
