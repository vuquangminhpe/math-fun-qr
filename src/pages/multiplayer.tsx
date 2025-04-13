/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import Layout from "@/components/layout/Layout";
import MultiplayerMode from "@/components/shared/MultiplayerMode";
import QuizContainer from "@/components/quiz/QuizContainer";
import { useRouter } from "next/router";

interface GameResult {
  playerId: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
}

interface ResultsProps {
  results: GameResult[];
  players: any[];
  gameSettings: any;
  onReturnToRoom: () => void;
  onReturnToLobby: () => void;
}

const ResultsScreen: React.FC<ResultsProps> = ({
  results,
  players,
  gameSettings,
  onReturnToRoom,
  onReturnToLobby,
}) => {
  // Sắp xếp kết quả theo điểm số từ cao đến thấp
  const sortedResults = [...results].sort((a, b) => b.score - a.score);

  // Tính tổng điểm của đội nếu đang chơi chế độ đội
  const teamScores: Record<string, number> = {};

  if (gameSettings?.teamMode) {
    players.forEach((player) => {
      if (player.team) {
        const playerResult = results.find((r) => r.playerId === player.id);
        if (playerResult) {
          if (!teamScores[player.team]) {
            teamScores[player.team] = 0;
          }
          teamScores[player.team] += playerResult.score;
        }
      }
    });
  }

  // Sắp xếp điểm số đội
  const sortedTeamScores = Object.entries(teamScores)
    .sort(([, scoreA], [, scoreB]) => (scoreB as number) - (scoreA as number))
    .map(([team, score]) => ({ team, score }));

  return (
    <div className="multiplayer-results">
      <h2>Kết quả thi đấu</h2>

      {gameSettings?.teamMode && (
        <div className="team-results">
          <h3>Điểm số đội</h3>
          <div className="team-scores">
            {sortedTeamScores.map((item, index) => (
              <div
                key={item.team}
                className={`team-score-item team-${item.team}`}
              >
                <div className="team-rank">{index + 1}</div>
                <div className="team-color-indicator"></div>
                <div className="team-name">
                  Đội {item.team.charAt(0).toUpperCase() + item.team.slice(1)}
                </div>
                <div className="team-points">{item.score} điểm</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="player-results">
        <h3>Xếp hạng cá nhân</h3>
        <div className="results-table">
          <div className="results-header">
            <div className="col-rank">Hạng</div>
            <div className="col-player">Người chơi</div>
            <div className="col-score">Điểm</div>
            <div className="col-accuracy">Độ chính xác</div>
          </div>

          {sortedResults.map((result, index) => {
            const player = players.find((p) => p.id === result.playerId);
            const accuracy = Math.round(
              (result.correctAnswers / result.totalQuestions) * 100
            );

            return (
              <div
                key={result.playerId}
                className={`results-row ${index < 3 ? "top-rank" : ""}`}
              >
                <div className="col-rank">
                  {index === 0
                    ? "🥇"
                    : index === 1
                    ? "🥈"
                    : index === 2
                    ? "🥉"
                    : index + 1}
                </div>
                <div className="col-player">
                  <span className="player-avatar">{player?.avatar}</span>
                  <span className="player-name">{player?.name}</span>
                  {gameSettings?.teamMode && player?.team && (
                    <span
                      className={`team-indicator team-${player.team}`}
                    ></span>
                  )}
                </div>
                <div className="col-score">{result.score}</div>
                <div className="col-accuracy">{accuracy}%</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="results-actions">
        <button
          className="result-action-button primary"
          onClick={onReturnToRoom}
        >
          Quay lại phòng
        </button>
        <button
          className="result-action-button secondary"
          onClick={onReturnToLobby}
        >
          Quay lại menu
        </button>
      </div>
    </div>
  );
};

const MultiplayerPage: NextPage = () => {
  const router = useRouter();
  const [gameStarted, setGameStarted] = useState(false);
  const [players, setPlayers] = useState<any[]>([]);
  const [gameSettings, setGameSettings] = useState<any>(null);
  const [gameResults, setGameResults] = useState<GameResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Xử lý khi bắt đầu trò chơi
  const handleStartGame = (players: any[], settings: any) => {
    // Lưu thông tin người chơi và cài đặt vào localStorage
    localStorage.setItem("multiplayerPlayers", JSON.stringify(players));
    localStorage.setItem("multiplayerSettings", JSON.stringify(settings));

    setPlayers(players);
    setGameSettings(settings);
    setGameStarted(true);
  };

  // Xử lý khi kết thúc trò chơi
  const handleGameEnd = (results: any) => {
    // Lưu kết quả vào localStorage
    const gameId = `multiplayer_${new Date().getTime()}`;
    const gameHistory = JSON.parse(localStorage.getItem("gameHistory") || "[]");

    // Đảm bảo kết quả có đầy đủ thông tin cần thiết
    const processedResults: GameResult[] = results.map((result: any) => {
      const player = players.find((p) => p.id === result.playerId);

      // Đảm bảo kết quả đã có các trường dữ liệu cần thiết
      if (!result.hasOwnProperty("correctAnswers")) {
        result.correctAnswers = 0;
        if (result.answers) {
          result.correctAnswers = result.answers.filter(
            (a: any) => a.isCorrect
          ).length;
        }
      }

      // Đảm bảo có tổng số câu hỏi
      if (!result.hasOwnProperty("totalQuestions")) {
        result.totalQuestions = gameSettings.questionCount;
      }

      return {
        playerId: result.playerId,
        playerName: player?.name || "Unknown",
        avatar: player?.avatar || "👤",
        score: result.score || 0,
        correctAnswers: result.correctAnswers || 0,
        totalQuestions: result.totalQuestions || gameSettings.questionCount,
        answers: result.answers || [],
      };
    });

    const gameRecord = {
      id: gameId,
      date: new Date().toISOString(),
      players: players.map((player) => {
        const result = processedResults.find((r) => r.playerId === player.id);
        return {
          ...player,
          score: result?.score || 0,
          correctAnswers: result?.correctAnswers || 0,
        };
      }),
      settings: gameSettings,
      teamMode: gameSettings?.teamMode || false,
      results: processedResults,
    };

    gameHistory.push(gameRecord);
    localStorage.setItem("gameHistory", JSON.stringify(gameHistory));

    // Lưu kết quả và hiển thị màn hình kết quả
    setGameResults(processedResults);
    setShowResults(true);
    setGameStarted(false);
  };

  // Xử lý khi quay lại phòng
  const handleReturnToRoom = () => {
    setShowResults(false);

    // Kiểm tra xem phòng còn tồn tại không
    const currentGameRoom = localStorage.getItem("currentGameRoom");
    if (currentGameRoom) {
      try {
        const { roomCode } = JSON.parse(currentGameRoom);
        const rooms = JSON.parse(
          localStorage.getItem("multiplayerRooms") || "[]"
        );
        const roomExists = rooms.some((room: any) => room.code === roomCode);

        if (roomExists) {
          // Phòng vẫn tồn tại, quay lại
          return;
        }
      } catch (error) {
        console.error("Error parsing room data:", error);
      }
    }

    // Nếu phòng không còn, quay lại menu
    handleReturnToLobby();
  };

  // Xử lý khi quay lại menu
  const handleReturnToLobby = () => {
    // Xóa dữ liệu phòng hiện tại
    localStorage.removeItem("currentGameRoom");
    setShowResults(false);
  };

  // Xử lý khi hủy
  const handleCancel = () => {
    router.push("/");
  };

  // Kiểm tra xem có dữ liệu multiplayer đang được lưu trong localStorage hay không khi tải trang
  useEffect(() => {
    const savedPlayers = localStorage.getItem("multiplayerPlayers");
    const savedSettings = localStorage.getItem("multiplayerSettings");

    if (savedPlayers && savedSettings) {
      setPlayers(JSON.parse(savedPlayers));
      setGameSettings(JSON.parse(savedSettings));
      // Không tự động bắt đầu trò chơi, người dùng có thể chọn tiếp tục hoặc bắt đầu mới
    }
  }, []);

  return (
    <Layout title="Chế độ thi đấu">
      {!gameStarted && !showResults ? (
        <MultiplayerMode
          onStartGame={handleStartGame}
          onCancel={handleCancel}
        />
      ) : showResults ? (
        <ResultsScreen
          results={gameResults}
          players={players}
          gameSettings={gameSettings}
          onReturnToRoom={handleReturnToRoom}
          onReturnToLobby={handleReturnToLobby}
        />
      ) : (
        <QuizContainer
          level={
            gameSettings?.difficulty === "easy"
              ? 1
              : gameSettings?.difficulty === "medium"
              ? 2
              : 3
          }
          questionsCount={gameSettings?.questionCount || 10}
          timePerQuestion={gameSettings?.timeLimit || 30}
          players={players}
          isMultiplayer={true}
          onComplete={handleGameEnd}
        />
      )}
    </Layout>
  );
};

export default MultiplayerPage;
