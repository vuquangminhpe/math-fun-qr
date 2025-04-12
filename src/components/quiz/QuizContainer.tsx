import React, { useState, useEffect } from "react";
import { Question as QuestionType } from "@/types";
import Question from "./Question";
import { getRandomQuestions } from "@/data/questionService";
import "../styles/QuizContainer.css";
import Link from "next/link";

interface QuizContainerProps {
  level: number;
  questionsCount?: number;
}

// Interface để lưu kết quả bài làm
interface QuizResult {
  id: string;
  studentName: string;
  level: number;
  score: number;
  totalQuestions: number;
  accuracy: number;
  date: string;
  timestamp: number;
}

const QuizContainer: React.FC<QuizContainerProps> = ({
  level,
  questionsCount = 10, // Tăng số lượng câu hỏi lên 10
}) => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [showNamePrompt, setShowNamePrompt] = useState(false);

  // Lấy câu hỏi khi component được tạo
  useEffect(() => {
    const loadQuestions = () => {
      setLoading(true);
      const fetchedQuestions = getRandomQuestions(level, questionsCount);
      setQuestions(fetchedQuestions);
      setCurrentQuestionIndex(0);
      setUserAnswers({});
      setScore(0);
      setShowResult(false);
      setAllQuestionsAnswered(false);
      setLoading(false);
    };

    loadQuestions();
  }, [level, questionsCount]);

  // Kiểm tra khi tất cả câu hỏi đã được trả lời
  useEffect(() => {
    if (questions.length > 0) {
      const allAnswered = questions.every(
        (q) => userAnswers[q.id] !== undefined
      );
      setAllQuestionsAnswered(allAnswered);
    }
  }, [userAnswers, questions]);

  // Xử lý khi người dùng trả lời câu hỏi
  const handleAnswer = (questionId: string, answerId: string) => {
    // Lưu câu trả lời của người dùng nhưng chưa tính điểm
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));

    // Tự động chuyển sang câu hỏi tiếp theo nếu chưa phải câu cuối
    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      }, 500);
    }
  };

  // Tính điểm khi hoàn thành
  const calculateScore = () => {
    let newScore = 0;

    questions.forEach((question) => {
      const userAnswerId = userAnswers[question.id];
      if (userAnswerId) {
        const selectedAnswer = question.answers.find(
          (a) => a.id === userAnswerId
        );
        if (selectedAnswer && selectedAnswer.isCorrect) {
          newScore += 1;
        }
      }
    });

    return newScore;
  };

  // Hiển thị kết quả
  const showFinalResult = () => {
    setShowNamePrompt(true);
  };

  // Lưu kết quả vào localStorage
  const saveQuizResult = (name: string) => {
    const finalScore = calculateScore();
    setScore(finalScore);

    // Tạo kết quả bài làm
    const accuracy = Math.round((finalScore / questions.length) * 100);
    const now = new Date();
    const quizResult: QuizResult = {
      id: `quiz_${now.getTime()}`,
      studentName: name || "Học sinh không tên",
      level,
      score: finalScore,
      totalQuestions: questions.length,
      accuracy,
      date: now.toLocaleString("vi-VN"),
      timestamp: now.getTime(),
    };

    // Lấy danh sách kết quả cũ từ localStorage
    const savedResults = localStorage.getItem("quizResults");
    const quizResults: QuizResult[] = savedResults
      ? JSON.parse(savedResults)
      : [];

    // Thêm kết quả mới vào đầu danh sách
    quizResults.unshift(quizResult);

    // Lưu lại vào localStorage
    localStorage.setItem("quizResults", JSON.stringify(quizResults));

    // Hiển thị kết quả
    setShowResult(true);
    setShowNamePrompt(false);
  };

  // Xử lý khi bắt đầu làm lại bài
  const handleRestart = () => {
    const newQuestions = getRandomQuestions(level, questionsCount);
    setQuestions(newQuestions);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setScore(0);
    setShowResult(false);
    setAllQuestionsAnswered(false);
  };

  // Xử lý khi chọn câu hỏi cụ thể từ thanh chỉ báo
  const handleSelectQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  // Hiển thị form nhập tên
  if (showNamePrompt) {
    return (
      <div className="result-card">
        <h2 className="result-title">Nhập tên của bạn</h2>
        <p className="result-message">
          Vui lòng nhập tên để lưu kết quả bài làm
        </p>

        <div style={{ margin: "20px 0" }}>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Nhập tên của bạn"
            className="name-input"
            style={{
              padding: "10px",
              borderRadius: "0.5rem",
              border: "1px solid #e5e7eb",
              width: "100%",
              fontSize: "1rem",
            }}
          />
        </div>

        <div className="result-actions">
          <button
            className="result-button restart-button"
            onClick={() => saveQuizResult(studentName)}
          >
            Lưu kết quả
          </button>
          <button
            className="result-button home-button"
            onClick={() => setShowNamePrompt(false)}
            style={{ marginLeft: "10px" }}
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  // Hiển thị kết quả
  if (showResult) {
    const accuracy = Math.round((score / questions.length) * 100);

    return (
      <div className="result-card">
        <h2 className="result-title">Kết quả của bạn</h2>

        <div className="result-score">
          {score}/{questions.length}
        </div>

        <div className="result-feedback">
          <p className="result-message">
            {score === questions.length
              ? "Tuyệt vời! Bạn đã trả lời đúng tất cả các câu hỏi!"
              : score >= questions.length / 2
              ? "Khá tốt! Hãy tiếp tục cố gắng nhé!"
              : "Hãy cố gắng luyện tập thêm nhé!"}
          </p>
          <p className="result-accuracy">Chính xác: {accuracy}%</p>
        </div>

        {/* Chi tiết từng câu hỏi */}
        <div className="result-details">
          <h3 className="result-subtitle">Chi tiết câu trả lời:</h3>
          <div className="result-questions-list">
            {questions.map((question, index) => {
              const userAnswerId = userAnswers[question.id];
              const selectedAnswer = question.answers.find(
                (a) => a.id === userAnswerId
              );
              const isCorrect = selectedAnswer?.isCorrect || false;

              return (
                <div
                  key={question.id}
                  className={`result-question-item ${
                    isCorrect ? "correct" : "incorrect"
                  }`}
                >
                  <div className="result-question-number">Câu {index + 1}</div>
                  <div className="result-question-status">
                    {isCorrect ? (
                      <svg
                        className="result-icon correct"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="result-icon incorrect"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="result-actions">
          <button
            className="result-button restart-button"
            onClick={handleRestart}
          >
            Làm lại
          </button>
          <Link href="/" passHref>
            <a className="result-button home-button">Về trang chủ</a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      {/* Hiển thị câu hỏi hiện tại */}
      <div className="question-container">
        <Question
          question={questions[currentQuestionIndex]}
          onAnswer={(answerId) =>
            handleAnswer(questions[currentQuestionIndex].id, answerId)
          }
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          userSelectedAnswer={userAnswers[questions[currentQuestionIndex]?.id]}
        />
      </div>

      {/* Question indicators */}
      <div className="question-indicators">
        {questions.map((_, index) => (
          <button
            key={index}
            className={`indicator ${
              index === currentQuestionIndex
                ? "active"
                : userAnswers[questions[index]?.id]
                ? "answered"
                : ""
            }`}
            onClick={() => handleSelectQuestion(index)}
            aria-label={`Câu hỏi ${index + 1}`}
          />
        ))}
      </div>

      {/* Button nộp bài và xem kết quả */}
      <div className="submit-container">
        <button
          className={`submit-button ${
            allQuestionsAnswered ? "active" : "disabled"
          }`}
          onClick={showFinalResult}
          disabled={!allQuestionsAnswered}
        >
          {allQuestionsAnswered
            ? "Nộp bài và xem kết quả"
            : "Vui lòng trả lời tất cả câu hỏi"}
        </button>
      </div>
    </div>
  );
};

export default QuizContainer;
