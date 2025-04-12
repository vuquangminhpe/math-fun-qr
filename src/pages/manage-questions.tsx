/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import Layout from "@/components/layout/Layout";
import QuestionManager from "@/components/shared/QuestionManager";

interface ManageQuestionsProps {
  baseUrl: string;
}

export default function ManageQuestions({ baseUrl }: ManageQuestionsProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      const auth = sessionStorage.getItem("teacherAuthenticated");
      if (auth !== "true") {
        // Redirect to home if not authenticated
        router.replace("/");
      } else {
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <Layout title="Đang tải..." showHomeButton={true}>
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    return null; // Will be redirected by the useEffect
  }

  return (
    <Layout title="Quản lý câu hỏi" showHomeButton={true}>
      <div
        className="manage-questions-intro"
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
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
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
              Công cụ quản lý câu hỏi:
            </h3>
            <p style={{ color: "#4b5563" }}>
              Thêm, sửa, xóa câu hỏi trong ngân hàng đề. Các thay đổi sẽ được
              lưu trong 24 giờ. Sau thời gian này, hệ thống sẽ khôi phục về dữ
              liệu mặc định.
            </p>
          </div>
        </div>
      </div>

      <QuestionManager />
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
