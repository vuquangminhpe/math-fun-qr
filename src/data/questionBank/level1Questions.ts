import { Question } from "@/types";

// Kho câu hỏi cấp độ 1 - Câu hỏi toán có lời văn đơn giản
const level1Questions: Question[] = [
  {
    id: "l1q1",
    text: "Mai có 5 viên kẹo. Hoa cho Mai thêm 3 viên kẹo nữa. Hỏi Mai có tất cả bao nhiêu viên kẹo?",
    answers: [
      { id: "l1q1a1", text: "7 viên kẹo", isCorrect: false },
      { id: "l1q1a2", text: "8 viên kẹo", isCorrect: true },
      { id: "l1q1a3", text: "9 viên kẹo", isCorrect: false },
      { id: "l1q1a4", text: "10 viên kẹo", isCorrect: false },
    ],
    difficulty: "easy",
  },
  {
    id: "l1q2",
    text: "Một lớp học có 15 học sinh nam và 18 học sinh nữ. Hỏi lớp học có tất cả bao nhiêu học sinh?",
    answers: [
      { id: "l1q2a1", text: "33 học sinh", isCorrect: true },
      { id: "l1q2a2", text: "32 học sinh", isCorrect: false },
      { id: "l1q2a3", text: "30 học sinh", isCorrect: false },
      { id: "l1q2a4", text: "35 học sinh", isCorrect: false },
    ],
    difficulty: "easy",
  },
  {
    id: "l1q3",
    text: "Bố mua 24 quả táo. Bố chia đều cho 4 người trong gia đình. Hỏi mỗi người được bao nhiêu quả táo?",
    answers: [
      { id: "l1q3a1", text: "5 quả táo", isCorrect: false },
      { id: "l1q3a2", text: "6 quả táo", isCorrect: true },
      { id: "l1q3a3", text: "7 quả táo", isCorrect: false },
      { id: "l1q3a4", text: "8 quả táo", isCorrect: false },
    ],
    difficulty: "easy",
  },
  {
    id: "l1q4",
    text: "Lan có 12 quyển sách. Lan cho Hùng mượn 5 quyển. Hỏi Lan còn lại bao nhiêu quyển sách?",
    answers: [
      { id: "l1q4a1", text: "6 quyển sách", isCorrect: false },
      { id: "l1q4a2", text: "7 quyển sách", isCorrect: true },
      { id: "l1q4a3", text: "8 quyển sách", isCorrect: false },
      { id: "l1q4a4", text: "9 quyển sách", isCorrect: false },
    ],
    difficulty: "easy",
  },
  {
    id: "l1q5",
    text: "Một dãy số gồm có: 3, 6, 9, 12, 15. Tổng của dãy số này là bao nhiêu?",
    answers: [
      { id: "l1q5a1", text: "45", isCorrect: true },
      { id: "l1q5a2", text: "40", isCorrect: false },
      { id: "l1q5a3", text: "50", isCorrect: false },
      { id: "l1q5a4", text: "55", isCorrect: false },
    ],
    difficulty: "medium",
  },
  {
    id: "l1q6",
    text: "Minh có 50 viên bi. Minh chia bi thành 5 phần bằng nhau. Hỏi mỗi phần có bao nhiêu viên bi?",
    answers: [
      { id: "l1q6a1", text: "5 viên bi", isCorrect: false },
      { id: "l1q6a2", text: "10 viên bi", isCorrect: true },
      { id: "l1q6a3", text: "15 viên bi", isCorrect: false },
      { id: "l1q6a4", text: "20 viên bi", isCorrect: false },
    ],
    difficulty: "medium",
  },
  {
    id: "l1q7",
    text: "Trong vườn có 3 bụi hồng. Mỗi bụi hồng có 7 bông hoa. Hỏi tổng cộng có bao nhiêu bông hoa hồng?",
    answers: [
      { id: "l1q7a1", text: "18 bông hoa", isCorrect: false },
      { id: "l1q7a2", text: "21 bông hoa", isCorrect: true },
      { id: "l1q7a3", text: "24 bông hoa", isCorrect: false },
      { id: "l1q7a4", text: "28 bông hoa", isCorrect: false },
    ],
    difficulty: "medium",
  },
  {
    id: "l1q8",
    text: "Một tuần có 7 ngày. Hỏi 9 tuần có bao nhiêu ngày?",
    answers: [
      { id: "l1q8a1", text: "56 ngày", isCorrect: false },
      { id: "l1q8a2", text: "63 ngày", isCorrect: true },
      { id: "l1q8a3", text: "70 ngày", isCorrect: false },
      { id: "l1q8a4", text: "72 ngày", isCorrect: false },
    ],
    difficulty: "medium",
  },
  {
    id: "l1q9",
    text: "Má mua 2 kg táo, mỗi kg táo có giá 15.000 đồng. Hỏi má phải trả bao nhiêu tiền?",
    answers: [
      { id: "l1q9a1", text: "25.000 đồng", isCorrect: false },
      { id: "l1q9a2", text: "30.000 đồng", isCorrect: true },
      { id: "l1q9a3", text: "35.000 đồng", isCorrect: false },
      { id: "l1q9a4", text: "40.000 đồng", isCorrect: false },
    ],
    difficulty: "hard",
  },
  {
    id: "l1q10",
    text: "Hoa có 45 cái kẹo. Hoa chia kẹo cho 5 bạn, mỗi bạn được số kẹo bằng nhau. Hỏi mỗi bạn được bao nhiêu cái kẹo?",
    answers: [
      { id: "l1q10a1", text: "8 cái kẹo", isCorrect: false },
      { id: "l1q10a2", text: "9 cái kẹo", isCorrect: true },
      { id: "l1q10a3", text: "10 cái kẹo", isCorrect: false },
      { id: "l1q10a4", text: "11 cái kẹo", isCorrect: false },
    ],
    difficulty: "hard",
  },
];

export default level1Questions;
