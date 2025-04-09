/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";

interface StarsProps {
  duration?: number;
}

const Stars: React.FC<StarsProps> = ({ duration = 2000 }) => {
  const [animationData, setAnimationData] = useState<any>(null);

  // Tải animation JSON khi component được render
  useEffect(() => {
    fetch("/animations/stars.json")
      .then((response) => response.json())
      .then((data) => {
        setAnimationData(data);

        // Tự động xóa sau khoảng thời gian duration
        const timer = setTimeout(() => {
          setAnimationData(null);
        }, duration);

        return () => clearTimeout(timer);
      })
      .catch((error) => console.error("Error loading animation:", error));
  }, [duration]);

  // Nếu không có dữ liệu animation, không hiển thị gì
  if (!animationData) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative w-full h-full">
        {/* Phân bố ngẫu nhiên 6 animation sao trên toàn màn hình */}
        {[...Array(6)].map((_, index) => {
          // Tính vị trí ngẫu nhiên cho mỗi animation
          const top = `${Math.random() * 80 + 10}%`;
          const left = `${Math.random() * 80 + 10}%`;
          const size = Math.random() * 100 + 100; // Kích thước từ 100px đến 200px

          return (
            <div
              key={index}
              className="absolute"
              style={{
                top,
                left,
                transform: "translate(-50%, -50%)",
              }}
            >
              <Lottie
                animationData={animationData}
                loop={true}
                autoplay={true}
                style={{ width: size, height: size }}
              />
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Stars;
