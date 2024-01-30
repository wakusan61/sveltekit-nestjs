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

- SvelteKit [公式](https://kit.svelte.jp/docs/introduction) [GitHub](https://github.com/sveltejs/kit)
  - BFF
- felte [公式](https://felte.dev/docs/svelte/getting-started) [GitHub](https://github.com/pablo-abc/felte)
  - フォーム
- zod [公式](https://zod.dev/) [GitHub](https://github.com/colinhacks/zod) [チュートリアル](https://www.totaltypescript.com/tutorials/zod)
  - スキーマチェック
- zod-i18n-map i18next [GitHub](https://github.com/aiji42/zod-i18n)
  - zod のメッセージを日本語化。openapi-zod-client のテンプレートをカスタマイズして実装
- zodios [公式](https://www.zodios.org/docs/intro) [GitHub](https://github.com/ecyrbe/zodios)
  - リクエストクライアント
- openapi-zod-client [GitHub](https://github.com/astahmer/openapi-zod-client)
  - バックエンドの openapi 定義から zodios のクライアントと zod schema を生成
    - バックエンドと zod 定義は厳密には共通化していない zod → openapi → zod と openapi を介して間接的に共通化
- @felte/validator-zod [公式](https://felte.dev/docs/svelte/validators#using-zod)
  - felte で zod を使うためのユーティリティ

### バックエンド

- NestJS [公式](https://docs.nestjs.com/) [GitHub](https://github.com/nestjs/nest)
- zod [公式](https://zod.dev/) [GitHub](https://github.com/colinhacks/zod) [チュートリアル](https://www.totaltypescript.com/tutorials/zod)
  - スキーマチェック
- nestjs-zod [GitHub](https://github.com/risen228/nestjs-zod)
  - スキーマチェックに zod を利用するためのユーティリティ

### TODO

- 単体テスト(e2e 以外)
- Lint、Pritter の設定
- GitHubActions の整備
- フロント・バックの共通ライブラリ作成
- DB アクセス追加
- モノレポ対応
- develop staging production の開発環境対応
  - 開発環境別設定ファイル導入など
- セキュリティ対策
  - cros 対応
  - Helmet 導入
- 本番リリース対応
