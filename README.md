This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Toán Vui Tiểu Học - QR Math App

Ứng dụng học toán dành cho học sinh tiểu học với mã QR code và giao diện tương tác sinh động.

## Tính năng

- 3 cấp độ bài tập toán có lời văn với độ khó tăng dần
- Mã QR cho mỗi cấp độ để truy cập nhanh trên điện thoại
- Hiệu ứng hình ảnh và âm thanh khi trả lời đúng (bong bóng, ngôi sao, vỗ tay)
- Giao diện đầy màu sắc và thân thiện với trẻ em
- Phù hợp cho học sinh tiểu học luyện tập kỹ năng làm toán

## Công nghệ sử dụng

- Next.js và TypeScript
- TailwindCSS cho UI
- Framer Motion cho animation
- QRCode.react để tạo mã QR
- Howler.js để quản lý âm thanh

## Cài đặt và chạy

1. Clone repository:

```bash
git clone https://github.com/your-username/math-fun-qr.git
cd math-fun-qr
```

2. Cài đặt các dependency:

```bash
npm install
```

3. Chạy ở môi trường phát triển:

```bash
npm run dev
```

4. Build và chạy ở môi trường production:

```bash
npm run build
npm run start
```

## Triển khai trên Vercel

1. Fork repository này
2. Kết nối với Vercel
3. Triển khai tự động

## Cấu trúc dự án

```
math-fun-qr/
├── public/              # Tài nguyên tĩnh (hình ảnh, âm thanh)
├── src/
│   ├── components/      # Các component React
│   ├── data/            # Kho câu hỏi và dữ liệu
│   ├── pages/           # Các trang của ứng dụng
│   ├── styles/          # CSS và theme
│   ├── types/           # TypeScript definitions
│   └── utils/           # Các tiện ích
├── next.config.js       # Cấu hình Next.js
└── tailwind.config.js   # Cấu hình TailwindCSS
```

## Tùy chỉnh

### Thêm câu hỏi mới

Để thêm câu hỏi mới, chỉnh sửa file trong thư mục `src/data/questionBank/`.

### Thay đổi giao diện

Chỉnh sửa theme TailwindCSS trong file `tailwind.config.js`.

### Thêm hiệu ứng

Thêm hiệu ứng mới trong thư mục `src/components/animations/`.

## Giấy phép

MIT License
