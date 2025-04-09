import React, { useState } from "react";
import { motion } from "framer-motion";
import AnswerOption from "./AnswerOption";
import { Answer } from "@/types";
import { Question as QuestionType } from "@/types";

interface QuestionProps {
  question: QuestionType;
  onAnswer: (answerId: string, isCorrect: boolean) => void;
  questionNumber: number;
  totalQuestions: number;
}

const Question: React.FC<QuestionProps> = ({
  question,
  onAnswer,
  questionNumber,
  totalQuestions,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answered, setAnswered] = useState<boolean>(false);

  const handleSelectAnswer = (answerId: string, isCorrect: boolean) => {
    if (answered) return;

    setSelectedAnswer(answerId);
    setAnswered(true);
    onAnswer(answerId, isCorrect);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      className="bg-white bg-opacity-90 rounded-3xl p-6 shadow-card w-full max-w-2xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="mb-4 flex justify-between items-center">
        <span className="text-primary-dark font-bold text-lg">
          Câu {questionNumber}/{totalQuestions}
        </span>
        <span
          className={`px-3 py-1 rounded-full text-xs text-white ${
            question.difficulty === "easy"
              ? "bg-green-500"
              : question.difficulty === "medium"
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
        >
          {question.difficulty === "easy"
            ? "Dễ"
            : question.difficulty === "medium"
            ? "Trung bình"
            : "Khó"}
        </span>
      </div>

      <motion.h3
        className="text-xl font-comic mb-6 text-primary-dark"
        variants={itemVariants}
      >
        {question.text}
      </motion.h3>

      {question.imageUrl && (
        <motion.div className="mb-6" variants={itemVariants}>
          <img
            src={question.imageUrl}
            alt="Question illustration"
            className="rounded-xl max-h-48 mx-auto"
          />
        </motion.div>
      )}

      <div className="space-y-4">
        {question.answers.map((answer: Answer, index: number) => (
          <motion.div key={answer.id} variants={itemVariants}>
            <AnswerOption
              answer={answer}
              index={index}
              selected={selectedAnswer === answer.id}
              correct={answered ? answer.isCorrect : undefined}
              onClick={() => handleSelectAnswer(answer.id, answer.isCorrect)}
              disabled={answered}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Question;
