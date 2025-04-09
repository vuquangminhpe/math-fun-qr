/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Cho phép CORS cho tài nguyên tĩnh
  async headers() {
    return [
      {
        source: "/sounds/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
    ];
  },
  // Cấu hình cho phép tối ưu hóa hình ảnh
  images: {
    domains: ["localhost", "math-fun-qr.vercel.app"],
    formats: ["image/avif", "image/webp"],
  },
  // Cấu hình môi trường
  env: {
    NEXT_PUBLIC_SITE_URL:
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  },
};

module.exports = nextConfig;
