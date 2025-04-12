/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: string;
  points: number;
  category: "daily" | "accuracy" | "streak" | "completion";
  level?: number; // Tùy chọn, chỉ áp dụng cho một số category
  thresholds?: number[]; // Tùy chọn cho những thành tựu nhiều cấp độ
}

export const achievements: Achievement[] = [
  // Thành tựu hàng ngày
  {
    id: "daily_1",
    title: "Khởi động",
    description: "Hoàn thành thử thách hàng ngày đầu tiên",
    icon: "🌟",
    condition: "Hoàn thành 1 thử thách hàng ngày",
    points: 10,
    category: "daily",
  },
  {
    id: "daily_streak_3",
    title: "Học đều đặn",
    description: "Hoàn thành thử thách hàng ngày 3 ngày liên tiếp",
    icon: "🔥",
    condition: "Chuỗi 3 ngày thử thách hàng ngày",
    points: 30,
    category: "streak",
    thresholds: [3],
  },
  {
    id: "daily_streak_7",
    title: "Học sinh chăm chỉ",
    description: "Hoàn thành thử thách hàng ngày 7 ngày liên tiếp",
    icon: "🏆",
    condition: "Chuỗi 7 ngày thử thách hàng ngày",
    points: 70,
    category: "streak",
    thresholds: [7],
  },

  // Thành tựu độ chính xác
  {
    id: "level1_perfect",
    title: "Hoàn hảo cấp 1",
    description: "Đạt 100% độ chính xác trong một bài kiểm tra cấp độ 1",
    icon: "✅",
    condition: "Hoàn thành một bài kiểm tra cấp độ 1 với 100% chính xác",
    points: 20,
    category: "accuracy",
    level: 1,
    thresholds: [100],
  },
  {
    id: "level2_perfect",
    title: "Hoàn hảo cấp 2",
    description: "Đạt 100% độ chính xác trong một bài kiểm tra cấp độ 2",
    icon: "💯",
    condition: "Hoàn thành một bài kiểm tra cấp độ 2 với 100% chính xác",
    points: 30,
    category: "accuracy",
    level: 2,
    thresholds: [100],
  },
  {
    id: "level3_perfect",
    title: "Hoàn hảo cấp 3",
    description: "Đạt 100% độ chính xác trong một bài kiểm tra cấp độ 3",
    icon: "🎯",
    condition: "Hoàn thành một bài kiểm tra cấp độ 3 với 100% chính xác",
    points: 50,
    category: "accuracy",
    level: 3,
    thresholds: [100],
  },

  // Thành tựu hoàn thành
  {
    id: "quiz_count_5",
    title: "Mới bắt đầu",
    description: "Hoàn thành 5 bài kiểm tra",
    icon: "📝",
    condition: "Hoàn thành 5 bài kiểm tra bất kỳ",
    points: 15,
    category: "completion",
    thresholds: [5],
  },
  {
    id: "quiz_count_20",
    title: "Học sinh tiến bộ",
    description: "Hoàn thành 20 bài kiểm tra",
    icon: "📚",
    condition: "Hoàn thành 20 bài kiểm tra bất kỳ",
    points: 50,
    category: "completion",
    thresholds: [20],
  },
  {
    id: "quiz_count_50",
    title: "Chuyên gia toán học",
    description: "Hoàn thành 50 bài kiểm tra",
    icon: "🧠",
    condition: "Hoàn thành 50 bài kiểm tra bất kỳ",
    points: 100,
    category: "completion",
    thresholds: [50],
  },

  // Thành tựu cấp độ
  {
    id: "all_levels",
    title: "Nhà thám hiểm",
    description: "Hoàn thành ít nhất một bài kiểm tra ở mỗi cấp độ",
    icon: "🌍",
    condition: "Thử thách tất cả các cấp độ",
    points: 25,
    category: "completion",
  },
];

// Hàm kiểm tra và cấp thành tựu mới
export function checkAndUnlockAchievements(): Achievement[] {
  const unlockedAchievements: Achievement[] = [];

  // Lấy dữ liệu từ localStorage
  const savedResults = localStorage.getItem("quizResults");
  const quizResults = savedResults ? JSON.parse(savedResults) : [];

  // Đếm số lượng bài kiểm tra đã hoàn thành
  const quizCount = quizResults.length;

  // Đếm số lượng bài kiểm tra hoàn hảo theo từng cấp độ
  const level1PerfectQuiz = quizResults.some(
    (quiz: any) => quiz.level === 1 && quiz.accuracy === 100
  );

  const level2PerfectQuiz = quizResults.some(
    (quiz: any) => quiz.level === 2 && quiz.accuracy === 100
  );

  const level3PerfectQuiz = quizResults.some(
    (quiz: any) => quiz.level === 3 && quiz.accuracy === 100
  );

  // Kiểm tra đã thử tất cả các cấp độ chưa
  const triedLevels = new Set(quizResults.map((quiz: any) => quiz.level));
  const triedAllLevels = triedLevels.size === 3;

  // Lấy thông tin streak từ daily challenge
  const dailyChallengeStreak = localStorage.getItem("dailyChallengeStreak")
    ? parseInt(localStorage.getItem("dailyChallengeStreak") || "0", 10)
    : 0;

  // Lấy thông tin thành tựu đã đạt được trước đó
  const savedAchievements = localStorage.getItem("unlockedAchievements")
    ? JSON.parse(localStorage.getItem("unlockedAchievements") || "[]")
    : [];
  const unlockedIds = new Set(savedAchievements.map((a: Achievement) => a.id));

  // Kiểm tra từng thành tựu
  achievements.forEach((achievement) => {
    if (unlockedIds.has(achievement.id)) {
      return; // Đã đạt được thành tựu này
    }

    let unlocked = false;

    // Kiểm tra điều kiện dựa trên loại thành tựu
    switch (achievement.category) {
      case "daily":
        if (achievement.id === "daily_1" && dailyChallengeStreak >= 1) {
          unlocked = true;
        }
        break;

      case "streak":
        if (dailyChallengeStreak >= (achievement.thresholds?.[0] || 0)) {
          unlocked = true;
        }
        break;

      case "accuracy":
        if (achievement.level === 1 && level1PerfectQuiz) {
          unlocked = true;
        } else if (achievement.level === 2 && level2PerfectQuiz) {
          unlocked = true;
        } else if (achievement.level === 3 && level3PerfectQuiz) {
          unlocked = true;
        }
        break;

      case "completion":
        if (achievement.id === "all_levels" && triedAllLevels) {
          unlocked = true;
        } else if (
          achievement.thresholds &&
          quizCount >= achievement.thresholds[0]
        ) {
          unlocked = true;
        }
        break;
    }

    if (unlocked) {
      unlockedAchievements.push(achievement);
      unlockedIds.add(achievement.id);
    }
  });

  // Lưu thành tựu mới vào localStorage
  if (unlockedAchievements.length > 0) {
    const updatedAchievements = [...savedAchievements, ...unlockedAchievements];
    localStorage.setItem(
      "unlockedAchievements",
      JSON.stringify(updatedAchievements)
    );
  }

  return unlockedAchievements;
}

// Hàm lấy tất cả thành tựu đã mở khóa
export function getUnlockedAchievements(): Achievement[] {
  const savedAchievements = localStorage.getItem("unlockedAchievements");
  return savedAchievements ? JSON.parse(savedAchievements) : [];
}

// Hàm lấy tổng điểm thành tựu
export function getTotalAchievementPoints(): number {
  const unlockedAchievements = getUnlockedAchievements();
  return unlockedAchievements.reduce(
    (total, achievement) => total + achievement.points,
    0
  );
}
