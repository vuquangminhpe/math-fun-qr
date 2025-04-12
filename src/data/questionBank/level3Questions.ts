import { Question } from "@/types";

// Kho câu hỏi cấp độ 3 - Câu hỏi toán có lời văn nâng cao
const level3Questions: Question[] = [
  {
    id: "l3q1",
    text: "Một cửa hàng bán áo, mỗi áo có giá 20 đồng. Nếu bán 25 chiếc áo, cửa hàng thu được 500 đồng. Hỏi nếu bán 40 chiếc áo thì cửa hàng thu được bao nhiêu tiền?",
    answers: [
      { id: "l3q1a1", text: "700 đồng", isCorrect: false },
      { id: "l3q1a2", text: "800 đồng", isCorrect: true },
      { id: "l3q1a3", text: "850 đồng", isCorrect: false },
      { id: "l3q1a4", text: "900 đồng", isCorrect: false },
    ],
    difficulty: "hard",
  },
  {
    id: "l3q2",
    text: "Một người đi xe đạp từ A đến B trong 3 giờ, mỗi giờ đi được 12km. Khi về, mỗi giờ người đó đi được 15km trên cùng quãng đường. Hỏi thời gian về từ B đến A là bao nhiêu?",
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
    text: "Một khu vườn hình chữ nhật có chu vi 120m. Nếu chiều dài là 36m thì chiều rộng là 24m. Diện tích khu vườn bằng tổng của 36 ô vuông, mỗi ô có kích thước 6m × 4m. Hỏi diện tích khu vườn là bao nhiêu?",
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
    text: "Một hộp có 60 viên bi gồm bi xanh và bi đỏ. Cứ 2 viên bi đỏ thì có 4 viên bi xanh. Hỏi trong hộp có bao nhiêu viên bi đỏ?",
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
    text: "Hai xe ô tô cùng khởi hành một lúc từ hai địa điểm A và B cách nhau 160km và chạy ngược chiều nhau. Xe thứ nhất mỗi giờ đi được 60km, xe thứ hai mỗi giờ đi được 40km. Mỗi giờ khoảng cách giữa hai xe giảm đi 100km. Hỏi sau bao nhiêu giờ thì hai xe gặp nhau?",
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
    text: "Một cửa hàng buổi sáng bán được 36 kg gạo, mỗi kg giá 15 đồng. Buổi chiều bán được 42 kg gạo, mỗi kg giá 18 đồng. Hỏi cả ngày cửa hàng thu được bao nhiêu tiền?",
    answers: [
      { id: "l3q6a1", text: "1.296 đồng", isCorrect: true },
      { id: "l3q6a2", text: "1.260 đồng", isCorrect: false },
      { id: "l3q6a3", text: "1.300 đồng", isCorrect: false },
      { id: "l3q6a4", text: "1.350 đồng", isCorrect: false },
    ],
    difficulty: "hard",
  },
  {
    id: "l3q7",
    text: "Một hình chữ nhật có chiều dài 24cm và chiều rộng 18cm. Đường chéo của hình chữ nhật là 30cm. Hỏi độ dài đường chéo của hình chữ nhật đó là bao nhiêu cm?",
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
    text: "Bố hiện nay 30 tuổi, con hiện nay 10 tuổi. Sau 10 năm, bố 40 tuổi và con 20 tuổi. Hỏi hiện nay bố bao nhiêu tuổi?",
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
    text: "Một xe bồn chứa đầy nước. Mỗi ngày, 15 hộ gia đình dùng hết 1/8 lượng nước trong xe bồn. Nếu chỉ có 10 hộ gia đình sử dụng thì mỗi ngày họ dùng hết 1/12 lượng nước. Hỏi xe bồn đó có thể cung cấp nước cho 10 hộ gia đình trong bao nhiêu ngày?",
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
    text: "Một người đi bộ với tốc độ mỗi giờ được 4km. Nếu tăng tốc độ lên để mỗi giờ đi được 6km, thì quãng đường 10km sẽ đi hết trong bao nhiêu giờ?",
    answers: [
      { id: "l3q10a1", text: "1,5 giờ", isCorrect: false },
      { id: "l3q10a2", text: "1,6 giờ", isCorrect: false },
      { id: "l3q10a3", text: "1,7 giờ", isCorrect: true },
      { id: "l3q10a4", text: "1,8 giờ", isCorrect: false },
    ],
    difficulty: "hard",
  },
  // Thêm câu hỏi mới
  {
    id: "l3q11",
    text: "Một hỗn hợp có tổng cộng 8 phần, trong đó có 3 phần dầu và 5 phần nước. Nếu mỗi phần tương ứng với 30ml và có tổng cộng 240ml hỗn hợp, hỏi có bao nhiêu ml dầu trong hỗn hợp?",
    answers: [
      { id: "l3q11a1", text: "90ml dầu", isCorrect: true },
      { id: "l3q11a2", text: "80ml dầu", isCorrect: false },
      { id: "l3q11a3", text: "100ml dầu", isCorrect: false },
      { id: "l3q11a4", text: "110ml dầu", isCorrect: false },
    ],
    difficulty: "hard",
  },
  {
    id: "l3q12",
    text: "Một người đi xe đạp trong 2 giờ, mỗi giờ đi được 15km. Sau đó người đó đi bộ thêm 1 giờ nữa, mỗi giờ đi được 5km. Hỏi tổng quãng đường người đó đã đi là bao nhiêu km?",
    answers: [
      { id: "l3q12a1", text: "35km", isCorrect: true },
      { id: "l3q12a2", text: "30km", isCorrect: false },
      { id: "l3q12a3", text: "40km", isCorrect: false },
      { id: "l3q12a4", text: "45km", isCorrect: false },
    ],
    difficulty: "hard",
  },
  {
    id: "l3q13",
    text: "Một hình tam giác có diện tích 84cm². Đáy của tam giác là 14cm và chiều cao là 12cm. Diện tích tam giác bằng 84cm². Hỏi độ dài của đáy tam giác là bao nhiêu cm?",
    answers: [
      { id: "l3q13a1", text: "14cm", isCorrect: true },
      { id: "l3q13a2", text: "12cm", isCorrect: false },
      { id: "l3q13a3", text: "16cm", isCorrect: false },
      { id: "l3q13a4", text: "18cm", isCorrect: false },
    ],
    difficulty: "hard",
  },
  {
    id: "l3q14",
    text: "Một cửa hàng nhập về 120 áo với giá 60 đồng mỗi áo (tổng chi phí 7200 đồng). Cửa hàng bán được 90 áo (75% tổng số) với giá 95 đồng mỗi áo (thu về 8550 đồng). Hỏi cửa hàng lãi bao nhiêu đồng?",
    answers: [
      { id: "l3q14a1", text: "2.550 đồng", isCorrect: false },
      { id: "l3q14a2", text: "2.650 đồng", isCorrect: false },
      { id: "l3q14a3", text: "2.700 đồng", isCorrect: true },
      { id: "l3q14a4", text: "2.800 đồng", isCorrect: false },
    ],
    difficulty: "hard",
  },
  {
    id: "l3q15",
    text: "Mẹ hiện nay 20 tuổi và con hiện nay 5 tuổi. Sau 5 năm, mẹ 25 tuổi và con 10 tuổi. Hỏi hiện nay con bao nhiêu tuổi?",
    answers: [
      { id: "l3q15a1", text: "5 tuổi", isCorrect: true },
      { id: "l3q15a2", text: "6 tuổi", isCorrect: false },
      { id: "l3q15a3", text: "7 tuổi", isCorrect: false },
      { id: "l3q15a4", text: "8 tuổi", isCorrect: false },
    ],
    difficulty: "hard",
  },
  {
    id: "l3q16",
    text: "Một cửa hàng bán bánh có 360 cái bánh. Họ bán được 75% số bánh trong ngày đầu tiên và 40% số bánh còn lại trong ngày thứ hai. Hỏi sau hai ngày, cửa hàng còn lại bao nhiêu cái bánh?",
    answers: [
      { id: "l3q16a1", text: "54 cái bánh", isCorrect: true },
      { id: "l3q16a2", text: "60 cái bánh", isCorrect: false },
      { id: "l3q16a3", text: "72 cái bánh", isCorrect: false },
      { id: "l3q16a4", text: "90 cái bánh", isCorrect: false },
    ],
    difficulty: "hard",
  },
  {
    id: "l3q17",
    text: "Hai xe ô tô khởi hành cùng lúc từ hai địa điểm A và B cách nhau 240km và chạy hướng về nhau. Xe thứ nhất chạy với vận tốc 65km/h và xe thứ hai chạy với vận tốc 55km/h. Hỏi sau bao lâu thì hai xe gặp nhau?",
    answers: [
      { id: "l3q17a1", text: "1,8 giờ", isCorrect: false },
      { id: "l3q17a2", text: "1,9 giờ", isCorrect: false },
      { id: "l3q17a3", text: "2 giờ", isCorrect: true },
      { id: "l3q17a4", text: "2,1 giờ", isCorrect: false },
    ],
    difficulty: "hard",
  },
  {
    id: "l3q18",
    text: "Một trường học có 840 học sinh. Tỷ lệ học sinh nam và học sinh nữ là 4:3. Hỏi trường học có bao nhiêu học sinh nam và bao nhiêu học sinh nữ?",
    answers: [
      { id: "l3q18a1", text: "480 nam và 360 nữ", isCorrect: true },
      { id: "l3q18a2", text: "360 nam và 480 nữ", isCorrect: false },
      { id: "l3q18a3", text: "420 nam và 420 nữ", isCorrect: false },
      { id: "l3q18a4", text: "490 nam và 350 nữ", isCorrect: false },
    ],
    difficulty: "hard",
  },
  {
    id: "l3q19",
    text: "Một hình chữ nhật có chu vi 60m và diện tích 216m². Hỏi hình chữ nhật đó có chiều dài và chiều rộng là bao nhiêu mét?",
    answers: [
      { id: "l3q19a1", text: "24m và 9m", isCorrect: true },
      { id: "l3q19a2", text: "18m và 12m", isCorrect: false },
      { id: "l3q19a3", text: "27m và 8m", isCorrect: false },
      { id: "l3q19a4", text: "20m và 10m", isCorrect: false },
    ],
    difficulty: "hard",
  },
  {
    id: "l3q20",
    text: "Một người gửi tiết kiệm 5.000 đồng với lãi suất 6% một năm. Sau 3 năm không rút tiền và lãi, tổng số tiền người đó nhận được là bao nhiêu? (Công thức: Tổng = Gốc × (1 + Lãi suất)^n, với n là số năm)",
    answers: [
      { id: "l3q20a1", text: "5.900 đồng", isCorrect: false },
      { id: "l3q20a2", text: "5.954,5 đồng", isCorrect: false },
      { id: "l3q20a3", text: "5.973,64 đồng", isCorrect: true },
      { id: "l3q20a4", text: "6.000 đồng", isCorrect: false },
    ],
    difficulty: "hard",
  },
];

export default level3Questions;
