import React from "react";
import { Answer } from "@/types";
import { motion } from "framer-motion";

interface AnswerOptionProps {
  answer: Answer;
  index: number;
  selected: boolean;
  correct?: boolean;
  onClick: () => void;
  disabled: boolean;
}

const AnswerOption: React.FC<AnswerOptionProps> = ({
  answer,
  index,
  selected,
  correct,
  onClick,
  disabled,
}) => {
  // Mảng các chữ cái cho các lựa chọn
  const letters = ["A", "B", "C", "D"];

  // Xác định trạng thái và màu sắc của các lựa chọn
  let backgroundColorClass = "bg-white hover:bg-gray-100";
  let borderColorClass = "border-gray-200";
  let textColorClass = "text-gray-800";

  if (selected && correct === undefined) {
    // Đã chọn nhưng chưa hiển thị kết quả
    backgroundColorClass = "bg-primary-light";
    borderColorClass = "border-primary";
    textColorClass = "text-primary-dark";
  } else if (correct !== undefined) {
    // Đã hiển thị kết quả
    if (correct && selected) {
      // Đáp án đúng và đã chọn
      backgroundColorClass = "bg-green-100";
      borderColorClass = "border-green-500";
      textColorClass = "text-green-800";
    } else if (!correct && selected) {
      // Đáp án sai và đã chọn
      backgroundColorClass = "bg-red-100";
      borderColorClass = "border-red-500";
      textColorClass = "text-red-800";
    } else if (correct) {
      // Đáp án đúng nhưng không chọn
      backgroundColorClass = "bg-green-100";
      borderColorClass = "border-green-500";
      textColorClass = "text-green-800";
    }
  }

  // Animation variants
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
    selected: { scale: 1.05, transition: { duration: 0.2 } },
    correct: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 0.5,
        times: [0, 0.5, 1],
        repeat: 1,
      },
    },
    incorrect: {
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className={`rounded-xl border-2 ${borderColorClass} ${backgroundColorClass} p-4 flex items-center cursor-pointer transition-all duration-300 shadow-bubble ${
        disabled && !selected ? "opacity-70" : "opacity-100"
      }`}
      onClick={!disabled ? onClick : undefined}
      initial="initial"
      whileHover={!disabled ? "hover" : undefined}
      whileTap={!disabled ? "tap" : undefined}
      animate={
        selected && correct === true
          ? "correct"
          : selected && correct === false
          ? "incorrect"
          : selected
          ? "selected"
          : "initial"
      }
      variants={buttonVariants}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 font-bold text-white ${
          selected ? "bg-primary" : "bg-secondary"
        }`}
      >
        {letters[index]}
      </div>
      <span className={`font-comic ${textColorClass} text-lg`}>
        {answer.text}
      </span>

      {selected && correct === true && (
        <div className="ml-auto">
          <svg
            className="w-6 h-6 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      )}

      {selected && correct === false && (
        <div className="ml-auto">
          <svg
            className="w-6 h-6 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      )}
    </motion.div>
  );
};

export default AnswerOption;
