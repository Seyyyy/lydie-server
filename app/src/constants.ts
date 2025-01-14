export const ENV = {
  ENV: process.env.NEXT_PUBLIC_ENV as
    | "container" // 開発時の実行環境
    | "local" // 単体テスト時の実行環境
    | "mock" // Storybookなどプロトタイプの実行環境
    | "production",
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  BASE_OBJECT_PATH: process.env.NEXT_PUBLIC_BASE_OBJECT_PATH, // ファイルの保存先
  // /blobでファイルを受け取ってgraphAPIで処理する
  TEMP_OBJECT_PATH: "tmp", // 一時ファイルの保存先
};

export const mock = {
  user: {
    id: "mock-user"
  }
}