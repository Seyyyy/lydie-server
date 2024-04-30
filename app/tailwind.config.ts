import type { Config } from "tailwindcss";
import {
  darkColors,
  lightColors,
  fontSize,
} from "./src/app/_tokens/token.config";

const config: Config = {
  content: ["./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ...darkColors,
        ...lightColors,
      },
      fontSize: {
        ...fontSize,
      },
    },
  },
  plugins: [],
};
export default config;
