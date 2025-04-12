import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "../styles/Ranking.css";

// Interface cho kết quả bài làm
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

interface RankingViewProps {
  initialLevel?: number;
}

const RankingView: React.FC<RankingViewProps> = ({ initialLevel = 1 }) => {
  const router = useRouter();
  const [selectedLevel, setSelectedLevel] = useState<number>(initialLevel);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lấy dữ liệu từ localStorage khi component mount
    const loadResults = () => {
      setLoading(true);
      try {
        const savedResults = localStorage.getItem("quizResults");
        if (savedResults) {
          const parsedResults: QuizResult[] = JSON.parse(savedResults);

          // Lọc kết quả có tên học sinh (không phải "Học sinh không tên")
          // và sắp xếp theo độ chính xác (cao đến thấp)
          const namedResults = parsedResults
            .filter((result) => result.studentName !== "Học sinh không tên")
            .sort((a, b) => b.accuracy - a.accuracy);

          setQuizResults(namedResults);
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

  // Lọc kết quả theo level
  const filteredResults = quizResults.filter(
    (result) => result.level === selectedLevel
  );

  // Tính toán cấp độ đề xuất dựa trên độ chính xác
  const getRecommendedLevel = (accuracy: number): number => {
    if (accuracy < 40) return 1;
    if (accuracy < 60) return 2;
    return 3;
  };

  // Lấy thông báo dựa vào độ chính xác
  const getRecommendation = (accuracy: number): string => {
    if (accuracy < 40) {
      return "Bạn nên luyện tập thêm cấp độ 1 để nâng cao kỹ năng cơ bản.";
    } else if (accuracy < 60) {
      return "Bạn có thể thử thách bản thân với cấp độ 2.";
    } else {
      return "Bạn đã sẵn sàng cho những thử thách khó hơn ở cấp độ 3!";
    }
  };

  // Chuyển hướng đến level được đề xuất
  const navigateToLevel = (level: number) => {
    router.push(`/level${level}`);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="ranking-container">
      <div className="ranking-header">
        <h2 className="ranking-title">Bảng xếp hạng học sinh</h2>
        <div className="ranking-tabs">
          <button
            className={`ranking-tab ${
              selectedLevel === 1 ? "active level-1-tab" : ""
            }`}
            onClick={() => setSelectedLevel(1)}
          >
            Cấp độ 1
          </button>
          <button
            className={`ranking-tab ${
              selectedLevel === 2 ? "active level-2-tab" : ""
            }`}
            onClick={() => setSelectedLevel(2)}
          >
            Cấp độ 2
          </button>
          <button
            className={`ranking-tab ${
              selectedLevel === 3 ? "active level-3-tab" : ""
            }`}
            onClick={() => setSelectedLevel(3)}
          >
            Cấp độ 3
          </button>
        </div>
      </div>

      {filteredResults.length === 0 ? (
        <div className="empty-ranking">
          <p>Chưa có dữ liệu xếp hạng cho cấp độ {selectedLevel}.</p>
          <p>
            Hãy hoàn thành bài kiểm tra và nhập tên của bạn để xuất hiện trong
            bảng xếp hạng!
          </p>
        </div>
      ) : (
        <div className="ranking-table-container">
          <table className="ranking-table">
            <thead>
              <tr>
                <th>Xếp hạng</th>
                <th>Tên học sinh</th>
                <th>Điểm số</th>
                <th>Độ chính xác</th>
                <th>Đề xuất</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.map((result, index) => {
                const recommendedLevel = getRecommendedLevel(result.accuracy);
                return (
                  <tr key={result.id}>
                    <td className="rank-cell">
                      <div
                        className={`rank-badge ${
                          index < 3 ? `top-${index + 1}` : ""
                        }`}
                      >
                        {index + 1}
                      </div>
                    </td>
                    <td className="student-name-cell">{result.studentName}</td>
                    <td>
                      <div className="score-display">
                        {result.score}/{result.totalQuestions}
                      </div>
                    </td>
                    <td>
                      <div className="ranking-accuracy-bar-container">
                        <div
                          className={`ranking-accuracy-bar ${
                            result.accuracy >= 80
                              ? "excellent"
                              : result.accuracy >= 60
                              ? "good"
                              : result.accuracy >= 40
                              ? "average"
                              : "needs-improvement"
                          }`}
                          style={{ width: `${result.accuracy}%` }}
                        ></div>
                        <span className="ranking-accuracy-text">
                          {result.accuracy}%
                        </span>
                      </div>
                    </td>
                    <td className="recommendation-cell">
                      <div className="recommendation">
                        <p>{getRecommendation(result.accuracy)}</p>
                        <button
                          className={`try-level-btn level-${recommendedLevel}-btn`}
                          onClick={() => navigateToLevel(recommendedLevel)}
                        >
                          Thử cấp độ {recommendedLevel}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RankingView;
