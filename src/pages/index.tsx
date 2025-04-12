import React, { useState } from "react";
import { GetStaticProps } from "next";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import QRCode from "@/components/shared/QRCode";
import PasswordModal from "@/components/shared/PasswordModal";
import { levelInfo } from "@/data/questionService";
import { LevelInfo } from "@/types";
import "../components/styles/Home.css"; // Import CSS module for styling

interface HomeProps {
  baseUrl: string;
  levels: LevelInfo[];
}

export default function Home({ baseUrl, levels }: HomeProps) {
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handleTeacherClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowPasswordModal(true);
  };

  return (
    <Layout title="Toán Vui Tiểu Học" showHomeButton={false}>
      {showPasswordModal && (
        <PasswordModal onClose={() => setShowPasswordModal(false)} />
      )}

      <section className="hero-section">
        <h2 className="hero-title">Học toán thật vui!</h2>
        <p className="hero-subtitle">
          Chọn cấp độ phù hợp với khả năng của bạn và bắt đầu giải toán ngay
          nào!
        </p>

        <div className="teacher-section">
          <a href="#" onClick={handleTeacherClick} className="teacher-link">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{ marginRight: "8px" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Dành cho giáo viên: Xem lịch sử làm bài
          </a>
        </div>
      </section>

      {/* QR Code cho trang chủ */}
      <div className="home-qr-section">
        <h3 className="qr-section-title">Mã QR Truy Cập</h3>
        <div className="qr-codes-grid">
          <div className="main-qr">
            <QRCode
              url={baseUrl}
              title="Trang Chính"
              size={150}
              colorDark="#3b82f6"
            />
          </div>

          <div className="levels-qr-grid">
            {levels.map((level) => {
              // Màu sắc dựa vào cấp độ
              const colors = {
                1: "#10b981", // Green
                2: "#3b82f6", // Blue
                3: "#8b5cf6", // Purple
              };

              return (
                <div key={level.id} className={`level-${level.id}-qr`}>
                  <QRCode
                    url={`${baseUrl}/level${level.id}`}
                    title={`Cấp độ ${level.id}`}
                    size={80}
                    colorDark={colors[level.id as keyof typeof colors]}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="levels-grid">
        {levels.map((level) => (
          <div key={level.id} className="level-card">
            <div className={`level-card-header level-${level.id}-header`}>
              <h3 className="level-card-title">Cấp độ {level.id}</h3>
              <p className="level-card-description">{level.description}</p>
              <Link
                href={`/level${level.id}`}
                className={`start-button level-${level.id}-button`}
              >
                Bắt đầu
              </Link>
            </div>

            <div className="level-card-body">
              <div className="level-features-title">Đặc điểm:</div>
              <ul className="level-features-list">
                {level.id === 1 && (
                  <>
                    <li className="level-feature-item">
                      <span className={`feature-icon level-${level.id}-icon`}>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                      Phép tính cộng, trừ đơn giản
                    </li>
                    <li className="level-feature-item">
                      <span className={`feature-icon level-${level.id}-icon`}>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                      Phù hợp cho học sinh lớp 2
                    </li>
                  </>
                )}
                {level.id === 2 && (
                  <>
                    <li className="level-feature-item">
                      <span className={`feature-icon level-${level.id}-icon`}>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                      Phép tính nhân, chia
                    </li>
                    <li className="level-feature-item">
                      <span className={`feature-icon level-${level.id}-icon`}>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                      Phù hợp cho học sinh lớp 2
                    </li>
                  </>
                )}
                {level.id === 3 && (
                  <>
                    <li className="level-feature-item">
                      <span className={`feature-icon level-${level.id}-icon`}>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                      Bài toán nhiều bước giải
                    </li>
                    <li className="level-feature-item">
                      <span className={`feature-icon level-${level.id}-icon`}>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                      Phù hợp cho học sinh lớp 2
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <section className="how-to-use-section">
        <h3 className="how-to-use-title">Hướng dẫn sử dụng:</h3>
        <div className="steps-grid">
          <div className="step-item">
            <div className="step-icon-container step-1-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                width="20"
                height="20"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <div className="step-content">
              <h4 className="step-title">Chọn cấp độ</h4>
              <p className="step-description">
                Bắt đầu với cấp độ phù hợp với khả năng của bạn
              </p>
            </div>
          </div>

          <div className="step-item">
            <div className="step-icon-container step-2-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                width="20"
                height="20"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <div className="step-content">
              <h4 className="step-title">Trả lời câu hỏi</h4>
              <p className="step-description">
                Đọc kỹ đề bài và chọn đáp án đúng
              </p>
            </div>
          </div>

          <div className="step-item">
            <div className="step-icon-container step-3-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                width="20"
                height="20"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                />
              </svg>
            </div>
            <div className="step-content">
              <h4 className="step-title">Xem kết quả</h4>
              <p className="step-description">
                Kiểm tra điểm số của bạn sau khi hoàn thành
              </p>
            </div>
          </div>

          <div className="step-item">
            <div className="step-icon-container step-4-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                width="20"
                height="20"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>
            <div className="step-content">
              <h4 className="step-title">Làm lại</h4>
              <p className="step-description">
                Luyện tập nhiều lần để nâng cao kỹ năng
              </p>
            </div>
          </div>
        </div>
      </section>
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
      levels: levelInfo,
    },
  };
};
