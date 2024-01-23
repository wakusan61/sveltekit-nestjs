# sveltekit-nestjs

## Quick Start

### バックエンド

セットアップ

```
cd apps/my-api
npm i
```

開発モードで実行

```
npm run start:dev
```

### フロントエンド

セットアップ

```
cd apps/my-web
npm i
```

リクエストクライアント生成(事前にバックエンドのセットアップをすること)

```
npm run client:generate
```

開発モードで実行

```
npm run dev
```

## 技術スタック

### フロントエンド

- SvelteKit
- felte
  - フォーム
- openapi-zod-client
  - バックエンドの openapi 定義から zodios のクライアントを生成
- zod
  - リクエスト時の Validation に使用
- zodios
  - リクエストクライント

### バックエンド

- NestJS
  - nestjs-zod
    - スキーマチェックに zod を利用するためのユーティリティ
- zod
  - スキーマチェック

### TODO

- フォームの Validation
- コントローラのテスト
- フロント・バックの共通ライブラリ作成
- DB アクセス追加
- モノレポ対応
- develop staging production の開発環境対応
  - 開発環境別設定ファイル導入など
- セキュリティ対策
  - cros 対応
  - Helmet 導入
- 本番リリース対応
