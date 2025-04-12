/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import Layout from "@/components/layout/Layout";
import MultiplayerMode from "@/components/shared/MultiplayerMode";
import QuizContainer from "@/components/quiz/QuizContainer";
import { useRouter } from "next/router";

const MultiplayerPage: NextPage = () => {
  const router = useRouter();
  const [gameStarted, setGameStarted] = useState(false);
  const [players, setPlayers] = useState<any[]>([]);
  const [gameSettings, setGameSettings] = useState<any>(null);

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

    const gameRecord = {
      id: gameId,
      date: new Date().toISOString(),
      players: players.map((player) => ({
        ...player,
        score: results.find((r: any) => r.playerId === player.id)?.score || 0,
      })),
      settings: gameSettings,
      teamMode: gameSettings?.teamMode || false,
    };

    gameHistory.push(gameRecord);
    localStorage.setItem("gameHistory", JSON.stringify(gameHistory));

    // Quay lại trang multiplayer
    setGameStarted(false);
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
      {!gameStarted ? (
        <MultiplayerMode
          onStartGame={handleStartGame}
          onCancel={handleCancel}
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
