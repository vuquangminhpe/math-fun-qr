import React, { ReactNode } from "react";
import Head from "next/head";
import { motion } from "framer-motion";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  level?: number;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title = "Toán Vui Tiểu Học",
  backgroundColor = "bg-background",
  backgroundImage,
  level,
}) => {
  // Xác định lớp gradient tương ứng với level
  const gradientClass = level
    ? `level-${level}-gradient`
    : "bg-gradient-to-br from-background-light via-background to-background-dark";

  // Animation variants
  const pageVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className={`min-h-screen ${backgroundColor} ${gradientClass}`}>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Ứng dụng học toán vui dành cho học sinh tiểu học"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <motion.main
        className="container mx-auto px-4 py-8 min-h-screen"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "soft-light",
        }}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="flex flex-col items-center">
          <motion.header
            className="w-full max-w-4xl mb-8 text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-comic font-bold mb-2">
              {title}
            </h1>
            {level && (
              <div
                className="inline-block px-4 py-2 rounded-full text-white text-lg font-bold"
                style={{
                  backgroundColor:
                    level === 1
                      ? "#FF9F1C"
                      : level === 2
                      ? "#41B3A3"
                      : "#D58BDD",
                }}
              >
                Cấp độ {level}
              </div>
            )}
          </motion.header>

          <motion.div
            className="w-full max-w-4xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {children}
          </motion.div>
        </div>
      </motion.main>

      <footer className="text-center py-4 text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Toán Vui Tiểu Học</p>
      </footer>

      {/* Thêm style cho gradient */}
      <style jsx global>{`
        .level-1-gradient {
          background: linear-gradient(
            135deg,
            #fff7e0 0%,
            #ffefba 50%,
            #ffe3b0 100%
          );
        }
        .level-2-gradient {
          background: linear-gradient(
            135deg,
            #e0f7f5 0%,
            #c1e8e3 50%,
            #a2d9d1 100%
          );
        }
        .level-3-gradient {
          background: linear-gradient(
            135deg,
            #f8e0ff 0%,
            #f0c6ff 50%,
            #ebabff 100%
          );
        }
      `}</style>
    </div>
  );
};

export default Layout;
