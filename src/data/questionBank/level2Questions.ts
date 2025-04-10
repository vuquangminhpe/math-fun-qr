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
    text: "Một cửa hàng có 5 thùng táo. Thùng 1 có 28kg táo, thùng 2 có 28kg táo, thùng 3 có 28kg táo, thùng 4 có 28kg táo, thùng 5 có 28kg táo. Đã bán được 64kg táo. Hỏi cửa hàng còn bao nhiêu kg táo?",
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
    text: "Một đoàn xe có 18 xe máy và 12 ô tô. Mỗi xe máy có bánh trước và bánh sau (tổng 2 bánh). Mỗi ô tô có 2 bánh trước và 2 bánh sau (tổng 4 bánh). Hỏi đoàn xe có tất cả bao nhiêu bánh xe?",
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
    text: "Một cửa hàng bán được 145 quyển sách trong 5 ngày. Nếu mỗi ngày bán được số sách bằng nhau, thì ngày thứ nhất bán 29 quyển, ngày thứ hai bán 29 quyển, và cứ như vậy. Hỏi mỗi ngày bán được bao nhiêu quyển sách?",
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
    text: "Lan đi bộ từ nhà đến trường trong thời gian 30 phút (0.5 giờ). Mỗi giờ Lan đi được 4km. Hỏi quãng đường từ nhà Lan đến trường là bao nhiêu?",
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
    text: "Một cửa hàng có 3 loại kẹo: loại 1 có 125 cái, loại 2 có 215 cái, loại 3 có 184 cái. Người ta xếp số kẹo vào 16 hộp sao cho mỗi hộp có số kẹo bằng nhau. Nếu mỗi hộp có 33 cái kẹo thì vừa đủ số kẹo. Hỏi mỗi hộp có bao nhiêu cái kẹo?",
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
    text: "Một cửa hàng nhập về 8 thùng nước ngọt. Thùng 1 có 12 chai, thùng 2 có 12 chai, thùng 3 có 12 chai, thùng 4 có 12 chai, thùng 5 có 12 chai, thùng 6 có 12 chai, thùng 7 có 12 chai, thùng 8 có 12 chai. Mỗi chai bán với giá 8 đồng. Hỏi nếu bán hết tất cả các chai nước ngọt, cửa hàng thu được bao nhiêu tiền?",
    answers: [
      { id: "l2q10a1", text: "768 đồng", isCorrect: true },
      { id: "l2q10a2", text: "758 đồng", isCorrect: false },
      { id: "l2q10a3", text: "778 đồng", isCorrect: false },
      { id: "l2q10a4", text: "788 đồng", isCorrect: false },
    ],
    difficulty: "hard",
  },
  // Thêm câu hỏi mới
  {
    id: "l2q11",
    text: "Một thư viện có 478 quyển sách tiếng Việt và 362 quyển sách tiếng Anh. Đã có 295 quyển sách được mượn. Hỏi thư viện còn lại bao nhiêu quyển sách?",
    answers: [
      { id: "l2q11a1", text: "545 quyển sách", isCorrect: true },
      { id: "l2q11a2", text: "535 quyển sách", isCorrect: false },
      { id: "l2q11a3", text: "555 quyển sách", isCorrect: false },
      { id: "l2q11a4", text: "565 quyển sách", isCorrect: false },
    ],
    difficulty: "medium",
  },
  {
    id: "l2q12",
    text: "Một lớp học có 28 học sinh. Mỗi tuần, mỗi học sinh phải làm 5 bài tập. Mỗi bài tập có 6 câu hỏi. Hỏi mỗi tuần cả lớp phải làm tổng cộng bao nhiêu câu hỏi?",
    answers: [
      { id: "l2q12a1", text: "840 câu hỏi", isCorrect: true },
      { id: "l2q12a2", text: "830 câu hỏi", isCorrect: false },
      { id: "l2q12a3", text: "850 câu hỏi", isCorrect: false },
      { id: "l2q12a4", text: "860 câu hỏi", isCorrect: false },
    ],
    difficulty: "medium",
  },
  {
    id: "l2q13",
    text: "Một cửa hàng bánh có 864 cái bánh. Cửa hàng đóng gói bánh vào các hộp, mỗi hộp đựng 12 cái bánh. Nếu đóng đủ 72 hộp thì vừa hết số bánh. Hỏi cửa hàng đóng gói được bao nhiêu hộp bánh?",
    answers: [
      { id: "l2q13a1", text: "72 hộp bánh", isCorrect: true },
      { id: "l2q13a2", text: "70 hộp bánh", isCorrect: false },
      { id: "l2q13a3", text: "74 hộp bánh", isCorrect: false },
      { id: "l2q13a4", text: "76 hộp bánh", isCorrect: false },
    ],
    difficulty: "medium",
  },
  {
    id: "l2q14",
    text: "Một cửa hàng bán 3 loại trái cây: 125kg táo, 95kg cam và 76kg lê. Hỏi cửa hàng có tổng cộng bao nhiêu kg trái cây?",
    answers: [
      { id: "l2q14a1", text: "296kg", isCorrect: true },
      { id: "l2q14a2", text: "286kg", isCorrect: false },
      { id: "l2q14a3", text: "306kg", isCorrect: false },
      { id: "l2q14a4", text: "316kg", isCorrect: false },
    ],
    difficulty: "medium",
  },
  {
    id: "l2q15",
    text: "Nam đi học mất 25 phút, đi học về mất 30 phút. Một tuần Nam đi học 5 ngày: thứ Hai, thứ Ba, thứ Tư, thứ Năm và thứ Sáu. Hỏi Nam mất bao nhiêu phút để đi học và về nhà trong một tuần?",
    answers: [
      { id: "l2q15a1", text: "275 phút", isCorrect: true },
      { id: "l2q15a2", text: "265 phút", isCorrect: false },
      { id: "l2q15a3", text: "285 phút", isCorrect: false },
      { id: "l2q15a4", text: "295 phút", isCorrect: false },
    ],
    difficulty: "hard",
  },
];

export default level2Questions;
