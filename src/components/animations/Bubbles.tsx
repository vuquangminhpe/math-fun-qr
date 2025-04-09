import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Bubble {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
}

const Bubbles: React.FC = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const colors = [
      "rgba(255, 159, 28, 0.7)", // primary
      "rgba(65, 179, 163, 0.7)", // secondary
      "rgba(213, 139, 221, 0.7)", // accent
    ];

    // Tạo ngẫu nhiên 15 bong bóng
    const newBubbles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // vị trí ngang (%)
      size: Math.random() * 40 + 20, // kích thước (px)
      delay: Math.random() * 0.5, // độ trễ (s)
      duration: Math.random() * 2 + 2, // thời gian bay lên (s)
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    setBubbles(newBubbles);

    // Tự động xóa bong bóng sau 3 giây
    const timer = setTimeout(() => {
      setBubbles([]);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-10 overflow-hidden">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full"
          style={{
            left: `${bubble.x}%`,
            bottom: "-50px",
            width: bubble.size,
            height: bubble.size,
            backgroundColor: bubble.color,
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: -window.innerHeight,
            opacity: [0, 0.7, 0],
            scale: [1, 1.2, 0.8, 1.1, 0],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

export default Bubbles;
