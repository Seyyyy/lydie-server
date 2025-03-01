/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NEXT_PUBLIC_ENV === "static" ? "export" : null,
  distDir: process.env.NEXT_PUBLIC_ENV === "static" ? "dist/out" : null,
  // https://nextjs.org/docs/messages/next-image-unconfigured-host
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "nginx"
      },
    ]
  }
};

export default nextConfig;
