/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import dynamic from "next/dynamic";
import Layout from "@/components/layout/Layout";

// Import DailyChallenge component dynamically with SSR disabled
const DailyChallenge = dynamic(
  () => import("@/components/shared/DailyChallenge"),
  { ssr: false } // This prevents the component from being rendered on the server
);

export default function DailyChallengePage() {
  return (
    <Layout title="Thử thách hàng ngày" showHomeButton={true}>
      <div className="daily-challenge-page">
        <div className="page-intro">
          <div className="intro-icon-wrapper">
            <svg
              width="24"
              height="24"
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
            <h1 className="intro-title">Thử thách toán học hàng ngày</h1>
            <p className="intro-description">
              Trả lời đúng câu hỏi mỗi ngày để tích lũy chuỗi thành tích. Mỗi
              ngày sẽ có một câu hỏi mới được chọn ngẫu nhiên. Hãy đăng nhập
              hàng ngày để giữ chuỗi thành tích của bạn!
            </p>
          </div>
        </div>

        <DailyChallenge />
      </div>
    </Layout>
  );
}
