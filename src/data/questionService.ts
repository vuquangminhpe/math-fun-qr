/* eslint-disable @typescript-eslint/no-unused-vars */
import { Question, QuestionBank } from "@/types";
import level1Questions from "./questionBank/level1Questions";
import level2Questions from "./questionBank/level2Questions";
import level3Questions from "./questionBank/level3Questions";

// Function to get questions from localStorage or default banks
const getQuestionsForLevel = (level: number): Question[] => {
  // Check if we have modified questions in localStorage
  if (typeof window !== "undefined") {
    // Check if running in browser
    try {
      const storedQuestions = localStorage.getItem("modifiedQuestions");
      const timestamp = localStorage.getItem("questionsTimestamp");

      if (storedQuestions && timestamp) {
        const savedTime = parseInt(timestamp, 10);
        const now = new Date().getTime();

        // If less than 24 hours have passed, use stored questions
        if (now - savedTime <= 24 * 60 * 60 * 1000) {
          const parsed = JSON.parse(storedQuestions);
          if (parsed && parsed[level] && Array.isArray(parsed[level])) {
            return parsed[level];
          }
        }
      }
    } catch (e) {
      console.error("Error accessing localStorage:", e);
    }
  }

  // Default to original question banks if no valid stored questions
  switch (level) {
    case 1:
      return level1Questions;
    case 2:
      return level2Questions;
    case 3:
      return level3Questions;
    default:
      return [];
  }
};

// Tạo kho dữ liệu câu hỏi
const questionBanks: QuestionBank[] = [
  { level: 1, questions: getQuestionsForLevel(1) },
  { level: 2, questions: getQuestionsForLevel(2) },
  { level: 3, questions: getQuestionsForLevel(3) },
];

// Lấy ngẫu nhiên câu hỏi từ level
export const getRandomQuestions = (
  level: number,
  count: number = 5
): Question[] => {
  // Always get fresh questions to ensure we get the latest from localStorage
  const questions = getQuestionsForLevel(level);

  if (!questions || questions.length === 0) {
    return [];
  }

  // Sao chép mảng để không ảnh hưởng đến mảng gốc
  const shuffled = [...questions].sort(() => 0.5 - Math.random());

  // Lấy số lượng câu hỏi theo yêu cầu
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

// Lấy tất cả câu hỏi từ level
export const getAllQuestions = (level: number): Question[] => {
  return getQuestionsForLevel(level);
};

// Lấy một câu hỏi cụ thể theo ID
export const getQuestionById = (questionId: string): Question | undefined => {
  for (let i = 1; i <= 3; i++) {
    const questions = getQuestionsForLevel(i);
    const question = questions.find((q) => q.id === questionId);
    if (question) {
      return question;
    }
  }
  return undefined;
};

// Kiểm tra đáp án có đúng không
export const checkAnswer = (questionId: string, answerId: string): boolean => {
  const question = getQuestionById(questionId);
  if (!question) return false;

  const answer = question.answers.find((a) => a.id === answerId);
  return answer ? answer.isCorrect : false;
};

// Thông tin mỗi level
export const levelInfo = [
  {
    id: 1,
    title: "Cấp độ 1: Toán Cơ Bản",
    description: "Các bài toán đơn giản về phép cộng, trừ, nhân, chia",
    color: "primary",
    backgroundImage: "/images/backgrounds/bg1.png",
  },
  {
    id: 2,
    title: "Cấp độ 2: Toán Trung Bình",
    description: "Các bài toán có lời văn phức tạp hơn về tốc độ, thời gian",
    color: "secondary",
    backgroundImage: "/images/backgrounds/bg3.jpg",
  },
  {
    id: 3,
    title: "Cấp độ 3: Toán Nâng Cao",
    description: "Các bài toán phức tạp hơn đòi hỏi nhiều bước giải",
    color: "accent",
    backgroundImage: "/images/backgrounds/bg5.jpg",
  },
];
