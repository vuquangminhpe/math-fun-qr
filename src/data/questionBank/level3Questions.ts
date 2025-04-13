import { Question } from "@/types";

// Kho câu hỏi cấp độ 3 - Câu hỏi toán có lời văn nâng cao cho lớp 2
const level3Questions: Question[] = [
  {
    id: "l3q1",
    text: "Lan có 125 viên bi, Hoa có 165 viên bi. Nếu Lan cho Hoa 45 viên bi, sau đó Hoa cho Lan 25 viên bi. Hỏi cuối cùng Hoa nhiều hơn Lan bao nhiêu viên bi?",
    answers: [
      { id: "l3q1a1", text: "80 viên bi", isCorrect: false },
      { id: "l3q1a2", text: "90 viên bi", isCorrect: true },
      { id: "l3q1a3", text: "100 viên bi", isCorrect: false },
      { id: "l3q1a4", text: "110 viên bi", isCorrect: false },
    ],
    difficulty: "hard",
  },
  {
    id: "l3q2",
    text: "Một cửa hàng có 350 quyển vở. Tuần đầu tiên, cửa hàng bán được 125 quyển. Tuần thứ hai, cửa hàng nhập thêm 85 quyển và bán được 135 quyển. Tuần thứ ba, cửa hàng nhập thêm 75 quyển và bán được 110 quyển. Hỏi cửa hàng còn lại bao nhiêu quyển vở?",
    answers: [
      { id: "l3q2a1", text: "140 quyển vở", isCorrect: true },
      { id: "l3q2a2", text: "130 quyển vở", isCorrect: false },
      { id: "l3q2a3", text: "150 quyển vở", isCorrect: false },
      { id: "l3q2a4", text: "160 quyển vở", isCorrect: false },
    ],
    difficulty: "hard",
  },
  {
    id: "l3q3",
    text: "Một khu vườn hình chữ nhật có chiều dài 36m và chiều rộng 24m. Người ta đặt các ô vuông kích thước 1m × 1m dọc theo chu vi khu vườn. Sau đó trồng 5 cây hoa trong mỗi ô vuông. Hỏi tổng cộng có bao nhiêu cây hoa được trồng?",
    answers: [
      { id: "l3q3a1", text: "580 cây hoa", isCorrect: false },
      { id: "l3q3a2", text: "600 cây hoa", isCorrect: true },
      { id: "l3q3a3", text: "620 cây hoa", isCorrect: false },
      { id: "l3q3a4", text: "640 cây hoa", isCorrect: false },
    ],
    difficulty: "hard",
  },
  {
    id: "l3q4",
    text: "Lớp 2A có 42 học sinh, lớp 2B có 38 học sinh. Đầu năm, có 5 học sinh chuyển từ lớp 2A sang lớp 2B. Giữa năm, có 3 học sinh chuyển từ lớp 2B sang lớp 2A và 4 học sinh mới vào lớp 2A. Cuối năm, có 2 học sinh chuyển từ lớp 2A sang lớp 2B và 6 học sinh mới vào lớp 2B. Hỏi cuối năm lớp 2B có bao nhiêu học sinh?",
    answers: [
      { id: "l3q4a1", text: "49 học sinh", isCorrect: true },
      { id: "l3q4a2", text: "47 học sinh", isCorrect: false },
      { id: "l3q4a3", text: "51 học sinh", isCorrect: false },
      { id: "l3q4a4", text: "53 học sinh", isCorrect: false },
    ],
    difficulty: "hard",
  },
  {
    id: "l3q5",
    text: "Một đoàn tàu có 365 hành khách. Ở ga đầu tiên có 75 người xuống và 25 người lên. Ở ga thứ hai có 85 người xuống và 45 người lên. Ở ga thứ ba có 55 người xuống và 65 người lên. Ở ga thứ tư có 45 người xuống và 35 người lên. Hỏi khi đến ga thứ năm, trên tàu còn bao nhiêu hành khách?",
    answers: [
      { id: "l3q5a1", text: "275 hành khách", isCorrect: true },
      { id: "l3q5a2", text: "265 hành khách", isCorrect: false },
      { id: "l3q5a3", text: "285 hành khách", isCorrect: false },
      { id: "l3q5a4", text: "295 hành khách", isCorrect: false },
    ],
    difficulty: "hard",
  },
  {
    id: "l3q6",
    text: "Một cửa hàng buổi sáng nhập về 125 quyển sách loại 1, 85 quyển sách loại 2 và 95 quyển sách loại 3. Đến trưa bán được 75 quyển sách loại 1, 45 quyển sách loại 2 và 55 quyển sách loại 3. Buổi chiều nhập thêm 45 quyển sách loại 1, 55 quyển sách loại 2 và 35 quyển sách loại 3. Buổi tối bán được 35 quyển sách loại 1, 25 quyển sách loại 2 và 15 quyển sách loại 3. Hỏi cuối ngày cửa hàng còn lại bao nhiêu quyển sách?",
    answers: [
      { id: "l3q6a1", text: "190 quyển sách", isCorrect: true },
      { id: "l3q6a2", text: "180 quyển sách", isCorrect: false },
      { id: "l3q6a3", text: "200 quyển sách", isCorrect: false },
      { id: "l3q6a4", text: "210 quyển sách", isCorrect: false },
    ],
    difficulty: "hard",
  },
  {
    id: "l3q7",
    text: "An có 245 đồng, Bình có 185 đồng, Chung có 215 đồng. An cho Bình 35 đồng và cho Chung 45 đồng. Sau đó Bình cho An 15 đồng và cho Chung 25 đồng. Tiếp theo Chung cho An 20 đồng và cho Bình 30 đồng. Hỏi cuối cùng Bình có bao nhiêu đồng?",
    answers: [
      { id: "l3q7a1", text: "190 đồng", isCorrect: true },
      { id: "l3q7a2", text: "180 đồng", isCorrect: false },
      { id: "l3q7a3", text: "200 đồng", isCorrect: false },
      { id: "l3q7a4", text: "210 đồng", isCorrect: false },
    ],
    difficulty: "hard",
  },
  {
    id: "l3q8",
    text: "Bố 38 tuổi, mẹ 36 tuổi, anh 12 tuổi, em 6 tuổi. Cách đây 3 năm, tổng số tuổi của cả gia đình là bao nhiêu? Sau 5 năm nữa, tổng số tuổi của cả gia đình sẽ là bao nhiêu?",
    answers: [
      { id: "l3q8a1", text: "77 tuổi và 117 tuổi", isCorrect: true },
      { id: "l3q8a2", text: "80 tuổi và 120 tuổi", isCorrect: false },
      { id: "l3q8a3", text: "75 tuổi và 110 tuổi", isCorrect: false },
      { id: "l3q8a4", text: "85 tuổi và 125 tuổi", isCorrect: false },
    ],
    difficulty: "hard",
  },
  {
    id: "l3q9",
    text: "Một thùng sữa có 120 hộp, chia đều cho 8 cửa hàng. Ba cửa hàng đầu tiên mỗi cửa hàng bán được 13 hộp, hai cửa hàng tiếp theo mỗi cửa hàng bán được 12 hộp, và ba cửa hàng cuối mỗi cửa hàng bán được 11 hộp. Hỏi tổng số hộp sữa đã bán được là bao nhiêu và còn lại bao nhiêu hộp chưa bán?",
    answers: [
      { id: "l3q9a1", text: "Bán 96 hộp, còn 24 hộp", isCorrect: true },
      { id: "l3q9a2", text: "Bán 94 hộp, còn 26 hộp", isCorrect: false },
      { id: "l3q9a3", text: "Bán 98 hộp, còn 22 hộp", isCorrect: false },
      { id: "l3q9a4", text: "Bán 100 hộp, còn 20 hộp", isCorrect: false },
    ],
    difficulty: "hard",
  },
  {
    id: "l3q10",
    text: "Một cửa hàng có 285 kg gạo loại A, 165 kg gạo loại B và 225 kg gạo loại C. Ngày thứ nhất bán được 95 kg gạo loại A, 45 kg gạo loại B và 75 kg gạo loại C. Ngày thứ hai bán được 75 kg gạo loại A, 55 kg gạo loại B và 65 kg gạo loại C. Ngày thứ ba bán được 65 kg gạo loại A, 35 kg gạo loại B và 45 kg gạo loại C. Hỏi cửa hàng còn lại bao nhiêu kg gạo tất cả các loại?",
    answers: [
      { id: "l3q10a1", text: "185 kg gạo", isCorrect: false },
      { id: "l3q10a2", text: "195 kg gạo", isCorrect: false },
      { id: "l3q10a3", text: "205 kg gạo", isCorrect: true },
      { id: "l3q10a4", text: "215 kg gạo", isCorrect: false },
    ],
    difficulty: "hard",
  },
  {
    id: "l3q11",
    text: "Minh có 238 viên bi, Nam có 192 viên bi, Hùng có 246 viên bi. Minh cho Nam 46 viên bi, sau đó Nam cho Hùng 28 viên bi. Tiếp theo Hùng cho Minh 54 viên bi và cho Nam 36 viên bi. Hỏi cuối cùng ai có nhiều viên bi nhất và hơn người có ít viên bi nhất là bao nhiêu viên?",
    answers: [
      { id: "l3q11a1", text: "Nam nhiều nhất, hơn 56 viên", isCorrect: true },
      { id: "l3q11a2", text: "Minh nhiều nhất, hơn 62 viên", isCorrect: false },
      { id: "l3q11a3", text: "Hùng nhiều nhất, hơn 48 viên", isCorrect: false },
      { id: "l3q11a4", text: "Nam nhiều nhất, hơn 68 viên", isCorrect: false },
    ],
    difficulty: "hard",
  },
  {
    id: "l3q12",
    text: "Một đoạn đường dài 325 mét chia làm 5 chặng. Chặng 1 dài 65 mét, chặng 2 dài hơn chặng 1 là 15 mét, chặng 3 dài bằng chặng 1, chặng 4 dài ít hơn chặng 2 là 20 mét, chặng 5 dài hơn chặng 3 là 10 mét. Hỏi chặng 4 dài bao nhiêu mét?",
    answers: [
      { id: "l3q12a1", text: "60 mét", isCorrect: true },
      { id: "l3q12a2", text: "55 mét", isCorrect: false },
      { id: "l3q12a3", text: "65 mét", isCorrect: false },
      { id: "l3q12a4", text: "70 mét", isCorrect: false },
    ],
    difficulty: "hard",
  },
  {
    id: "l3q13",
    text: "Một phòng học có 45 chỗ ngồi xếp thành 9 hàng, mỗi hàng 5 chỗ. Có 28 học sinh nam và 12 học sinh nữ vào học. Cô giáo xếp học sinh nam ngồi ở 6 hàng đầu và học sinh nữ ngồi ở các hàng còn lại. Hỏi ở 6 hàng đầu có bao nhiêu chỗ ngồi trống và 3 hàng sau có bao nhiêu chỗ ngồi trống?",
    answers: [
      {
        id: "l3q13a1",
        text: "2 chỗ trống ở 6 hàng đầu, 3 chỗ trống ở 3 hàng sau",
        isCorrect: true,
      },
      {
        id: "l3q13a2",
        text: "3 chỗ trống ở 6 hàng đầu, 2 chỗ trống ở 3 hàng sau",
        isCorrect: false,
      },
      {
        id: "l3q13a3",
        text: "1 chỗ trống ở 6 hàng đầu, 4 chỗ trống ở 3 hàng sau",
        isCorrect: false,
      },
      {
        id: "l3q13a4",
        text: "4 chỗ trống ở 6 hàng đầu, 1 chỗ trống ở 3 hàng sau",
        isCorrect: false,
      },
    ],
    difficulty: "hard",
  },
  {
    id: "l3q14",
    text: "Một khu vườn trồng được 125 cây ăn quả, 165 cây cảnh và 75 cây hoa. Sau một trận bão, có 35 cây ăn quả, 55 cây cảnh và 25 cây hoa bị gãy đổ. Chủ vườn trồng thêm 45 cây ăn quả, 35 cây cảnh và 55 cây hoa. Hỏi khu vườn có tổng cộng bao nhiêu cây sau khi trồng thêm?",
    answers: [
      { id: "l3q14a1", text: "385 cây", isCorrect: true },
      { id: "l3q14a2", text: "375 cây", isCorrect: false },
      { id: "l3q14a3", text: "395 cây", isCorrect: false },
      { id: "l3q14a4", text: "405 cây", isCorrect: false },
    ],
    difficulty: "hard",
  },
  {
    id: "l3q15",
    text: "Một trang trại nuôi 213 con gà, 187 con vịt và 145 con ngan. Chủ trang trại đã bán 98 con gà, 76 con vịt và 85 con ngan. Sau đó, trang trại mua thêm 56 con gà, 48 con vịt và 52 con ngan. Hỏi trang trại có tổng cộng bao nhiêu con gia cầm sau đó?",
    answers: [
      { id: "l3q15a1", text: "442 con", isCorrect: true },
      { id: "l3q15a2", text: "432 con", isCorrect: false },
      { id: "l3q15a3", text: "452 con", isCorrect: false },
      { id: "l3q15a4", text: "462 con", isCorrect: false },
    ],
    difficulty: "hard",
  },
  {
    id: "l3q16",
    text: "Một cửa hàng có 360 quyển sách chia thành 3 loại: loại A, loại B và loại C. Số sách loại A nhiều hơn số sách loại B là 24 quyển. Số sách loại C nhiều hơn số sách loại A là 36 quyển. Ngày thứ nhất bán được 25 quyển loại A, 35 quyển loại B và 45 quyển loại C. Ngày thứ hai bán được 35 quyển loại A, 25 quyển loại B và 30 quyển loại C. Hỏi cửa hàng còn lại bao nhiêu quyển sách loại B?",
    answers: [
      { id: "l3q16a1", text: "40 quyển sách", isCorrect: true },
      { id: "l3q16a2", text: "35 quyển sách", isCorrect: false },
      { id: "l3q16a3", text: "45 quyển sách", isCorrect: false },
      { id: "l3q16a4", text: "50 quyển sách", isCorrect: false },
    ],
    difficulty: "hard",
  },
  {
    id: "l3q17",
    text: "Một cửa hàng bán áo, ngày đầu tiên bán được 145 chiếc áo. Ngày thứ hai bán được ít hơn ngày đầu 38 chiếc. Ngày thứ ba bán được nhiều hơn ngày thứ hai 25 chiếc. Ngày thứ tư bán được gấp đôi số áo của ngày thứ ba trừ đi 15 chiếc. Hỏi ngày thứ tư bán được bao nhiêu chiếc áo?",
    answers: [
      { id: "l3q17a1", text: "249 chiếc áo", isCorrect: true },
      { id: "l3q17a2", text: "239 chiếc áo", isCorrect: false },
      { id: "l3q17a3", text: "259 chiếc áo", isCorrect: false },
      { id: "l3q17a4", text: "269 chiếc áo", isCorrect: false },
    ],
    difficulty: "hard",
  },
  {
    id: "l3q18",
    text: "Một trường học có 840 học sinh. Số học sinh lớp 1 có 280 em, lớp 2 có 295 em, lớp 3 có 265 em. Đầu năm học mới, lớp 1 có 35 em chuyển trường đi, lớp 2 có 28 em chuyển đi và 42 em chuyển đến, lớp 3 có 37 em chuyển đi và 25 em chuyển đến. Ngoài ra, có 125 học sinh mới vào lớp 1. Hỏi trường học có tổng cộng bao nhiêu học sinh sau những thay đổi này?",
    answers: [
      { id: "l3q18a1", text: "932 học sinh", isCorrect: true },
      { id: "l3q18a2", text: "922 học sinh", isCorrect: false },
      { id: "l3q18a3", text: "942 học sinh", isCorrect: false },
      { id: "l3q18a4", text: "952 học sinh", isCorrect: false },
    ],
    difficulty: "hard",
  },
  {
    id: "l3q19",
    text: "Một cửa hàng có 685 quyển truyện tranh chia thành 3 loại: loại 1, loại 2 và loại 3. Số truyện loại 1 nhiều hơn số truyện loại 2 là 35 quyển. Số truyện loại 3 ít hơn số truyện loại 1 là 65 quyển. Tuần đầu tiên bán được 45 quyển loại 1, 35 quyển loại 2 và 25 quyển loại 3. Tuần thứ hai bán được 55 quyển loại 1, 45 quyển loại 2 và 35 quyển loại 3. Tuần thứ ba bán được 65 quyển loại 1, 55 quyển loại 2 và 45 quyển loại 3. Hỏi cửa hàng còn lại bao nhiêu quyển truyện loại 2?",
    answers: [
      { id: "l3q19a1", text: "60 quyển", isCorrect: true },
      { id: "l3q19a2", text: "55 quyển", isCorrect: false },
      { id: "l3q19a3", text: "65 quyển", isCorrect: false },
      { id: "l3q19a4", text: "70 quyển", isCorrect: false },
    ],
    difficulty: "hard",
  },
  {
    id: "l3q20",
    text: "Một thư viện có 3 kệ sách. Kệ thứ nhất có 165 quyển, kệ thứ hai có 145 quyển, kệ thứ ba có 195 quyển. Sau khi chuyển 25 quyển từ kệ thứ ba sang kệ thứ nhất và 15 quyển từ kệ thứ hai sang kệ thứ ba, thư viện nhận thêm 85 quyển sách mới và chia đều cho cả 3 kệ. Hỏi kệ nào có nhiều sách nhất và kệ đó có bao nhiêu quyển?",
    answers: [
      { id: "l3q20a1", text: "Kệ thứ nhất, 219 quyển", isCorrect: true },
      { id: "l3q20a2", text: "Kệ thứ ba, 209 quyển", isCorrect: false },
      { id: "l3q20a3", text: "Kệ thứ nhất, 209 quyển", isCorrect: false },
      { id: "l3q20a4", text: "Kệ thứ ba, 219 quyển", isCorrect: false },
    ],
    difficulty: "hard",
  },

  {
    id: "l3q21",
    text: "Một cửa hàng có 685 quyển truyện tranh. Tuần đầu tiên bán được 215 quyển, tuần thứ hai bán được 175 quyển, tuần thứ ba bán được 195 quyển. Hỏi cửa hàng còn lại bao nhiêu quyển truyện tranh?",
    answers: [
      { id: "l3q21a1", text: "100 quyển", isCorrect: true },
      { id: "l3q21a2", text: "90 quyển", isCorrect: false },
      { id: "l3q21a3", text: "110 quyển", isCorrect: false },
      { id: "l3q21a4", text: "120 quyển", isCorrect: false },
    ],
    difficulty: "hard",
  },
  {
    id: "l3q20",
    text: "Một thư viện có 3 kệ sách. Kệ thứ nhất có 165 quyển, kệ thứ hai có 145 quyển, kệ thứ ba có 195 quyển. Sau khi chuyển 25 quyển từ kệ thứ ba sang kệ thứ nhất và 15 quyển từ kệ thứ hai sang kệ thứ ba, hỏi kệ nào có nhiều sách nhất và có bao nhiêu quyển?",
    answers: [
      { id: "l3q20a1", text: "Kệ thứ nhất, 190 quyển", isCorrect: true },
      { id: "l3q20a2", text: "Kệ thứ ba, 185 quyển", isCorrect: false },
      { id: "l3q20a3", text: "Kệ thứ nhất, 185 quyển", isCorrect: false },
      { id: "l3q20a4", text: "Kệ thứ ba, 190 quyển", isCorrect: false },
    ],
    difficulty: "hard",
  },
];

export default level3Questions;
