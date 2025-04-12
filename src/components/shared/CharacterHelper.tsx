/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CharacterHelperProps {
  character: string; // Đường dẫn đến hình ảnh nhân vật
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  messages?: string[];
  delayBetweenMessages?: number;
  size?: number;
}

const CharacterHelper: React.FC<CharacterHelperProps> = ({
  character,
  position = "bottom-right",
  messages = [
    "Chào bạn!",
    "Bạn đã sẵn sàng học toán chưa?",
    "Hãy chọn cấp độ phù hợp nhé!",
  ],
  delayBetweenMessages = 5000,
  size = 100,
}) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showMessage, setShowMessage] = useState(true);

  // Xác định vị trí của nhân vật
  const positionClasses = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
  };

  // Xác định vị trí của bong bóng thoại
  const bubblePositionClasses = {
    "top-left": "left-20 top-4",
    "top-right": "right-20 top-4",
    "bottom-left": "left-20 bottom-12",
    "bottom-right": "right-20 bottom-12",
  };

  // Tự động thay đổi tin nhắn
  useEffect(() => {
    if (messages.length <= 1) return;

    const intervalId = setInterval(() => {
      setShowMessage(false);

      setTimeout(() => {
        setCurrentMessageIndex(
          (prevIndex) => (prevIndex + 1) % messages.length
        );
        setShowMessage(true);
      }, 500);
    }, delayBetweenMessages);

    return () => clearInterval(intervalId);
  }, [messages, delayBetweenMessages]);

  return (
    <div className={`fixed ${positionClasses[position]} z-50`}>
      {/* Bong bóng thoại */}
      <motion.div
        className={`absolute ${bubblePositionClasses[position]} bg-white rounded-2xl p-3 shadow-lg max-w-xs`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={
          showMessage ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
        }
        transition={{ duration: 0.3 }}
      >
        <p className="text-gray-800 font-comic text-sm md:text-base">
          {messages[currentMessageIndex]}
        </p>
        {/* Mũi tên chỉ hướng tới nhân vật */}
        <div
          className={`absolute w-4 h-4 bg-white transform rotate-45 ${
            position.includes("right") ? "right-[-8px]" : "left-[-8px]"
          } ${position.includes("top") ? "top-4" : "bottom-4"}`}
        ></div>
      </motion.div>

      {/* Hình ảnh nhân vật */}
      <motion.div
        className="cursor-pointer"
        style={{ width: size, height: size }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <img
          src={character}
          alt="Helper Character"
          className="w-full h-full object-contain rounded-full drop-shadow-lg"
        />
      </motion.div>
    </div>
  );
};

export default CharacterHelper;
