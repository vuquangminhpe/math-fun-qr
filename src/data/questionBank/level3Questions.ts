import { Question } from "@/types";

// Kho câu hỏi cấp độ 3 - Câu hỏi toán có lời văn nâng cao
const level3Questions: Question[] = [
  {
    id: "l3q1",
    text: "Một cửa hàng bán 25 chiếc áo, thu được 2.000.000 đồng. Hỏi nếu bán 40 chiếc áo như vậy thì cửa hàng thu được bao nhiêu tiền?",
    answers: [
      { id: "l3q1a1", text: "3.000.000 đồng", isCorrect: false },
      { id: "l3q1a2", text: "3.200.000 đồng", isCorrect: true },
      { id: "l3q1a3", text: "3.500.000 đồng", isCorrect: false },
      { id: "l3q1a4", text: "3.800.000 đồng", isCorrect: false },
    ],
    difficulty: "hard",
  },
  {
    id: "l3q2",
    text: "Một người đi xe đạp từ A đến B với vận tốc 12km/h, đi hết 3 giờ. Khi về, người đó đi với vận tốc 15km/h. Hỏi thời gian về từ B đến A là bao nhiêu?",
    answers: [
      { id: "l3q2a1", text: "2,4 giờ", isCorrect: true },
      { id: "l3q2a2", text: "2,2 giờ", isCorrect: false },
      { id: "l3q2a3", text: "2,5 giờ", isCorrect: false },
      { id: "l3q2a4", text: "2,8 giờ", isCorrect: false },
    ],
    difficulty: "hard",
  },
  {
    id: "l3q3",
    text: "Một khu vườn hình chữ nhật có chu vi 120m, chiều rộng bằng 2/3 chiều dài. Tính diện tích khu vườn.",
    answers: [
      { id: "l3q3a1", text: "800m²", isCorrect: false },
      { id: "l3q3a2", text: "864m²", isCorrect: true },
      { id: "l3q3a3", text: "900m²", isCorrect: false },
      { id: "l3q3a4", text: "950m²", isCorrect: false },
    ],
    difficulty: "hard",
  },
  {
    id: "l3q4",
    text: "Một hộp có 60 viên bi gồm bi xanh và bi đỏ. Số bi xanh gấp 2 lần số bi đỏ. Hỏi trong hộp có bao nhiêu viên bi đỏ?",
    answers: [
      { id: "l3q4a1", text: "20 viên bi đỏ", isCorrect: true },
      { id: "l3q4a2", text: "15 viên bi đỏ", isCorrect: false },
      { id: "l3q4a3", text: "25 viên bi đỏ", isCorrect: false },
      { id: "l3q4a4", text: "30 viên bi đỏ", isCorrect: false },
    ],
    difficulty: "hard",
  },
  {
    id: "l3q5",
    text: "Hai xe ô tô cùng khởi hành một lúc từ hai địa điểm A và B cách nhau 160km và chạy ngược chiều nhau. Vận tốc của xe thứ nhất là 60km/h, của xe thứ hai là 40km/h. Hỏi sau bao nhiêu giờ thì hai xe gặp nhau?",
    answers: [
      { id: "l3q5a1", text: "1,5 giờ", isCorrect: true },
      { id: "l3q5a2", text: "1,6 giờ", isCorrect: false },
      { id: "l3q5a3", text: "1,7 giờ", isCorrect: false },
      { id: "l3q5a4", text: "1,8 giờ", isCorrect: false },
    ],
    difficulty: "hard",
  },
  {
    id: "l3q6",
    text: "Một cửa hàng buổi sáng bán được 36 kg gạo, buổi chiều bán được 42 kg gạo. Giá gạo buổi sáng là 15.000 đồng/kg, buổi chiều tăng lên 18.000 đồng/kg. Hỏi cả ngày cửa hàng thu được bao nhiêu tiền?",
    answers: [
      { id: "l3q6a1", text: "1.296.000 đồng", isCorrect: true },
      { id: "l3q6a2", text: "1.260.000 đồng", isCorrect: false },
      { id: "l3q6a3", text: "1.300.000 đồng", isCorrect: false },
      { id: "l3q6a4", text: "1.350.000 đồng", isCorrect: false },
    ],
    difficulty: "hard",
  },
  {
    id: "l3q7",
    text: "Một hình chữ nhật có chiều dài 24cm và chiều rộng 18cm. Tính độ dài đường chéo của hình chữ nhật đó.",
    answers: [
      { id: "l3q7a1", text: "28cm", isCorrect: false },
      { id: "l3q7a2", text: "30cm", isCorrect: true },
      { id: "l3q7a3", text: "32cm", isCorrect: false },
      { id: "l3q7a4", text: "36cm", isCorrect: false },
    ],
    difficulty: "hard",
  },
  {
    id: "l3q8",
    text: "Tuổi của bố hiện nay gấp 3 lần tuổi của con. Sau 10 năm, tuổi của bố sẽ gấp 2 lần tuổi của con. Hỏi hiện nay bố bao nhiêu tuổi?",
    answers: [
      { id: "l3q8a1", text: "30 tuổi", isCorrect: true },
      { id: "l3q8a2", text: "33 tuổi", isCorrect: false },
      { id: "l3q8a3", text: "36 tuổi", isCorrect: false },
      { id: "l3q8a4", text: "40 tuổi", isCorrect: false },
    ],
    difficulty: "hard",
  },
  {
    id: "l3q9",
    text: "Một xe bồn chứa đầy nước, có thể cung cấp nước cho 15 hộ gia đình trong 8 ngày. Hỏi xe bồn đó có thể cung cấp nước cho 10 hộ gia đình trong bao nhiêu ngày?",
    answers: [
      { id: "l3q9a1", text: "10 ngày", isCorrect: false },
      { id: "l3q9a2", text: "12 ngày", isCorrect: true },
      { id: "l3q9a3", text: "14 ngày", isCorrect: false },
      { id: "l3q9a4", text: "16 ngày", isCorrect: false },
    ],
    difficulty: "hard",
  },
  {
    id: "l3q10",
    text: "Một người đi bộ 4km trong 1 giờ. Nếu tăng vận tốc thêm 2km/h thì quãng đường 10km sẽ đi hết trong bao nhiêu giờ?",
    answers: [
      { id: "l3q10a1", text: "1,5 giờ", isCorrect: false },
      { id: "l3q10a2", text: "1,6 giờ", isCorrect: false },
      { id: "l3q10a3", text: "1,7 giờ", isCorrect: true },
      { id: "l3q10a4", text: "1,8 giờ", isCorrect: false },
    ],
    difficulty: "hard",
  },
];

export default level3Questions;
