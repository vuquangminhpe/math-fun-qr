import React, { useState, useEffect } from "react";
import { Question as QuestionType } from "@/types";
import Question from "./Question";
import { getRandomQuestions } from "@/data/questionService";
import { motion, AnimatePresence } from "framer-motion";
import Bubbles from "../animations/Bubbles";
import Stars from "../animations/Stars";
import Confetti from "../animations/Confetti";

interface QuizContainerProps {
  level: number;
  questionsCount?: number;
}

const QuizContainer: React.FC<QuizContainerProps> = ({
  level,
  questionsCount = 5,
}) => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);

  // Animation states
  const [showBubbles, setShowBubbles] = useState(false);
  const [showStars, setShowStars] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [playSound, setPlaySound] = useState("");

  // Lấy câu hỏi khi component được tạo
  useEffect(() => {
    const loadQuestions = () => {
      setLoading(true);
      const fetchedQuestions = getRandomQuestions(level, questionsCount);
      setQuestions(fetchedQuestions);
      setCurrentQuestionIndex(0);
      setScore(0);
      setShowResult(false);
      setLoading(false);
    };

    loadQuestions();
  }, [level, questionsCount]);

  // Xử lý khi người dùng trả lời câu hỏi
  const handleAnswer = (answerId: string, isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);

      // Hiệu ứng âm thanh và hình ảnh khi trả lời đúng
      if (Math.random() > 0.5) {
        setShowBubbles(true);
      } else {
        setShowStars(true);
      }

      setPlaySound("correct");
    } else {
      setPlaySound("wrong");
    }

    // Chuyển sang câu hỏi tiếp theo sau 1.5 giây
    setTimeout(() => {
      setShowBubbles(false);
      setShowStars(false);

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      } else {
        setShowResult(true);
        setShowConfetti(true);
        setPlaySound("applause");
      }
    }, 1500);
  };

  // Xử lý khi bắt đầu làm lại bài
  const handleRestart = () => {
    const newQuestions = getRandomQuestions(level, questionsCount);
    setQuestions(newQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setShowConfetti(false);
  };

  // Hiệu ứng âm thanh
  useEffect(() => {
    if (playSound) {
      const audio = new Audio(`/sounds/${playSound}.mp3`);
      audio
        .play()
        .catch((error) => console.error("Failed to play sound:", error));
      setPlaySound("");
    }
  }, [playSound]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-primary h-16 w-16"></div>
      </div>
    );
  }

  // Hiển thị kết quả
  if (showResult) {
    return (
      <motion.div
        className="bg-white bg-opacity-90 rounded-3xl p-8 shadow-card w-full max-w-2xl mx-auto text-center relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {showConfetti && <Confetti />}

        <h2 className="text-3xl font-comic text-primary-dark mb-4">Kết quả</h2>

        <div className="text-5xl font-bold text-accent mb-6">
          {score}/{questions.length}
        </div>

        <div className="mb-8">
          <p className="text-xl mb-4">
            {score === questions.length
              ? "Tuyệt vời! Bạn đã trả lời đúng tất cả các câu hỏi!"
              : score >= questions.length / 2
              ? "Khá tốt! Hãy tiếp tục cố gắng nhé!"
              : "Hãy cố gắng luyện tập thêm nhé!"}
          </p>

          <div className="mt-6 flex justify-center space-x-4">
            <motion.button
              className="bg-primary text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:bg-primary-dark transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRestart}
            >
              Làm lại
            </motion.button>

            <motion.a
              href="/"
              className="bg-secondary text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:bg-secondary-dark transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Về trang chủ
            </motion.a>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="relative">
      {/* Hiệu ứng bong bóng và sao */}
      {showBubbles && <Bubbles />}
      {showStars && <Stars />}

      {/* Hiển thị câu hỏi hiện tại */}
      <AnimatePresence mode="wait">
        <Question
          key={questions[currentQuestionIndex]?.id}
          question={questions[currentQuestionIndex]}
          onAnswer={handleAnswer}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
        />
      </AnimatePresence>

      {/* Hiển thị thanh tiến trình */}
      <div className="mt-8 bg-white bg-opacity-50 rounded-full h-4 w-full max-w-2xl mx-auto overflow-hidden">
        <motion.div
          className="h-4 bg-primary rounded-full"
          initial={{
            width: `${(currentQuestionIndex / questions.length) * 100}%`,
          }}
          animate={{
            width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
          }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
};

export default QuizContainer;
