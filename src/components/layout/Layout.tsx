import React, { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import "../styles/Layout.css";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  level?: number;
  showHomeButton?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title = "Toán Vui Tiểu Học",
  level,
  showHomeButton = true,
}) => {
  // Set level theme class
  const levelThemeClass = level ? `level-${level}-theme` : "";

  return (
    <div className={`layout ${levelThemeClass}`}>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Ứng dụng học toán vui dành cho học sinh tiểu học"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="header">
        <div className="header-content">
          <Link href="/" className="logo">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
            Toán Vui Tiểu Học
          </Link>

          {level && <div className="level-badge">Cấp độ {level}</div>}
        </div>
      </header>

      <main className="main-content">
        {/* Title */}
        {title && title !== "Toán Vui Tiểu Học" && (
          <h1 className="page-title">{title}</h1>
        )}

        {/* Main content */}
        <div className="content-container">{children}</div>

        {/* Home button (conditionally rendered) */}
        {showHomeButton && (
          <div className="text-center">
            <Link href="/" className="home-button">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Quay lại trang chủ
            </Link>
          </div>
        )}
      </main>

      <footer className="footer">
        <div className="footer-content">
          &copy; {new Date().getFullYear()} Toán Vui Tiểu Học
        </div>
      </footer>
    </div>
  );
};

export default Layout;
