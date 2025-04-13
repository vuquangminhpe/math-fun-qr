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
    text: "Một cửa hàng có 28 kg táo loại 1, 28 kg táo loại 2, 28 kg táo loại 3, 28 kg táo loại 4 và 28 kg táo loại 5. Đã bán được 64kg táo. Hỏi cửa hàng còn bao nhiêu kg táo?",
    answers: [
      { id: "l2q5a1", text: "76kg táo", isCorrect: true },
      { id: "l2q5a2", text: "74kg táo", isCorrect: false },
      { id: "l2q5a3", text: "78kg táo", isCorrect: false },
      { id: "l2q5a4", text: "80kg táo", isCorrect: false },
    ],
    difficulty: "medium",
  },
  {
    id: "l2q6",
    text: "Lan có 36 viên bi, Hoa có 28 viên bi. Nếu Lan cho Hoa 12 viên bi, hỏi lúc đó Hoa có nhiều hơn Lan bao nhiêu viên bi?",
    answers: [
      { id: "l2q6a1", text: "16 viên bi", isCorrect: true },
      { id: "l2q6a2", text: "14 viên bi", isCorrect: false },
      { id: "l2q6a3", text: "18 viên bi", isCorrect: false },
      { id: "l2q6a4", text: "20 viên bi", isCorrect: false },
    ],
    difficulty: "medium",
  },
  {
    id: "l2q7",
    text: "Trong một lớp học có 15 bạn nam và 17 bạn nữ. Nếu có 4 bạn nữ vắng học, hỏi lớp học có mấy bạn đi học hôm đó?",
    answers: [
      { id: "l2q7a1", text: "27 bạn", isCorrect: false },
      { id: "l2q7a2", text: "28 bạn", isCorrect: true },
      { id: "l2q7a3", text: "29 bạn", isCorrect: false },
      { id: "l2q7a4", text: "30 bạn", isCorrect: false },
    ],
    difficulty: "medium",
  },
  {
    id: "l2q8",
    text: "Một trường tiểu học có 125 học sinh lớp 1, 138 học sinh lớp 2, và 145 học sinh lớp 3. Hỏi trường có tổng cộng bao nhiêu học sinh?",
    answers: [
      { id: "l2q8a1", text: "398 học sinh", isCorrect: false },
      { id: "l2q8a2", text: "408 học sinh", isCorrect: true },
      { id: "l2q8a3", text: "418 học sinh", isCorrect: false },
      { id: "l2q8a4", text: "428 học sinh", isCorrect: false },
    ],
    difficulty: "medium",
  },
  {
    id: "l2q9",
    text: "Một cửa hàng có 132 quyển truyện tranh và 125 quyển truyện chữ. Nếu đã bán được 87 quyển truyện tranh và 95 quyển truyện chữ, hỏi cửa hàng còn lại bao nhiêu quyển truyện?",
    answers: [
      { id: "l2q9a1", text: "65 quyển truyện", isCorrect: false },
      { id: "l2q9a2", text: "75 quyển truyện", isCorrect: true },
      { id: "l2q9a3", text: "85 quyển truyện", isCorrect: false },
      { id: "l2q9a4", text: "95 quyển truyện", isCorrect: false },
    ],
    difficulty: "medium",
  },
  {
    id: "l2q10",
    text: "Minh có 125 viên bi màu xanh và 145 viên bi màu đỏ. Nam có 98 viên bi màu xanh và 122 viên bi màu đỏ. Hỏi Minh có nhiều hơn Nam bao nhiêu viên bi tất cả?",
    answers: [
      { id: "l2q10a1", text: "40 viên bi", isCorrect: false },
      { id: "l2q10a2", text: "50 viên bi", isCorrect: true },
      { id: "l2q10a3", text: "60 viên bi", isCorrect: false },
      { id: "l2q10a4", text: "70 viên bi", isCorrect: false },
    ],
    difficulty: "medium",
  },
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
    text: "Hiệp có 124 viên bi, Tuấn có 168 viên bi. Hiệp cho Tuấn 26 viên bi, sau đó Tuấn cho lại Hiệp 14 viên bi. Hỏi lúc này Tuấn có bao nhiêu viên bi?",
    answers: [
      { id: "l2q12a1", text: "180 viên bi", isCorrect: true },
      { id: "l2q12a2", text: "170 viên bi", isCorrect: false },
      { id: "l2q12a3", text: "190 viên bi", isCorrect: false },
      { id: "l2q12a4", text: "200 viên bi", isCorrect: false },
    ],
    difficulty: "medium",
  },
  {
    id: "l2q13",
    text: "Lớp 2A có 36 học sinh, lớp 2B có 34 học sinh, lớp 2C có 38 học sinh. Đến cuối năm, lớp 2A có thêm 2 học sinh mới, lớp 2B có 3 học sinh chuyển đi, lớp 2C có thêm 1 học sinh mới. Hỏi cả 3 lớp có tổng cộng bao nhiêu học sinh?",
    answers: [
      { id: "l2q13a1", text: "108 học sinh", isCorrect: true },
      { id: "l2q13a2", text: "106 học sinh", isCorrect: false },
      { id: "l2q13a3", text: "110 học sinh", isCorrect: false },
      { id: "l2q13a4", text: "112 học sinh", isCorrect: false },
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
    text: "Mẹ có 565 đồng. Mẹ mua một áo giá 175 đồng, một quần giá 138 đồng, một đôi giày giá 97 đồng và một mũ giá 86 đồng. Hỏi mẹ còn lại bao nhiêu đồng?",
    answers: [
      { id: "l2q15a1", text: "69 đồng", isCorrect: true },
      { id: "l2q15a2", text: "59 đồng", isCorrect: false },
      { id: "l2q15a3", text: "79 đồng", isCorrect: false },
      { id: "l2q15a4", text: "89 đồng", isCorrect: false },
    ],
    difficulty: "hard",
  },
  {
    id: "l2q16",
    text: "Nhà Lan cách trường học 850 mét. Lan đi được 325 mét thì gặp An, cả hai đi tiếp 175 mét thì gặp Bình. Sau đó cả ba đi tiếp 225 mét nữa thì An và Bình rẽ sang hướng khác. Hỏi Lan còn phải đi bao nhiêu mét nữa để đến trường?",
    answers: [
      { id: "l2q16a1", text: "125 mét", isCorrect: true },
      { id: "l2q16a2", text: "115 mét", isCorrect: false },
      { id: "l2q16a3", text: "135 mét", isCorrect: false },
      { id: "l2q16a4", text: "145 mét", isCorrect: false },
    ],
    difficulty: "hard",
  },
  {
    id: "l2q17",
    text: "Một cửa hàng có 624 cây bút. Cửa hàng đã bán được 278 cây trong tuần đầu tiên và 186 cây trong tuần thứ hai. Hỏi cửa hàng còn lại bao nhiêu cây bút?",
    answers: [
      { id: "l2q17a1", text: "150 cây bút", isCorrect: false },
      { id: "l2q17a2", text: "160 cây bút", isCorrect: true },
      { id: "l2q17a3", text: "170 cây bút", isCorrect: false },
      { id: "l2q17a4", text: "180 cây bút", isCorrect: false },
    ],
    difficulty: "medium",
  },
  {
    id: "l2q18",
    text: "Một trường tiểu học có 874 học sinh. Ngày khai giảng, có 456 học sinh đi xe đạp đến trường, 318 học sinh đi bộ đến trường, số còn lại đi xe buýt. Tuần sau, có 47 học sinh chuyển từ đi xe đạp sang đi bộ và 25 học sinh chuyển từ đi bộ sang đi xe buýt. Hỏi lúc này có bao nhiêu học sinh đi bộ đến trường?",
    answers: [
      { id: "l2q18a1", text: "340 học sinh", isCorrect: true },
      { id: "l2q18a2", text: "330 học sinh", isCorrect: false },
      { id: "l2q18a3", text: "350 học sinh", isCorrect: false },
      { id: "l2q18a4", text: "360 học sinh", isCorrect: false },
    ],
    difficulty: "hard",
  },
];

export default level2Questions;
