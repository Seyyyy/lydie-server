import { defineConfig } from "vitest/config";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    include: ["src/**/*.spec.ts", "src/**/*.spec.tsx"],
    env: {
      NEXT_PUBLIC_ENV: "local",
      NEXT_PUBLIC_BASE_OBJECT_PATH: path.resolve(__dirname, "tmp"),
      NEXT_PUBLIC_BASE_URL: "http://localhost:3000",
    },
    // sharpのテストでエラーが出るため、globalsをtrue、poolをforksに設定
    // https://github.com/vitest-dev/vitest/discussions/4778
    globals: true,
    pool: "forks",
    watch: false,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
