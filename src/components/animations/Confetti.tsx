/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";

interface ConfettiProps {
  duration?: number;
}

const Confetti: React.FC<ConfettiProps> = ({ duration = 5000 }) => {
  const [animationData, setAnimationData] = useState<any>(null);

  // Tải animation JSON khi component được render
  useEffect(() => {
    fetch("/animations/confetti.json")
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
      {/* Hiệu ứng confetti tràn khắp màn hình */}
      <div className="absolute top-0 left-0 w-full">
        <Lottie
          animationData={animationData}
          loop={true}
          autoplay={true}
          style={{ width: "100%", height: "100vh" }}
        />
      </div>

      {/* Thêm hiệu ứng confetti từ hai bên */}
      <div className="absolute top-0 left-0 w-1/2 h-full">
        <Lottie
          animationData={animationData}
          loop={true}
          autoplay={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <div className="absolute top-0 right-0 w-1/2 h-full">
        <Lottie
          animationData={animationData}
          loop={true}
          autoplay={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </motion.div>
  );
};

export default Confetti;
