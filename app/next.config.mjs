/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NEXT_PUBLIC_ENV === "static" ? "export" : null,
  distDir: process.env.NEXT_PUBLIC_ENV === "static" ? "dist/out" : null,
};

export default nextConfig;
