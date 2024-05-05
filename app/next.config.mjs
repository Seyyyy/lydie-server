/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    /**
     * ここで定義した環境変数はビルド時にjavascriptに埋め込まれる。
     * Secret情報をここに記載しない。
     * https://nextjs.org/docs/app/api-reference/next-config-js/env
     */
    NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_BASE_OBJECT_PATH: process.env.NEXT_PUBLIC_BASE_OBJECT_PATH,
  },
};

export default nextConfig;
