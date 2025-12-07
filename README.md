# 黃亀図書室（Yellow Turtle Library）

黄帝内経の原文朗読と解説を配信する学習プラットフォーム

## 技術スタック

- **フレームワーク**: Hono + TypeScript
- **インフラ**: Cloudflare Workers + D1 Database
- **スタイリング**: Tailwind CSS
- **音声CDN**: wavestk（共有音声CDN）

## 開発環境のセットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. データベースの初期化

```bash
# ローカルデータベースにスキーマを適用
wrangler d1 execute turtle-db --local --file=./db/schema.sql

# サンプルデータを投入（オプション）
wrangler d1 execute turtle-db --local --file=./db/seed.sql
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:8787` にアクセス

## 管理画面

- URL: `/admin/login`
- ユーザーID: `mn`
- パスワード: `39`

## デプロイ

### 環境変数の設定

本番環境では以下の環境変数をCloudflare Dashboardで設定してください：

- `ADMIN_USER_ID`: 管理画面のユーザーID
- `ADMIN_PASSWORD_HASH`: パスワードのSHA-256ハッシュ
- `JWT_SECRET`: JWT署名用の秘密鍵

### デプロイコマンド

```bash
npm run deploy
```

## プロジェクト構造

```
turtle/
├── db/
│   ├── schema.sql          # データベーススキーマ
│   └── seed.sql            # サンプルデータ
├── src/
│   ├── index.tsx           # メインアプリケーション
│   ├── lib/
│   │   ├── auth.ts         # 認証ライブラリ
│   │   └── db.ts           # データベースアクセスレイヤー
│   ├── types/
│   │   └── bindings.ts     # TypeScript型定義
│   ├── views/
│   │   ├── layout.tsx      # 公開ページレイアウト
│   │   ├── home.tsx        # ホームページ
│   │   ├── chapter-detail.tsx  # 章詳細ページ
│   │   ├── verse-detail.tsx    # 節詳細ページ
│   │   └── admin/          # 管理画面コンポーネント
│   └── styles/
│       └── input.css       # Tailwind CSSソース
├── public/
│   └── styles.css          # ビルド済みCSS
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── wrangler.toml           # Cloudflare Workers設定
```

## ライセンス

Private
