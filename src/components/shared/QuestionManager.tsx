import React, { useState, useEffect } from "react";
import { Question } from "@/types";
import level1Questions from "@/data/questionBank/level1Questions";
import level2Questions from "@/data/questionBank/level2Questions";
import level3Questions from "@/data/questionBank/level3Questions";
import "../styles/QuestionManager.css";

const QuestionManager: React.FC = () => {
  // Store questions by level
  const [questionsByLevel, setQuestionsByLevel] = useState<
    Record<number, Question[]>
  >({
    1: [],
    2: [],
    3: [],
  });
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  // New question template
  const emptyQuestion: Question = {
    id: "",
    text: "",
    answers: [
      { id: "", text: "", isCorrect: true },
      { id: "", text: "", isCorrect: false },
      { id: "", text: "", isCorrect: false },
      { id: "", text: "", isCorrect: false },
    ],
    difficulty: "medium",
  };

  // Form state for editing/adding
  const [formData, setFormData] = useState<Question>({ ...emptyQuestion });

  // Load questions on init
  useEffect(() => {
    const loadQuestions = () => {
      // Get questions from localStorage first, if they exist
      const storedQuestions = localStorage.getItem("modifiedQuestions");

      if (storedQuestions) {
        try {
          const parsed = JSON.parse(storedQuestions);
          setQuestionsByLevel(parsed);
        } catch (e) {
          console.error("Error parsing stored questions", e);
          loadDefaultQuestions();
        }
      } else {
        loadDefaultQuestions();
      }
    };

    // Load the default questions from the imported modules
    const loadDefaultQuestions = () => {
      setQuestionsByLevel({
        1: [...level1Questions],
        2: [...level2Questions],
        3: [...level3Questions],
      });
    };

    // Remove expired stored questions (older than 24 hours)
    const checkExpiredQuestions = () => {
      const timestamp = localStorage.getItem("questionsTimestamp");
      if (timestamp) {
        const savedTime = parseInt(timestamp, 10);
        const now = new Date().getTime();
        // Check if more than 24 hours have passed
        if (now - savedTime > 24 * 60 * 60 * 1000) {
          localStorage.removeItem("modifiedQuestions");
          localStorage.removeItem("questionsTimestamp");
          loadDefaultQuestions();
          return;
        }
      }

      loadQuestions();
    };

    checkExpiredQuestions();
  }, []);

  // Save questions to localStorage
  const saveQuestions = (questions: Record<number, Question[]>) => {
    localStorage.setItem("modifiedQuestions", JSON.stringify(questions));
    localStorage.setItem("questionsTimestamp", new Date().getTime().toString());
    setQuestionsByLevel(questions);
  };

  // Handle edit question
  const handleEditQuestion = (question: Question) => {
    setSelectedQuestion(question);
    setFormData({ ...question });
    setIsEditing(true);
    setIsAdding(false);
  };

  // Handle add new question
  const handleAddQuestion = () => {
    // Generate a new unique ID for the question based on level and timestamp
    const newId = `l${selectedLevel}q${new Date()
      .getTime()
      .toString()
      .substring(8)}`;

    const newQuestion = {
      ...emptyQuestion,
      id: newId,
      answers: emptyQuestion.answers.map((answer, index) => ({
        ...answer,
        id: `${newId}a${index + 1}`,
      })),
    };

    setFormData(newQuestion);
    setSelectedQuestion(null);
    setIsEditing(false);
    setIsAdding(true);
  };

  // Handle delete question
  const handleDeleteQuestion = (question: Question) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa câu hỏi này không?")) {
      const updatedQuestions = {
        ...questionsByLevel,
        [selectedLevel]: questionsByLevel[selectedLevel].filter(
          (q) => q.id !== question.id
        ),
      };

      saveQuestions(updatedQuestions);

      if (selectedQuestion?.id === question.id) {
        setSelectedQuestion(null);
        setIsEditing(false);
      }
    }
  };

  // Save edited question
  const saveQuestion = () => {
    if (isAdding) {
      // Add new question
      const updatedQuestions = {
        ...questionsByLevel,
        [selectedLevel]: [...questionsByLevel[selectedLevel], formData],
      };
      saveQuestions(updatedQuestions);
    } else if (isEditing && selectedQuestion) {
      // Update existing question
      const updatedQuestions = {
        ...questionsByLevel,
        [selectedLevel]: questionsByLevel[selectedLevel].map((q) =>
          q.id === selectedQuestion.id ? formData : q
        ),
      };
      saveQuestions(updatedQuestions);
    }

    // Reset states
    setIsEditing(false);
    setIsAdding(false);
    setSelectedQuestion(null);
    setFormData({ ...emptyQuestion });
  };

  // Cancel editing/adding
  const cancelEdit = () => {
    setIsEditing(false);
    setIsAdding(false);
    setSelectedQuestion(null);
    setFormData({ ...emptyQuestion });
  };

  // Handle form changes for question text
  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      text: e.target.value,
    });
  };

  // Handle form changes for answers
  const handleAnswerChange = (
    index: number,
    field: "text" | "isCorrect",
    value: string | boolean
  ) => {
    const newAnswers = [...formData.answers];
    if (field === "isCorrect") {
      // If setting this answer as correct, set all others to false
      newAnswers.forEach((answer, i) => {
        newAnswers[i] = {
          ...answer,
          isCorrect: i === index,
        };
      });
    } else {
      newAnswers[index] = {
        ...newAnswers[index],
        [field]: value as string,
      };
    }

    setFormData({
      ...formData,
      answers: newAnswers,
    });
  };

  // Handle form changes for difficulty
  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      difficulty: e.target.value as "easy" | "medium" | "hard",
    });
  };

  // Reset all questions to default
  const handleResetAllQuestions = () => {
    if (
      window.confirm(
        "Bạn có chắc chắn muốn đặt lại tất cả câu hỏi về mặc định không? Mọi thay đổi sẽ bị mất."
      )
    ) {
      localStorage.removeItem("modifiedQuestions");
      localStorage.removeItem("questionsTimestamp");

      setQuestionsByLevel({
        1: [...level1Questions],
        2: [...level2Questions],
        3: [...level3Questions],
      });

      setSelectedQuestion(null);
      setIsEditing(false);
      setIsAdding(false);
    }
  };

  // Get a readable difficulty label
  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "Dễ";
      case "medium":
        return "Trung bình";
      case "hard":
        return "Khó";
      default:
        return difficulty;
    }
  };

  return (
    <div className="question-manager">
      <div className="question-manager-header">
        <h2>Quản lý câu hỏi</h2>
        <div className="level-selector">
          <span>Chọn cấp độ:</span>
          {Object.keys(questionsByLevel).map((level) => (
            <button
              key={level}
              className={`level-btn ${
                parseInt(level) === selectedLevel ? "active" : ""
              } level-${level}-btn`}
              onClick={() => {
                setSelectedLevel(parseInt(level));
                setSelectedQuestion(null);
                setIsEditing(false);
                setIsAdding(false);
              }}
            >
              Cấp độ {level}
            </button>
          ))}
        </div>
        <div className="action-buttons">
          <button
            className="add-question-btn"
            onClick={handleAddQuestion}
            disabled={isEditing || isAdding}
          >
            Thêm câu hỏi mới
          </button>
          <button
            className="reset-questions-btn"
            onClick={handleResetAllQuestions}
          >
            Đặt lại câu hỏi mặc định
          </button>
        </div>
      </div>

      <div className="question-manager-content">
        <div className="questions-list">
          <h3>Danh sách câu hỏi cấp độ {selectedLevel}</h3>
          {questionsByLevel[selectedLevel]?.length === 0 ? (
            <p className="no-questions">Không có câu hỏi nào ở cấp độ này.</p>
          ) : (
            <div className="questions-table-container">
              <table className="questions-table">
                <thead>
                  <tr>
                    <th style={{ width: "5%" }}>ID</th>
                    <th style={{ width: "50%" }}>Nội dung câu hỏi</th>
                    <th style={{ width: "15%" }}>Độ khó</th>
                    <th style={{ width: "30%" }}>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {questionsByLevel[selectedLevel].map((question, index) => (
                    <tr key={question.id}>
                      <td>{index + 1}</td>
                      <td className="question-text-cell">
                        {question.text.length > 80
                          ? `${question.text.substring(0, 80)}...`
                          : question.text}
                      </td>
                      <td>
                        <span
                          className={`difficulty-badge ${question.difficulty}`}
                        >
                          {getDifficultyLabel(question.difficulty)}
                        </span>
                      </td>
                      <td>
                        <div className="question-actions">
                          <button
                            className="edit-btn"
                            onClick={() => handleEditQuestion(question)}
                            disabled={isEditing || isAdding}
                          >
                            Sửa
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => handleDeleteQuestion(question)}
                            disabled={isEditing || isAdding}
                          >
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {(isEditing || isAdding) && (
          <div className="question-form">
            <h3>{isAdding ? "Thêm câu hỏi mới" : "Chỉnh sửa câu hỏi"}</h3>

            <div className="form-group">
              <label htmlFor="question-text">Nội dung câu hỏi:</label>
              <textarea
                id="question-text"
                value={formData.text}
                onChange={handleQuestionChange}
                placeholder="Nhập nội dung câu hỏi ở đây..."
                rows={4}
              />
            </div>

            <div className="form-group">
              <label>Độ khó:</label>
              <select
                value={formData.difficulty}
                onChange={handleDifficultyChange}
              >
                <option value="easy">Dễ</option>
                <option value="medium">Trung bình</option>
                <option value="hard">Khó</option>
              </select>
            </div>

            <div className="form-group">
              <label>Đáp án:</label>
              {formData.answers.map((answer, index) => (
                <div key={index} className="answer-input-group">
                  <div className="answer-letter">
                    {["A", "B", "C", "D"][index]}
                  </div>
                  <input
                    type="text"
                    value={answer.text}
                    onChange={(e) =>
                      handleAnswerChange(index, "text", e.target.value)
                    }
                    placeholder={`Nhập đáp án ${
                      ["A", "B", "C", "D"][index]
                    }...`}
                  />
                  <label className="correct-answer-label">
                    <input
                      type="radio"
                      name="correct-answer"
                      checked={answer.isCorrect}
                      onChange={() =>
                        handleAnswerChange(index, "isCorrect", true)
                      }
                    />
                    Đáp án đúng
                  </label>
                </div>
              ))}
            </div>

            <div className="form-actions">
              <button className="cancel-btn" onClick={cancelEdit}>
                Hủy
              </button>
              <button
                className="save-btn"
                onClick={saveQuestion}
                disabled={
                  !formData.text ||
                  formData.answers.some((a) => !a.text) ||
                  !formData.answers.some((a) => a.isCorrect)
                }
              >
                Lưu
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionManager;
