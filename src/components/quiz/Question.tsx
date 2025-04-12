import React from "react";
import { Question as QuestionType } from "@/types";
import "../styles/Question.css";

interface QuestionProps {
  question: QuestionType;
  onAnswer: (answerId: string) => void;
  questionNumber: number;
  totalQuestions: number;
  userSelectedAnswer?: string;
  showFeedbackImmediately?: boolean; // Added this property
}

const Question: React.FC<QuestionProps> = ({
  question,
  onAnswer,
  questionNumber,
  totalQuestions,
  userSelectedAnswer,
  showFeedbackImmediately = false, // Default to false
}) => {
  // Xử lý khi người dùng chọn đáp án
  const handleSelectAnswer = (answerId: string) => {
    // Nếu đã chọn rồi thì không cho chọn nữa
    if (userSelectedAnswer) return;

    onAnswer(answerId);
  };

  // Get difficulty class
  const getDifficultyClass = () => {
    switch (question.difficulty) {
      case "easy":
        return "easy";
      case "medium":
        return "medium";
      case "hard":
        return "hard";
      default:
        return "";
    }
  };

  // Get difficulty label
  const getDifficultyLabel = () => {
    switch (question.difficulty) {
      case "easy":
        return "Dễ";
      case "medium":
        return "Trung bình";
      case "hard":
        return "Khó";
      default:
        return "";
    }
  };

  return (
    <div className="question-card">
      <div className="question-header">
        <div className="question-number">
          Câu hỏi {questionNumber}/{totalQuestions}
        </div>
        <div className={`difficulty-badge ${getDifficultyClass()}`}>
          {getDifficultyLabel()}
        </div>
      </div>

      <div className="question-body">
        <p className="question-text">{question.text}</p>

        <div className="answer-options">
          {question.answers.map((answer, index) => {
            let optionClass = "answer-option";

            if (userSelectedAnswer === answer.id) {
              optionClass += " selected";

              // Add feedback classes if immediate feedback is enabled
              if (showFeedbackImmediately) {
                optionClass += answer.isCorrect ? " correct" : " incorrect";
              }
            } else if (
              showFeedbackImmediately &&
              userSelectedAnswer &&
              answer.isCorrect
            ) {
              // Highlight the correct answer when user has selected a different answer
              optionClass += " correct";
            }

            return (
              <div
                key={answer.id}
                className={optionClass}
                onClick={() => handleSelectAnswer(answer.id)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="answer-letter">
                  {["A", "B", "C", "D"][index]}
                </div>
                <div className="answer-text">{answer.text}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Question;
