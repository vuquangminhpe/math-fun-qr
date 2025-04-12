import React, { useState, useEffect } from "react";
import {
  Achievement,
  getUnlockedAchievements,
  getTotalAchievementPoints,
  achievements,
} from "@/data/achievementsData";
import "../styles/Achievements.css";

interface AchievementsViewProps {
  showNewOnly?: boolean;
  onClose?: () => void;
}

const AchievementsView: React.FC<AchievementsViewProps> = ({
  showNewOnly = false,
  onClose,
}) => {
  const [unlockedAchievements, setUnlockedAchievements] = useState<
    Achievement[]
  >([]);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [filter, setFilter] = useState<string>("all");
  const [newlyUnlocked, setNewlyUnlocked] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Lấy thành tựu đã mở khóa
    const unlocked = getUnlockedAchievements();
    setUnlockedAchievements(unlocked);
    setTotalPoints(getTotalAchievementPoints());

    // Kiểm tra xem có thành tựu mới không
    const newlyUnlockedIds = localStorage.getItem("newlyUnlockedAchievements");
    if (newlyUnlockedIds) {
      setNewlyUnlocked(new Set(JSON.parse(newlyUnlockedIds)));
    }

    // Xóa thông tin thành tựu mới sau khi đã hiển thị
    if (!showNewOnly) {
      localStorage.removeItem("newlyUnlockedAchievements");
    }
  }, [showNewOnly]);

  // Lọc thành tựu theo danh mục
  const getFilteredAchievements = () => {
    let achievementsToShow = showNewOnly
      ? unlockedAchievements.filter((a) => newlyUnlocked.has(a.id))
      : unlockedAchievements;

    if (filter !== "all") {
      achievementsToShow = achievementsToShow.filter(
        (a) => a.category === filter
      );
    }

    return achievementsToShow;
  };

  // Lấy tiến trình của thành tựu
  const getAchievementProgress = (achievementId: string): number => {
    // Đã mở khóa
    if (unlockedAchievements.some((a) => a.id === achievementId)) {
      return 100;
    }

    const achievement = achievements.find((a) => a.id === achievementId);
    if (!achievement) return 0;

    // Tính toán tiến trình dựa vào loại thành tựu
    switch (achievement.category) {
      case "completion": {
        if (achievement.thresholds) {
          const savedResults = localStorage.getItem("quizResults");
          const quizResults = savedResults ? JSON.parse(savedResults) : [];
          const quizCount = quizResults.length;
          return Math.min(
            100,
            Math.floor((quizCount / achievement.thresholds[0]) * 100)
          );
        }
        return 0;
      }
      case "streak": {
        if (achievement.thresholds) {
          const streak = localStorage.getItem("dailyChallengeStreak")
            ? parseInt(localStorage.getItem("dailyChallengeStreak") || "0", 10)
            : 0;
          return Math.min(
            100,
            Math.floor((streak / achievement.thresholds[0]) * 100)
          );
        }
        return 0;
      }
      default:
        return 0;
    }
  };

  // Nếu không có thành tựu nào được mở khóa
  if (
    (showNewOnly && newlyUnlocked.size === 0) ||
    (!showNewOnly && unlockedAchievements.length === 0)
  ) {
    return (
      <div className="achievements-empty">
        <div className="achievements-empty-icon">🏆</div>
        <h3>Chưa có thành tựu nào</h3>
        <p>Hãy tiếp tục luyện tập để đạt được thành tựu đầu tiên!</p>
      </div>
    );
  }

  return (
    <div className="achievements-container">
      {!showNewOnly && (
        <div className="achievements-header">
          <h2>Thành tựu của bạn</h2>
          <div className="achievements-points">
            <span className="points-icon">⭐</span>
            <span className="points-value">{totalPoints}</span> điểm
          </div>
        </div>
      )}

      {showNewOnly && (
        <div className="new-achievements-header">
          <h2>Thành tựu mới!</h2>
          {onClose && (
            <button className="close-button" onClick={onClose}>
              ×
            </button>
          )}
        </div>
      )}

      {!showNewOnly && (
        <div className="achievements-filters">
          <button
            className={`filter-button ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            Tất cả
          </button>
          <button
            className={`filter-button ${
              filter === "daily" || filter === "streak" ? "active" : ""
            }`}
            onClick={() => setFilter("streak")}
          >
            Hàng ngày
          </button>
          <button
            className={`filter-button ${filter === "accuracy" ? "active" : ""}`}
            onClick={() => setFilter("accuracy")}
          >
            Độ chính xác
          </button>
          <button
            className={`filter-button ${
              filter === "completion" ? "active" : ""
            }`}
            onClick={() => setFilter("completion")}
          >
            Hoàn thành
          </button>
        </div>
      )}

      <div className="achievements-list">
        {getFilteredAchievements().map((achievement) => (
          <div
            key={achievement.id}
            className={`achievement-item ${
              newlyUnlocked.has(achievement.id) ? "new-achievement" : ""
            }`}
          >
            <div className="achievement-icon">{achievement.icon}</div>
            <div className="achievement-details">
              <div className="achievement-title">{achievement.title}</div>
              <div className="achievement-description">
                {achievement.description}
              </div>
              <div className="achievement-meta">
                <span className="achievement-condition">
                  {achievement.condition}
                </span>
                <span className="achievement-points">
                  {achievement.points} điểm
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!showNewOnly && unlockedAchievements.length < achievements.length && (
        <div className="locked-achievements-section">
          <h3>Thành tựu chưa đạt được</h3>
          <div className="achievements-list locked-list">
            {achievements
              .filter((a) => !unlockedAchievements.some((ua) => ua.id === a.id))
              .map((achievement) => (
                <div key={achievement.id} className="achievement-item locked">
                  <div className="achievement-icon locked-icon">?</div>
                  <div className="achievement-details">
                    <div className="achievement-title">{achievement.title}</div>
                    <div className="achievement-description">
                      {achievement.description}
                    </div>
                    <div className="achievement-progress">
                      <div
                        className="progress-bar"
                        style={{
                          width: `${getAchievementProgress(achievement.id)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AchievementsView;
