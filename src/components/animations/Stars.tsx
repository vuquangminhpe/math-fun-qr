import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  rotate: number;
  delay: number;
  duration: number;
  color: string;
}

const Stars: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const colors = [
      "#FFD166", // Vàng
      "#FF9F1C", // Cam
      "#41B3A3", // Xanh lá
      "#D58BDD", // Tím
    ];

    // Tạo ngẫu nhiên 20 ngôi sao
    const newStars = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // vị trí ngang (%)
      y: Math.random() * 100, // vị trí dọc (%)
      size: Math.random() * 30 + 10, // kích thước (px)
      rotate: Math.random() * 360, // góc xoay (độ)
      delay: Math.random() * 0.5, // độ trễ (s)
      duration: Math.random() * 0.5 + 0.5, // thời gian hiệu ứng (s)
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    setStars(newStars);

    // Tự động xóa sao sau 2 giây
    const timer = setTimeout(() => {
      setStars([]);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // SVG cho hình ngôi sao
  const starPath =
    "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z";

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-10 overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
          }}
          initial={{ scale: 0, rotate: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.2, 1],
            rotate: star.rotate,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            ease: "easeOut",
          }}
        >
          <svg
            width={star.size}
            height={star.size}
            viewBox="0 0 24 24"
            fill={star.color}
          >
            <path d={starPath} />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default Stars;
