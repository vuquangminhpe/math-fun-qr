import React from "react";
import { Question as QuestionType } from "@/types";
import "../styles/Question.css";

interface QuestionProps {
  question: QuestionType;
  onAnswer: (answerId: string) => void;
  questionNumber: number;
  totalQuestions: number;
  userSelectedAnswer?: string;
}

const Question: React.FC<QuestionProps> = ({
  question,
  onAnswer,
  questionNumber,
  totalQuestions,
  userSelectedAnswer,
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
            // Người dùng chỉ thấy mình đã chọn đáp án nào
            // Không hiển thị đáp án đúng/sai ngay lập tức
            let optionClass = "answer-option";
            if (userSelectedAnswer === answer.id) {
              optionClass += " selected";
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
