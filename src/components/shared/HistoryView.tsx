import React, { useState, useEffect } from "react";
import "../styles/History.css";

// Interface để lưu kết quả bài làm
interface QuizResult {
  id: string;
  studentName: string;
  level: number;
  score: number;
  totalQuestions: number;
  accuracy: number;
  date: string;
  timestamp: number;
}

const HistoryView: React.FC = () => {
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<number | null>(null);

  useEffect(() => {
    // Lấy dữ liệu từ localStorage khi component mount
    const loadResults = () => {
      setLoading(true);
      try {
        const savedResults = localStorage.getItem("quizResults");
        if (savedResults) {
          const parsedResults: QuizResult[] = JSON.parse(savedResults);

          // Lọc kết quả trong vòng 24 giờ qua
          const oneDayAgo = new Date();
          oneDayAgo.setDate(oneDayAgo.getDate() - 1);

          const recentResults = parsedResults.filter(
            (result) => result.timestamp > oneDayAgo.getTime()
          );

          setQuizResults(recentResults);
        } else {
          setQuizResults([]);
        }
      } catch (error) {
        console.error("Error loading quiz results:", error);
        setQuizResults([]);
      }
      setLoading(false);
    };

    loadResults();
  }, []);

  // Lọc kết quả theo cấp độ
  const filteredResults =
    filter !== null
      ? quizResults.filter((result) => result.level === filter)
      : quizResults;

  // Xóa tất cả lịch sử
  const handleClearHistory = () => {
    if (
      window.confirm("Bạn có chắc chắn muốn xóa tất cả lịch sử làm bài không?")
    ) {
      localStorage.removeItem("quizResults");
      setQuizResults([]);
    }
  };

  // Phân loại theo cấp độ
  const getLevelClassName = (level: number) => {
    switch (level) {
      case 1:
        return "level-1";
      case 2:
        return "level-2";
      case 3:
        return "level-3";
      default:
        return "";
    }
  };

  // Hàm định dạng phần trăm
  const formatPercentage = (value: number) => {
    return `${value}%`;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="history-container">
      <div className="history-header">
        <h2 className="history-title">Lịch sử làm bài (24 giờ qua)</h2>
        <div className="history-actions">
          <div className="filter-buttons">
            <button
              className={`filter-button ${filter === null ? "active" : ""}`}
              onClick={() => setFilter(null)}
            >
              Tất cả
            </button>
            <button
              className={`filter-button level-1-btn ${
                filter === 1 ? "active" : ""
              }`}
              onClick={() => setFilter(1)}
            >
              Cấp độ 1
            </button>
            <button
              className={`filter-button level-2-btn ${
                filter === 2 ? "active" : ""
              }`}
              onClick={() => setFilter(2)}
            >
              Cấp độ 2
            </button>
            <button
              className={`filter-button level-3-btn ${
                filter === 3 ? "active" : ""
              }`}
              onClick={() => setFilter(3)}
            >
              Cấp độ 3
            </button>
          </div>
          <button
            className="clear-history-button"
            onClick={handleClearHistory}
            disabled={quizResults.length === 0}
          >
            Xóa lịch sử
          </button>
        </div>
      </div>

      {filteredResults.length === 0 ? (
        <div className="empty-history">
          <p>Không có dữ liệu lịch sử làm bài trong 24 giờ qua.</p>
        </div>
      ) : (
        <div className="history-table-container">
          <table className="history-table">
            <thead>
              <tr>
                <th>Tên học sinh</th>
                <th>Cấp độ</th>
                <th>Điểm số</th>
                <th>Độ chính xác</th>
                <th>Thời gian</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.map((result) => (
                <tr key={result.id}>
                  <td>{result.studentName}</td>
                  <td>
                    <span
                      className={`level-badge ${getLevelClassName(
                        result.level
                      )}`}
                    >
                      Cấp độ {result.level}
                    </span>
                  </td>
                  <td>
                    <span className="score">
                      {result.score}/{result.totalQuestions}
                    </span>
                  </td>
                  <td>
                    <div className="accuracy-bar-container">
                      <div
                        className={`accuracy-bar ${
                          result.accuracy >= 80
                            ? "excellent"
                            : result.accuracy >= 60
                            ? "good"
                            : "needs-improvement"
                        }`}
                        style={{ width: formatPercentage(result.accuracy) }}
                      ></div>
                      <span className="accuracy-text">
                        {formatPercentage(result.accuracy)}
                      </span>
                    </div>
                  </td>
                  <td>{result.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HistoryView;
