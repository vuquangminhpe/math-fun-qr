import React from "react";
import Layout from "@/components/layout/Layout";
import QuizContainer from "@/components/quiz/QuizContainer";
import { levelInfo } from "@/data/questionService";
import { GetStaticProps } from "next";
import { LevelInfo } from "@/types";
import Link from "next/link";
import { motion } from "framer-motion";

interface Level3Props {
  levelData: LevelInfo;
}

export default function Level3({ levelData }: Level3Props) {
  return (
    <Layout
      title={levelData.title}
      level={levelData.id}
      backgroundImage={levelData.backgroundImage}
    >
      <div className="mb-8">
        <motion.div
          className="bg-white bg-opacity-90 rounded-xl p-4 mb-6 shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-center text-gray-700">
            Đây là cấp độ cao nhất! Các bài toán sẽ đòi hỏi nhiều bước tính toán
            và suy luận. Cố gắng nhé!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <QuizContainer level={levelData.id} questionsCount={5} />
        </motion.div>
      </div>

      <motion.div
        className="text-center mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Link
          href="/"
          className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg transition-all duration-300"
        >
          Quay lại trang chủ
        </Link>
      </motion.div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const levelData = levelInfo.find((level) => level.id === 3);

  if (!levelData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      levelData,
    },
  };
};
