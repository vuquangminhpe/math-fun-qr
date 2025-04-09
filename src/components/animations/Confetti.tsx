import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  size: number;
  rotate: number;
  rotateSpeed: number;
  horizontalSpeed: number;
  fallSpeed: number;
  color: string;
  shape: "circle" | "square" | "triangle";
}

const Confetti: React.FC = () => {
  const [confettiPieces, setConfettiPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const colors = [
      "#FF9F1C", // primary
      "#41B3A3", // secondary
      "#D58BDD", // accent
      "#FFD166", // yellow
      "#F76E11", // orange
    ];

    const shapes: ("circle" | "square" | "triangle")[] = [
      "circle",
      "square",
      "triangle",
    ];

    // Tạo ngẫu nhiên 100 mảnh confetti
    const newConfetti = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // vị trí ngang ban đầu (%)
      y: -10 - Math.random() * 10, // vị trí dọc ban đầu (%)
      size: Math.random() * 10 + 5, // kích thước (px)
      rotate: Math.random() * 360, // góc xoay ban đầu (độ)
      rotateSpeed: (Math.random() - 0.5) * 10, // tốc độ xoay (độ/s)
      horizontalSpeed: (Math.random() - 0.5) * 10, // tốc độ ngang
      fallSpeed: Math.random() * 3 + 1, // tốc độ rơi
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
    }));

    setConfettiPieces(newConfetti);

    // Tự động xóa confetti sau 5 giây
    const timer = setTimeout(() => {
      setConfettiPieces([]);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Render shape based on type
  const renderShape = (piece: ConfettiPiece) => {
    switch (piece.shape) {
      case "circle":
        return (
          <div
            className="rounded-full w-full h-full"
            style={{ backgroundColor: piece.color }}
          />
        );
      case "square":
        return (
          <div
            className="w-full h-full"
            style={{ backgroundColor: piece.color }}
          />
        );
      case "triangle":
        return (
          <div
            className="w-full h-full"
            style={{
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              backgroundColor: piece.color,
            }}
          />
        );
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-10 overflow-hidden">
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            width: piece.size,
            height: piece.size,
          }}
          initial={{
            y: piece.y,
            x: piece.x,
            rotate: piece.rotate,
            opacity: 1,
          }}
          animate={{
            y: [piece.y, 110],
            x: [piece.x, piece.x + piece.horizontalSpeed * 10],
            rotate: [piece.rotate, piece.rotate + piece.rotateSpeed * 10],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 5 / piece.fallSpeed,
            ease: "linear",
          }}
        >
          {renderShape(piece)}
        </motion.div>
      ))}
    </div>
  );
};

export default Confetti;
