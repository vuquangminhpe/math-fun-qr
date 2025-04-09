import { Question, QuestionBank } from "@/types";
import level1Questions from "./questionBank/level1Questions";
import level2Questions from "./questionBank/level2Questions";
import level3Questions from "./questionBank/level3Questions";

// Tạo kho dữ liệu câu hỏi
const questionBanks: QuestionBank[] = [
  { level: 1, questions: level1Questions },
  { level: 2, questions: level2Questions },
  { level: 3, questions: level3Questions },
];

// Lấy ngẫu nhiên câu hỏi từ level
export const getRandomQuestions = (
  level: number,
  count: number = 5
): Question[] => {
  const bank = questionBanks.find((bank) => bank.level === level);

  if (!bank || bank.questions.length === 0) {
    return [];
  }

  // Sao chép mảng để không ảnh hưởng đến mảng gốc
  const shuffled = [...bank.questions].sort(() => 0.5 - Math.random());

  // Lấy số lượng câu hỏi theo yêu cầu
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

// Lấy tất cả câu hỏi từ level
export const getAllQuestions = (level: number): Question[] => {
  const bank = questionBanks.find((bank) => bank.level === level);
  return bank ? bank.questions : [];
};

// Lấy một câu hỏi cụ thể theo ID
export const getQuestionById = (questionId: string): Question | undefined => {
  for (const bank of questionBanks) {
    const question = bank.questions.find((q) => q.id === questionId);
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
