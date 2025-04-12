/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Question as QuestionType } from "@/types";
import Question from "./Question";
import { getRandomQuestions } from "@/data/questionService";
import "../styles/QuizContainer.css";
import Link from "next/link";

interface QuizContainerProps {
  level: number;
  questionsCount?: number;
  // Add the missing properties from MultiplayerPage
  timePerQuestion?: number;
  players?: any[];
  isMultiplayer?: boolean;
  onComplete?: (results: any) => void;
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
  timePerQuestion = 30, // Default value
  players = [], // Default empty array
  isMultiplayer = false, // Default to false
  onComplete, // Optional callback
}) => {
  const router = useRouter();
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timePerQuestion); // Add timer state

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

  // Add timer effect for multiplayer mode
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isMultiplayer && !showResult && questions.length > 0) {
      setTimeLeft(timePerQuestion);

      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            // Time's up, auto-submit current answer or move to next question
            if (currentQuestionIndex < questions.length - 1) {
              setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
              return timePerQuestion;
            } else if (!showResult) {
              // End of quiz
              showFinalResult();
            }
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [
    currentQuestionIndex,
    isMultiplayer,
    showResult,
    questions,
    timePerQuestion,
  ]);

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
        if (isMultiplayer) {
          setTimeLeft(timePerQuestion); // Reset timer for multiplayer mode
        }
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
    if (isMultiplayer) {
      const finalScore = calculateScore();
      if (onComplete) {
        // For multiplayer mode, call the onComplete callback
        onComplete(
          players.map((player) => ({
            playerId: player.id,
            score: finalScore, // In a real multiplayer scenario, each player would have their own score
          }))
        );
      }
    } else {
      // Single player flow
      setShowNamePrompt(true);
    }
  };

  // Lấy cấp độ đề xuất dựa trên độ chính xác
  const getRecommendedLevel = (accuracy: number): number => {
    if (accuracy < 40) return 1;
    if (accuracy < 60) return 2;
    return 3;
  };

  // Lấy thông báo đề xuất
  const getLevelRecommendation = (accuracy: number): string => {
    if (accuracy < 40) {
      return "Bạn nên luyện tập thêm cấp độ 1 để nâng cao kỹ năng cơ bản.";
    } else if (accuracy < 60) {
      return "Bạn có thể thử thách bản thân với cấp độ 2.";
    } else {
      return "Bạn đã sẵn sàng cho những thử thách khó hơn ở cấp độ 3!";
    }
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

  // Chuyển hướng đến level được đề xuất
  const navigateToLevel = (recommendedLevel: number) => {
    router.push(`/level${recommendedLevel}`);
  };

  // Chuyển hướng đến bảng xếp hạng
  const viewRankings = () => {
    router.push(`/rankings?level=${level}`);
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
    if (isMultiplayer) {
      setTimeLeft(timePerQuestion);
    }
  };

  // Xử lý khi chọn câu hỏi cụ thể từ thanh chỉ báo
  const handleSelectQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    if (isMultiplayer) {
      setTimeLeft(timePerQuestion);
    }
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
          Vui lòng nhập tên để lưu kết quả bài làm và xuất hiện trong bảng xếp
          hạng
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
    const recommendedLevel = getRecommendedLevel(accuracy);

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

        {/* Đề xuất cấp độ */}
        <div className="level-recommendation">
          <div className="recommendation-banner">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="recommendation-icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            <div className="recommendation-text">
              <h3>Đề xuất cho bạn:</h3>
              <p>{getLevelRecommendation(accuracy)}</p>
            </div>
          </div>

          {level !== recommendedLevel && (
            <button
              className={`try-recommended-level-btn level-${recommendedLevel}-btn`}
              onClick={() => navigateToLevel(recommendedLevel)}
            >
              Thử ngay cấp độ {recommendedLevel}
            </button>
          )}
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
          <button
            className="result-button view-rankings-button"
            onClick={viewRankings}
          >
            Xem xếp hạng
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
      {/* Timer for multiplayer mode */}
      {isMultiplayer && (
        <div className="timer-container">
          <div className="timer">
            <div className="timer-icon">⏱️</div>
            <div className="timer-value">{timeLeft}</div>
          </div>
        </div>
      )}

      {/* Player info for multiplayer mode */}
      {isMultiplayer && players.length > 0 && (
        <div className="players-container">
          {players.map((player) => (
            <div key={player.id} className="player-info">
              <div
                className="player-avatar"
                style={{ backgroundColor: player.color }}
              >
                {player.name.charAt(0)}
              </div>
              <div className="player-name">{player.name}</div>
            </div>
          ))}
        </div>
      )}

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
