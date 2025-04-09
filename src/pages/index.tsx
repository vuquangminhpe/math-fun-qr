import React from "react";
import { GetStaticProps } from "next";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import QRCode from "@/components/shared/QRCode";
import { levelInfo } from "@/data/questionService";
import { motion } from "framer-motion";
import { LevelInfo } from "@/types";

interface HomeProps {
  baseUrl: string;
  levels: LevelInfo[];
}

export default function Home({ baseUrl, levels }: HomeProps) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <Layout title="Toán Vui Tiểu Học - Học toán qua QR">
      <div className="text-center mb-12">
        <motion.h2
          className="text-2xl md:text-3xl font-comic text-primary-dark mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Chào mừng các bạn nhỏ đến với Toán Vui Tiểu Học!
        </motion.h2>

        <motion.p
          className="text-lg text-gray-700 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Hãy quét mã QR hoặc nhấn vào cấp độ bạn muốn để bắt đầu giải toán nhé!
        </motion.p>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {levels.map((level) => (
          <motion.div
            key={level.id}
            className="flex flex-col items-center"
            variants={itemVariants}
          >
            <QRCode
              url={`${baseUrl}/level${level.id}`}
              level={level.id}
              title={level.title}
            />

            <motion.div
              className="mt-6"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={`/level${level.id}`}
                className={`inline-block py-3 px-6 rounded-xl text-white font-bold shadow-lg transition-all duration-300 bg-${
                  level.id === 1
                    ? "primary"
                    : level.id === 2
                    ? "secondary"
                    : "accent"
                }`}
                style={{
                  backgroundColor:
                    level.id === 1
                      ? "#FF9F1C"
                      : level.id === 2
                      ? "#41B3A3"
                      : "#D58BDD",
                }}
              >
                Vào Cấp độ {level.id}
              </Link>
            </motion.div>

            <motion.p
              className="mt-4 text-gray-700 text-center max-w-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 + level.id * 0.2 }}
            >
              {level.description}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="bg-white bg-opacity-80 p-6 rounded-2xl shadow-lg max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <h3 className="text-xl font-comic text-primary-dark mb-4">
          Hướng dẫn sử dụng:
        </h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Chọn cấp độ phù hợp với khả năng của bạn</li>
          <li>Đọc kỹ đề bài và suy nghĩ trước khi chọn đáp án</li>
          <li>Mỗi câu trả lời đúng sẽ có hiệu ứng đặc biệt!</li>
          <li>Hoàn thành bài kiểm tra để xem kết quả của bạn</li>
          <li>Bạn có thể quét mã QR để làm bài trên điện thoại</li>
        </ul>
      </motion.div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // Trong môi trường phát triển, sử dụng localhost
  // Trong môi trường sản xuất, đường dẫn sẽ được cập nhật khi triển khai
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://math-fun-qr.vercel.app";

  return {
    props: {
      baseUrl,
      levels: levelInfo,
    },
  };
};
