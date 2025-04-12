/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import Layout from "@/components/layout/Layout";
import RankingView from "@/components/shared/RankingView";

interface RankingsProps {
  baseUrl: string;
}

export default function Rankings({ baseUrl }: RankingsProps) {
  const router = useRouter();
  const { level } = router.query;

  // Get initial level from query parameter if available
  const initialLevel = level ? parseInt(level as string, 10) : undefined;

  return (
    <Layout title="Bảng xếp hạng" showHomeButton={true}>
      <div
        className="rankings-intro"
        style={{
          backgroundColor: "#f0f9ff",
          padding: "1rem",
          borderRadius: "0.5rem",
          marginBottom: "1.5rem",
          borderLeft: "4px solid #3b82f6",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <div
            style={{
              backgroundColor: "#dbeafe",
              color: "#1e40af",
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
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
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
              Bảng xếp hạng:
            </h3>
            <p style={{ color: "#4b5563" }}>
              Xem thành tích của các học sinh và nhận đề xuất về cấp độ phù hợp
              dựa trên độ chính xác. Học sinh có độ chính xác dưới 40% nên luyện
              tập cấp độ 1, từ 40% đến 60% nên thử cấp độ 2, và trên 60% có thể
              thử thách với cấp độ 3.
            </p>
          </div>
        </div>
      </div>

      <RankingView initialLevel={initialLevel} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://math-fun-qr.vercel.app";

  return {
    props: {
      baseUrl,
    },
  };
};
