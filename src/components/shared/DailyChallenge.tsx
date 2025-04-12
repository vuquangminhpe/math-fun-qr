/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { getRandomQuestions } from "@/data/questionService";
import Question from "../quiz/Question";
import "../styles/DailyChallenge.css";
import Confetti from "../animations/Confetti";
import Stars from "../animations/Stars";

const DailyChallenge: React.FC = () => {
  const [dailyQuestion, setDailyQuestion] = useState<any>(null);
  const [answered, setAnswered] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [streak, setStreak] = useState<number>(0);
  const [showAnimation, setShowAnimation] = useState<boolean>(false);

  useEffect(() => {
    const initChallenge = () => {
      setLoading(true);

      // Check if user has completed today's challenge
      const lastCompletionDate = localStorage.getItem("dailyChallengeLastDate");
      const today = new Date().toISOString().split("T")[0];

      if (lastCompletionDate === today) {
        // User already did today's challenge
        const wasCorrect =
          localStorage.getItem("dailyChallengeCorrect") === "true";
        const lastQuestion = localStorage.getItem("dailyChallengeQuestion");
        const lastAnswerId = localStorage.getItem("dailyChallengeAnswerId");

        if (lastQuestion) {
          const parsedQuestion = JSON.parse(lastQuestion);
          setDailyQuestion(parsedQuestion);
          setAnswered(true);
          setSelectedAnswer(lastAnswerId || "");
          setIsCorrect(wasCorrect);
        }
      } else {
        // Generate a new question for today
        generateNewQuestion();
      }

      // Load streak
      const storedStreak = localStorage.getItem("dailyChallengeStreak");
      if (storedStreak) {
        setStreak(parseInt(storedStreak, 10));
      }

      setLoading(false);
    };

    initChallenge();
  }, []);

  const generateNewQuestion = () => {
    // Select a random level (1-3)
    const randomLevel = Math.floor(Math.random() * 3) + 1;
    // Get a random question from that level
    const questions = getRandomQuestions(randomLevel, 1);

    if (questions && questions.length > 0) {
      setDailyQuestion(questions[0]);

      // Store this question as today's challenge
      localStorage.setItem(
        "dailyChallengeQuestion",
        JSON.stringify(questions[0])
      );
    }
  };

  const handleAnswer = (answerId: string) => {
    if (answered) return;

    setSelectedAnswer(answerId);
    setAnswered(true);

    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem("dailyChallengeLastDate", today);
    localStorage.setItem("dailyChallengeAnswerId", answerId);

    // Check if answer is correct
    const selectedOption = dailyQuestion.answers.find(
      (a: any) => a.id === answerId
    );
    const correct = selectedOption?.isCorrect || false;
    setIsCorrect(correct);
    localStorage.setItem("dailyChallengeCorrect", correct.toString());

    // Update streak
    let newStreak = streak;
    if (correct) {
      newStreak += 1;
      setStreak(newStreak);
      localStorage.setItem("dailyChallengeStreak", newStreak.toString());

      // Play sound and show animation for correct answer
      setShowAnimation(true);
      setTimeout(() => {
        setShowAnimation(false);
      }, 3000);
    } else {
      // Reset streak for wrong answer
      setStreak(0);
      localStorage.setItem("dailyChallengeStreak", "0");
    }
  };

  const handleResetForTesting = () => {
    // This function is only for testing purposes
    localStorage.removeItem("dailyChallengeLastDate");
    localStorage.removeItem("dailyChallengeQuestion");
    localStorage.removeItem("dailyChallengeAnswerId");
    localStorage.removeItem("dailyChallengeCorrect");
    setAnswered(false);
    generateNewQuestion();
  };

  if (loading) {
    return (
      <div className="daily-challenge-loading">
        <div className="loading-spinner"></div>
        <p>Đang tải thử thách hàng ngày...</p>
      </div>
    );
  }

  if (!dailyQuestion) {
    return (
      <div className="daily-challenge-error">
        <p>Không thể tải thử thách hàng ngày. Vui lòng thử lại sau.</p>
      </div>
    );
  }

  return (
    <div className="daily-challenge-container">
      {showAnimation && isCorrect && (
        <div className="animation-container">
          {streak >= 5 ? <Confetti /> : <Stars />}
        </div>
      )}

      <div className="daily-challenge-header">
        <h2>Thử thách toán học hàng ngày</h2>
        <div className="daily-challenge-streak">
          <span className="streak-flame">🔥</span>
          <span className="streak-count">{streak}</span> ngày liên tiếp
        </div>
      </div>

      <div className="daily-challenge-question">
        <Question
          question={dailyQuestion}
          onAnswer={handleAnswer}
          userSelectedAnswer={selectedAnswer}
          questionNumber={1}
          totalQuestions={1}
          showFeedbackImmediately
        />
      </div>

      {answered && (
        <div
          className={`daily-challenge-result ${
            isCorrect ? "correct" : "incorrect"
          }`}
        >
          <h3>{isCorrect ? "Chính xác!" : "Chưa đúng!"}</h3>
          <p>
            {isCorrect
              ? `Tuyệt vời! Bạn đã trả lời đúng ${streak} ngày liên tiếp.`
              : "Hãy thử lại vào ngày mai nhé!"}
          </p>

          {isCorrect && streak >= 3 && (
            <div className="streak-achievement">
              <span className="achievement-icon">🏆</span>
              <span>Thành tích: {streak} ngày liên tiếp!</span>
            </div>
          )}

          {process.env.NODE_ENV === "development" && (
            <button
              className="reset-challenge-btn"
              onClick={handleResetForTesting}
            >
              Reset (chỉ dành cho testing)
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default DailyChallenge;
