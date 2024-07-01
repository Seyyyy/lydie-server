# lydie-server

## ディレクトリ構成

```sh
$ tree app/src -L 2 -d
app/src # メインコード
├── app
│   ├── blob # blobエンドポイント
│   ├── _components # コンポーネント用ディレクトリ
│   ├── graph # GraphQLエンドポイント
│   ├── _models # カスタムフック用ディレクトリ
│   ├── _repository # リポジトリ用ディレクトリ
│   ├── _static # クライアント側コンポーネント用ディレクトリ
│   └── _tokens # デザイントークン用ディレクトリ
└── gql # graphql-codegenの出力先

$ tree app/static -L 2
app/static # 静的サイト用のコード（メインコードを静的サイト用に変更したコード）
└── app
    ├── _models
    └── page.tsx
```
