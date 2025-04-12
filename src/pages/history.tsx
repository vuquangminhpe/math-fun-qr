/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import HistoryView from '@/components/shared/HistoryView';

interface HistoryProps {
  baseUrl: string;
}

export default function History({ baseUrl }: HistoryProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      const auth = sessionStorage.getItem('teacherAuthenticated');
      if (auth !== 'true') {
        // Redirect to home if not authenticated
        router.replace('/');
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
    <Layout title="Lịch sử làm bài" showHomeButton={true}>
      <div
        className="history-page-intro"
        style={{
          backgroundColor: "#f0f9ff",
          padding: "1rem",
          borderRadius: "0.5rem",
          marginBottom: "1.5rem",
          borderLeft: "4px solid #0ea5e9",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <div
            style={{
              backgroundColor: "#e0f2fe",
              color: "#0284c7",
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
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
              Lịch sử làm bài:
            </h3>
            <p style={{ color: "#4b5563" }}>
              Xem kết quả bài làm của học sinh trong 24 giờ qua. Bạn có thể lọc
              theo cấp độ để xem chi tiết hơn.
            </p>
          </div>
        </div>
      </div>

      <HistoryView />
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
