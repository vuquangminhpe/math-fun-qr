import { Question } from "@/types";

// Kho câu hỏi cấp độ 2 - Câu hỏi toán có lời văn trung bình
const level2Questions: Question[] = [
  {
    id: "l2q1",
    text: "Một cửa hàng có 145 quyển vở. Ngày thứ nhất bán được 38 quyển, ngày thứ hai bán được 42 quyển. Hỏi cửa hàng còn lại bao nhiêu quyển vở?",
    answers: [
      { id: "l2q1a1", text: "55 quyển vở", isCorrect: false },
      { id: "l2q1a2", text: "65 quyển vở", isCorrect: true },
      { id: "l2q1a3", text: "75 quyển vở", isCorrect: false },
      { id: "l2q1a4", text: "85 quyển vở", isCorrect: false },
    ],
    difficulty: "medium",
  },
  {
    id: "l2q2",
    text: "Một thùng có 256 quả cam. Người ta đã lấy ra 68 quả cam và cho thêm vào 45 quả cam. Hỏi thùng có tất cả bao nhiêu quả cam?",
    answers: [
      { id: "l2q2a1", text: "233 quả cam", isCorrect: true },
      { id: "l2q2a2", text: "223 quả cam", isCorrect: false },
      { id: "l2q2a3", text: "243 quả cam", isCorrect: false },
      { id: "l2q2a4", text: "213 quả cam", isCorrect: false },
    ],
    difficulty: "medium",
  },
  {
    id: "l2q3",
    text: "Một lớp học có 36 học sinh. Số học sinh nam ít hơn số học sinh nữ là 6 học sinh. Hỏi lớp học có bao nhiêu học sinh nam?",
    answers: [
      { id: "l2q3a1", text: "14 học sinh nam", isCorrect: false },
      { id: "l2q3a2", text: "15 học sinh nam", isCorrect: true },
      { id: "l2q3a3", text: "16 học sinh nam", isCorrect: false },
      { id: "l2q3a4", text: "18 học sinh nam", isCorrect: false },
    ],
    difficulty: "medium",
  },
  {
    id: "l2q4",
    text: "Một xe chở 385kg gạo. Xe đã chở đi bán 146kg gạo. Hỏi xe còn lại bao nhiêu kg gạo?",
    answers: [
      { id: "l2q4a1", text: "239kg gạo", isCorrect: true },
      { id: "l2q4a2", text: "241kg gạo", isCorrect: false },
      { id: "l2q4a3", text: "249kg gạo", isCorrect: false },
      { id: "l2q4a4", text: "251kg gạo", isCorrect: false },
    ],
    difficulty: "medium",
  },
  {
    id: "l2q5",
    text: "Một cửa hàng có 5 thùng táo, mỗi thùng có 28kg táo. Đã bán được 64kg táo. Hỏi cửa hàng còn bao nhiêu kg táo?",
    answers: [
      { id: "l2q5a1", text: "76kg táo", isCorrect: true },
      { id: "l2q5a2", text: "74kg táo", isCorrect: false },
      { id: "l2q5a3", text: "78kg táo", isCorrect: false },
      { id: "l2q5a4", text: "80kg táo", isCorrect: false },
    ],
    difficulty: "hard",
  },
  {
    id: "l2q6",
    text: "Một đoàn xe có 18 xe máy và 12 ô tô. Hỏi đoàn xe có tất cả bao nhiêu bánh xe? (Biết rằng xe máy có 2 bánh, ô tô có 4 bánh)",
    answers: [
      { id: "l2q6a1", text: "84 bánh xe", isCorrect: true },
      { id: "l2q6a2", text: "90 bánh xe", isCorrect: false },
      { id: "l2q6a3", text: "96 bánh xe", isCorrect: false },
      { id: "l2q6a4", text: "78 bánh xe", isCorrect: false },
    ],
    difficulty: "hard",
  },
  {
    id: "l2q7",
    text: "Một cửa hàng bán được 145 quyển sách trong 5 ngày. Trung bình mỗi ngày bán được bao nhiêu quyển sách?",
    answers: [
      { id: "l2q7a1", text: "28 quyển sách", isCorrect: false },
      { id: "l2q7a2", text: "29 quyển sách", isCorrect: true },
      { id: "l2q7a3", text: "30 quyển sách", isCorrect: false },
      { id: "l2q7a4", text: "31 quyển sách", isCorrect: false },
    ],
    difficulty: "hard",
  },
  {
    id: "l2q8",
    text: "Lan đi bộ từ nhà đến trường với vận tốc 4km/h trong thời gian 30 phút. Tính quãng đường từ nhà Lan đến trường?",
    answers: [
      { id: "l2q8a1", text: "1km", isCorrect: false },
      { id: "l2q8a2", text: "2km", isCorrect: true },
      { id: "l2q8a3", text: "3km", isCorrect: false },
      { id: "l2q8a4", text: "4km", isCorrect: false },
    ],
    difficulty: "hard",
  },
  {
    id: "l2q9",
    text: "Một cửa hàng có 3 loại kẹo: loại 1 có 125 cái, loại 2 có 215 cái, loại 3 có 184 cái. Người ta chia số kẹo đều vào 16 hộp. Hỏi mỗi hộp có bao nhiêu cái kẹo?",
    answers: [
      { id: "l2q9a1", text: "32 cái kẹo", isCorrect: false },
      { id: "l2q9a2", text: "33 cái kẹo", isCorrect: true },
      { id: "l2q9a3", text: "34 cái kẹo", isCorrect: false },
      { id: "l2q9a4", text: "35 cái kẹo", isCorrect: false },
    ],
    difficulty: "hard",
  },
  {
    id: "l2q10",
    text: "Một cửa hàng nhập về 8 thùng nước ngọt, mỗi thùng có 24 chai. Nếu bán mỗi chai với giá 15.000 đồng thì cửa hàng thu được bao nhiêu tiền?",
    answers: [
      { id: "l2q10a1", text: "2.880.000 đồng", isCorrect: true },
      { id: "l2q10a2", text: "2.800.000 đồng", isCorrect: false },
      { id: "l2q10a3", text: "2.850.000 đồng", isCorrect: false },
      { id: "l2q10a4", text: "2.900.000 đồng", isCorrect: false },
    ],
    difficulty: "hard",
  },
];

export default level2Questions;
