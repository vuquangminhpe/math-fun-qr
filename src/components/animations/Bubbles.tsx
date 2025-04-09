/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";

interface BubblesProps {
  duration?: number;
}

const Bubbles: React.FC<BubblesProps> = ({ duration = 3000 }) => {
  const [animationData, setAnimationData] = useState<any>(null);

  // Tải animation JSON khi component được render
  useEffect(() => {
    fetch("/animations/bubbles.json")
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
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-full h-full">
        {/* Animation chính giữa */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Lottie
            animationData={animationData}
            loop={true}
            autoplay={true}
            style={{ width: 300, height: 300 }}
          />
        </div>

        {/* Animation góc trái */}
        <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
          <Lottie
            animationData={animationData}
            loop={true}
            autoplay={true}
            style={{ width: 200, height: 200 }}
          />
        </div>

        {/* Animation góc phải */}
        <div className="absolute top-1/4 right-1/4 transform translate-x-1/2 -translate-y-1/2">
          <Lottie
            animationData={animationData}
            loop={true}
            autoplay={true}
            style={{ width: 200, height: 200 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Bubbles;
