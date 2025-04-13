import { Question } from "@/types";

// Kho câu hỏi cấp độ 1 - Câu hỏi toán đơn giản chỉ có phép cộng và trừ
const level1Questions: Question[] = [
  {
    id: "l1q1",
    text: "5 + 3 + 2 = ?",
    answers: [
      { id: "l1q1a1", text: "9", isCorrect: false },
      { id: "l1q1a2", text: "10", isCorrect: true },
      { id: "l1q1a3", text: "11", isCorrect: false },
      { id: "l1q1a4", text: "12", isCorrect: false },
    ],
    difficulty: "easy",
  },
  {
    id: "l1q2",
    text: "25 + 18 = ?",
    answers: [
      { id: "l1q2a1", text: "43", isCorrect: true },
      { id: "l1q2a2", text: "42", isCorrect: false },
      { id: "l1q2a3", text: "44", isCorrect: false },
      { id: "l1q2a4", text: "45", isCorrect: false },
    ],
    difficulty: "easy",
  },
  {
    id: "l1q3",
    text: "37 - 15 = ?",
    answers: [
      { id: "l1q3a1", text: "21", isCorrect: false },
      { id: "l1q3a2", text: "22", isCorrect: true },
      { id: "l1q3a3", text: "23", isCorrect: false },
      { id: "l1q3a4", text: "24", isCorrect: false },
    ],
    difficulty: "easy",
  },
  {
    id: "l1q4",
    text: "42 - 25 = ?",
    answers: [
      { id: "l1q4a1", text: "16", isCorrect: false },
      { id: "l1q4a2", text: "17", isCorrect: true },
      { id: "l1q4a3", text: "18", isCorrect: false },
      { id: "l1q4a4", text: "19", isCorrect: false },
    ],
    difficulty: "easy",
  },
  {
    id: "l1q5",
    text: "35 + 20 = ?",
    answers: [
      { id: "l1q5a1", text: "55", isCorrect: true },
      { id: "l1q5a2", text: "50", isCorrect: false },
      { id: "l1q5a3", text: "60", isCorrect: false },
      { id: "l1q5a4", text: "65", isCorrect: false },
    ],
    difficulty: "medium",
  },
  {
    id: "l1q6",
    text: "70 - 25 = ?",
    answers: [
      { id: "l1q6a1", text: "40", isCorrect: false },
      { id: "l1q6a2", text: "45", isCorrect: true },
      { id: "l1q6a3", text: "50", isCorrect: false },
      { id: "l1q6a4", text: "55", isCorrect: false },
    ],
    difficulty: "medium",
  },
  {
    id: "l1q7",
    text: "7 + 8 + 9 = ?",
    answers: [
      { id: "l1q7a1", text: "23", isCorrect: false },
      { id: "l1q7a2", text: "24", isCorrect: true },
      { id: "l1q7a3", text: "25", isCorrect: false },
      { id: "l1q7a4", text: "26", isCorrect: false },
    ],
    difficulty: "medium",
  },
  {
    id: "l1q8",
    text: "9 + 6 - 3 = ?",
    answers: [
      { id: "l1q8a1", text: "11", isCorrect: false },
      { id: "l1q8a2", text: "12", isCorrect: true },
      { id: "l1q8a3", text: "13", isCorrect: false },
      { id: "l1q8a4", text: "14", isCorrect: false },
    ],
    difficulty: "medium",
  },
  {
    id: "l1q9",
    text: "45 + 35 = ?",
    answers: [
      { id: "l1q9a1", text: "75", isCorrect: false },
      { id: "l1q9a2", text: "80", isCorrect: true },
      { id: "l1q9a3", text: "85", isCorrect: false },
      { id: "l1q9a4", text: "90", isCorrect: false },
    ],
    difficulty: "hard",
  },
  {
    id: "l1q10",
    text: "64 - 27 = ?",
    answers: [
      { id: "l1q10a1", text: "36", isCorrect: false },
      { id: "l1q10a2", text: "37", isCorrect: true },
      { id: "l1q10a3", text: "38", isCorrect: false },
      { id: "l1q10a4", text: "39", isCorrect: false },
    ],
    difficulty: "hard",
  },
  {
    id: "l1q11",
    text: "5 + 8 - 3 = ?",
    answers: [
      { id: "l1q11a1", text: "9", isCorrect: false },
      { id: "l1q11a2", text: "10", isCorrect: true },
      { id: "l1q11a3", text: "11", isCorrect: false },
      { id: "l1q11a4", text: "12", isCorrect: false },
    ],
    difficulty: "medium",
  },
  {
    id: "l1q12",
    text: "28 + 32 = ?",
    answers: [
      { id: "l1q12a1", text: "50", isCorrect: false },
      { id: "l1q12a2", text: "60", isCorrect: true },
      { id: "l1q12a3", text: "58", isCorrect: false },
      { id: "l1q12a4", text: "62", isCorrect: false },
    ],
    difficulty: "medium",
  },
  {
    id: "l1q13",
    text: "4 + 7 + 5 = ?",
    answers: [
      { id: "l1q13a1", text: "15", isCorrect: false },
      { id: "l1q13a2", text: "16", isCorrect: true },
      { id: "l1q13a3", text: "17", isCorrect: false },
      { id: "l1q13a4", text: "18", isCorrect: false },
    ],
    difficulty: "medium",
  },
  {
    id: "l1q14",
    text: "56 - 28 = ?",
    answers: [
      { id: "l1q14a1", text: "27", isCorrect: false },
      { id: "l1q14a2", text: "28", isCorrect: true },
      { id: "l1q14a3", text: "29", isCorrect: false },
      { id: "l1q14a4", text: "30", isCorrect: false },
    ],
    difficulty: "medium",
  },
  {
    id: "l1q15",
    text: "6 - 2 + 9 = ?",
    answers: [
      { id: "l1q15a1", text: "12", isCorrect: false },
      { id: "l1q15a2", text: "13", isCorrect: true },
      { id: "l1q15a3", text: "14", isCorrect: false },
      { id: "l1q15a4", text: "15", isCorrect: false },
    ],
    difficulty: "hard",
  },
];
export default level1Questions;
