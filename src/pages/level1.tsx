import React from "react";
import { GetStaticProps } from "next";
import Layout from "@/components/layout/Layout";
import QuizContainer from "@/components/quiz/QuizContainer";
import { levelInfo } from "@/data/questionService";
import { LevelInfo } from "@/types";

interface Level1Props {
  levelData: LevelInfo;
  baseUrl: string;
}

export default function Level1({ levelData }: Level1Props) {
  return (
    <Layout title={levelData.title} level={levelData.id}>
      <div
        className="level-intro"
        style={{
          backgroundColor: "#ecfdf5",
          padding: "1rem",
          borderRadius: "0.5rem",
          marginBottom: "1.5rem",
          borderLeft: "4px solid #10b981",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <div
            style={{
              backgroundColor: "#d1fae5",
              color: "#047857",
              borderRadius: "9999px",
              padding: "0.5rem",
              marginRight: "0.75rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h3
              style={{
                fontWeight: 500,
                marginBottom: "0.25rem",
                color: "#1f2937",
              }}
            >
              Hướng dẫn:
            </h3>
            <p style={{ color: "#4b5563" }}>
              Đây là các bài toán đơn giản về phép cộng, trừ, nhân, chia. Hãy
              đọc kỹ đề bài và chọn đáp án đúng nhé!
            </p>
          </div>
        </div>
      </div>

      <QuizContainer level={levelData.id} questionsCount={10} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const levelData = levelInfo.find((level) => level.id === 1);

  if (!levelData) {
    return {
      notFound: true,
    };
  }

  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://math-fun-qr.vercel.app";

  return {
    props: {
      levelData,
      baseUrl,
    },
  };
};
