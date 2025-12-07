-- サンプルデータ（テスト用）

-- 章を追加
INSERT INTO chapters (id, slug, title, description, order_index, created_at, updated_at)
VALUES 
  ('chapter-shang-gu-tian-zhen-lun', 'shang-gu-tian-zhen-lun', '上古天真論', '黄帝内経素問の第一篇。養生の基本原理について述べられています。', 1, unixepoch(), unixepoch());

-- 節を追加
INSERT INTO verses (id, chapter_id, verse_order, title, content, audio_url, created_at, updated_at)
VALUES 
  ('chapter-shang-gu-tian-zhen-lun-verse-1', 'chapter-shang-gu-tian-zhen-lun', 1, '第一節', '昔在黄帝、生而神霊、弱而能言、幼而徇斉、長而敦敏、成而登天。

乃問於天師曰、余聞上古之人、春秋皆度百歳、而動作不衰。今時之人、年半百而動作皆衰者、時世異耶、人将失之耶。', NULL, unixepoch(), unixepoch());
