/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import Button from "./Button";
import "../styles/MultiplayerMode.css";
import QRCode from "./QRCode";
import { useRouter } from "next/router";

interface Player {
  id: string;
  name: string;
  points: number;
  avatar: string;
  isReady: boolean;
  isHost: boolean;
  team?: string; // Optional team assignment
  isSpectator?: boolean; // Optional spectator status
}

interface ChatMessage {
  playerId: string;
  playerName: string;
  avatar: string;
  message: string;
  timestamp: number;
}

interface GameSettings {
  difficulty: "easy" | "medium" | "hard";
  timeLimit: number; // seconds per question
  questionCount: number;
  teamMode: boolean;
}

interface Room {
  id: string;
  code: string;
  hasPassword: boolean;
  password?: string;
  players: Player[];
  messages: ChatMessage[];
  createdAt: number;
  settings: GameSettings;
  isPublic: boolean;
  gameStarted?: boolean; // Optional game started status
}

interface MultiplayerModeProps {
  onStartGame: (players: Player[], settings: GameSettings) => void;
  onCancel: () => void;
}

const DEFAULT_AVATARS = ["🧒", "👦", "👧", "👨", "👩", "👴", "👵", "🧑"];
const DEFAULT_EMOTES = ["👍", "👏", "🎉", "😊", "🤔", "😮", "🙌", "❤️"];
const TEAM_COLORS = ["red", "blue", "green", "yellow"];

const MultiplayerMode: React.FC<MultiplayerModeProps> = ({
  onStartGame,
  onCancel,
}) => {
  const router = useRouter();
  const isKTPathName = router.pathname.startsWith("http");

  const [roomCode, setRoomCode] = useState<string>("");
  const [players, setPlayers] = useState<Player[]>([]);
  const [localPlayer, setLocalPlayer] = useState<Player | null>(null);
  const [playerName, setPlayerName] = useState<string>("");
  const [isCreatingRoom, setIsCreatingRoom] = useState<boolean>(false);
  const [isJoiningRoom, setIsJoiningRoom] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [selectedAvatar, setSelectedAvatar] = useState<string>(
    DEFAULT_AVATARS[0]
  );

  // New state variables for enhanced features
  const [roomPassword, setRoomPassword] = useState<string>("");
  const [isRoomPasswordProtected, setIsRoomPasswordProtected] =
    useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [gameSettings, setGameSettings] = useState<GameSettings>({
    difficulty: "medium",
    timeLimit: 30,
    questionCount: 10,
    teamMode: false,
  });
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [isSpectator, setIsSpectator] = useState<boolean>(false);
  const [selectedEmote, setSelectedEmote] = useState<string>("");
  const [showEmotes, setShowEmotes] = useState<boolean>(false);
  const [showQRCode, setShowQRCode] = useState<boolean>(false);
  const [playerToKick, setPlayerToKick] = useState<string | null>(null);

  // State cho thống kê người chơi
  const [playerStats, setPlayerStats] = useState({
    wins: 0,
    totalPoints: 0,
    rank: "Người mới",
  });

  // Tham chiếu cho cuộn chat
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  // Hàm để lấy thông tin phòng từ localStorage
  const getRoomsFromStorage = (): Room[] => {
    try {
      const rooms = localStorage.getItem("multiplayerRooms");
      return rooms ? JSON.parse(rooms) : [];
    } catch (err) {
      console.error("Error loading rooms from localStorage:", err);
      return [];
    }
  };

  // Hàm để lưu thông tin phòng vào localStorage
  const saveRoomsToStorage = (rooms: Room[]) => {
    try {
      localStorage.setItem("multiplayerRooms", JSON.stringify(rooms));
    } catch (err) {
      console.error("Error saving rooms to localStorage:", err);
    }
  };

  // Hàm để lấy thông tin phòng theo mã phòng
  const getRoomByCode = (code: string): Room | undefined => {
    const rooms = getRoomsFromStorage();
    return rooms.find((room) => room.code === code.toUpperCase());
  };

  // Hàm để cập nhật thông tin phòng
  const updateRoom = (updatedRoom: Room) => {
    const rooms = getRoomsFromStorage();
    const index = rooms.findIndex((room) => room.id === updatedRoom.id);

    if (index !== -1) {
      rooms[index] = updatedRoom;
      saveRoomsToStorage(rooms);
    }
  };

  // Hàm để tìm phòng công khai ngẫu nhiên
  const findRandomPublicRoom = (): Room | undefined => {
    const rooms = getRoomsFromStorage();
    const publicRooms = rooms.filter(
      (room) => room.isPublic && !room.hasPassword && room.players.length < 6
    );

    if (publicRooms.length > 0) {
      return publicRooms[Math.floor(Math.random() * publicRooms.length)];
    }
    return undefined;
  };

  // Hiệu ứng để tự động cuộn xuống khi có tin nhắn mới
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Hiệu ứng để lấy thông tin người chơi từ localStorage khi mở trang
  useEffect(() => {
    try {
      // Lấy thông tin người chơi từ localStorage (nếu có)
      const savedName = localStorage.getItem("playerName");
      const savedAvatar = localStorage.getItem("playerAvatar");
      const savedStats = localStorage.getItem("playerStats");

      if (savedName) {
        setPlayerName(savedName);
      }

      if (savedAvatar) {
        setSelectedAvatar(savedAvatar);
      }

      if (savedStats) {
        setPlayerStats(JSON.parse(savedStats));
      }
    } catch (err) {
      console.error("Error loading player data:", err);
    }
  }, []);

  // Hiệu ứng để giả lập đồng bộ dữ liệu từ server mỗi 3 giây
  useEffect(() => {
    if (!roomCode || !localPlayer) return;

    const interval = setInterval(() => {
      const currentRoom = getRoomByCode(roomCode);

      if (currentRoom) {
        // Cập nhật thông tin người chơi và tin nhắn chat
        setPlayers(currentRoom.players);
        setChatMessages(currentRoom.messages);

        // Kiểm tra trạng thái phòng
        if (currentRoom.gameStarted && !localPlayer.isHost) {
          // Nếu phòng đã bắt đầu và người chơi không phải host
          // thì cũng bắt đầu trò chơi trên client của họ
          const activePlayers = currentRoom.players.filter(
            (player) => !player.isSpectator
          );
          onStartGame(activePlayers, currentRoom.settings);
        }
      } else {
        // Nếu không tìm thấy phòng (đã bị xóa), hiển thị thông báo và quay lại
        alert("Phòng đã bị đóng bởi chủ phòng");
        onCancel();
      }
    }, 1000); // Giảm thời gian đồng bộ xuống 1 giây cho nhanh hơn

    return () => clearInterval(interval);
  }, [roomCode, localPlayer, onStartGame, onCancel]);

  // Tạo phòng mới với mã ngẫu nhiên
  const createRoom = () => {
    if (!playerName.trim()) {
      setError("Vui lòng nhập tên của bạn");
      return;
    }

    setError("");

    // Lưu thông tin người chơi vào localStorage
    localStorage.setItem("playerName", playerName);
    localStorage.setItem("playerAvatar", selectedAvatar);

    // Tạo mã phòng ngẫu nhiên (4 ký tự)
    const newRoomCode = Math.random()
      .toString(36)
      .substring(2, 6)
      .toUpperCase();
    setRoomCode(newRoomCode);

    // Tạo người chơi host
    const hostPlayer: Player = {
      id: generatePlayerId(),
      name: playerName,
      points: 0,
      avatar: selectedAvatar,
      isReady: true,
      isHost: true,
      team: gameSettings.teamMode ? TEAM_COLORS[0] : undefined,
    };

    setLocalPlayer(hostPlayer);
    const initialPlayers = [hostPlayer];
    setPlayers(initialPlayers);

    // Tạo thông tin phòng mới
    const newRoom: Room = {
      id: generatePlayerId(),
      code: newRoomCode,
      hasPassword: isRoomPasswordProtected,
      password: isRoomPasswordProtected ? roomPassword : undefined,
      players: initialPlayers,
      messages: [
        {
          playerId: "system",
          playerName: "Hệ thống",
          avatar: "🤖",
          message: "Phòng đã được tạo. Chờ thêm người chơi...",
          timestamp: Date.now(),
        },
      ],
      createdAt: Date.now(),
      settings: gameSettings,
      isPublic: !isRoomPasswordProtected,
    };

    // Lưu thông tin phòng vào localStorage
    const rooms = getRoomsFromStorage();
    rooms.push(newRoom);
    saveRoomsToStorage(rooms);

    // Cập nhật tin nhắn
    setChatMessages(newRoom.messages);
    setIsCreatingRoom(false);
  };

  // Tham gia phòng hiện có
  const joinRoom = () => {
    if (!playerName.trim()) {
      setError("Vui lòng nhập tên của bạn");
      return;
    }

    if (!roomCode.trim()) {
      setError("Vui lòng nhập mã phòng");
      return;
    }

    setError("");

    // Lưu thông tin người chơi vào localStorage
    localStorage.setItem("playerName", playerName);
    localStorage.setItem("playerAvatar", selectedAvatar);

    // Tìm phòng trong localStorage
    const existingRoom = getRoomByCode(roomCode);

    if (!existingRoom) {
      setError("Không tìm thấy phòng với mã này");
      return;
    }

    // Kiểm tra mật khẩu nếu phòng được bảo vệ
    if (existingRoom.hasPassword && existingRoom.password !== passwordInput) {
      setError("Mật khẩu không đúng");
      return;
    }

    // Tạo người chơi mới
    const newPlayer: Player = {
      id: generatePlayerId(),
      name: playerName,
      points: 0,
      avatar: selectedAvatar,
      isReady: false,
      isHost: false,
      isSpectator: isSpectator,
      team: existingRoom.settings.teamMode
        ? TEAM_COLORS[Math.floor(Math.random() * TEAM_COLORS.length)]
        : undefined,
    };

    // Cập nhật thông tin phòng
    const updatedPlayers = [...existingRoom.players, newPlayer];
    const updatedMessages = [
      ...existingRoom.messages,
      {
        playerId: "system",
        playerName: "Hệ thống",
        avatar: "🤖",
        message: `${playerName} đã tham gia phòng${
          isSpectator ? " với tư cách khán giả" : ""
        }`,
        timestamp: Date.now(),
      },
    ];

    const updatedRoom = {
      ...existingRoom,
      players: updatedPlayers,
      messages: updatedMessages,
    };

    updateRoom(updatedRoom);

    // Cập nhật state
    setLocalPlayer(newPlayer);
    setPlayers(updatedPlayers);
    setChatMessages(updatedMessages);
    setGameSettings(existingRoom.settings);
    setIsJoiningRoom(false);
  };

  // Xử lý tham gia phòng ngẫu nhiên
  const joinRandomRoom = () => {
    // Lưu thông tin người chơi vào localStorage
    const randomName =
      playerName || `Player_${Math.floor(Math.random() * 1000)}`;
    const randomAvatar =
      selectedAvatar ||
      DEFAULT_AVATARS[Math.floor(Math.random() * DEFAULT_AVATARS.length)];

    localStorage.setItem("playerName", randomName);
    localStorage.setItem("playerAvatar", randomAvatar);

    setPlayerName(randomName);
    setSelectedAvatar(randomAvatar);

    // Tìm phòng công khai ngẫu nhiên
    const randomRoom = findRandomPublicRoom();

    if (!randomRoom) {
      // Nếu không tìm thấy phòng nào, tạo phòng mới
      setIsCreatingRoom(true);
      return;
    }

    // Tham gia phòng đã tìm thấy
    setRoomCode(randomRoom.code);

    const newPlayer: Player = {
      id: generatePlayerId(),
      name: randomName,
      points: 0,
      avatar: randomAvatar,
      isReady: false,
      isHost: false,
      team: randomRoom.settings.teamMode
        ? TEAM_COLORS[Math.floor(Math.random() * TEAM_COLORS.length)]
        : undefined,
    };

    // Cập nhật thông tin phòng
    const updatedPlayers = [...randomRoom.players, newPlayer];
    const updatedMessages = [
      ...randomRoom.messages,
      {
        playerId: "system",
        playerName: "Hệ thống",
        avatar: "🤖",
        message: `${randomName} đã tham gia phòng`,
        timestamp: Date.now(),
      },
    ];

    const updatedRoom = {
      ...randomRoom,
      players: updatedPlayers,
      messages: updatedMessages,
    };

    updateRoom(updatedRoom);

    // Cập nhật state
    setLocalPlayer(newPlayer);
    setPlayers(updatedPlayers);
    setChatMessages(updatedMessages);
    setGameSettings(randomRoom.settings);
  };

  // Bắt đầu trò chơi (chỉ dành cho host)
  const startGame = () => {
    // Kiểm tra xem tất cả người chơi đã sẵn sàng chưa
    const allPlayersReady = players.every(
      (player) =>
        player.isReady || player.isSpectator || player.id === localPlayer?.id
    );

    if (allPlayersReady) {
      // Lưu trạng thái trò chơi trước khi bắt đầu
      const currentRoom = getRoomByCode(roomCode);
      if (currentRoom) {
        // Thêm trạng thái gameStarted vào phòng
        const updatedRoom = {
          ...currentRoom,
          gameStarted: true,
        };

        updateRoom(updatedRoom);

        // Lưu thông tin phòng hiện tại để có thể quay lại sau khi chơi xong
        localStorage.setItem(
          "currentGameRoom",
          JSON.stringify({
            roomCode,
            players,
            settings: gameSettings,
          })
        );
      }

      // Lọc ra người chơi không phải khán giả để bắt đầu trò chơi
      const activePlayers = players.filter((player) => !player.isSpectator);
      onStartGame(activePlayers, gameSettings);
    } else {
      setError("Vui lòng đợi tất cả người chơi sẵn sàng");
    }
  };

  // Đánh dấu người chơi sẵn sàng
  const toggleReady = () => {
    if (!localPlayer || !roomCode) return;

    const updatedPlayers = players.map((player) => {
      if (player.id === localPlayer.id) {
        return { ...player, isReady: !player.isReady };
      }
      return player;
    });

    // Cập nhật thông tin trong phòng
    const currentRoom = getRoomByCode(roomCode);
    if (currentRoom) {
      const updatedRoom = {
        ...currentRoom,
        players: updatedPlayers,
      };

      updateRoom(updatedRoom);
    }

    setPlayers(updatedPlayers);
    setLocalPlayer({ ...localPlayer, isReady: !localPlayer.isReady });
  };

  // Gửi tin nhắn vào phòng chat
  const sendMessage = (message: string) => {
    if (!message.trim() || !localPlayer || !roomCode) return;

    const newMessage: ChatMessage = {
      playerId: localPlayer.id,
      playerName: localPlayer.name,
      avatar: localPlayer.avatar,
      message: message,
      timestamp: Date.now(),
    };

    const updatedMessages = [...chatMessages, newMessage];
    setChatMessages(updatedMessages);
    setCurrentMessage("");

    // Cập nhật tin nhắn trong phòng
    const currentRoom = getRoomByCode(roomCode);
    if (currentRoom) {
      const updatedRoom = {
        ...currentRoom,
        messages: updatedMessages,
      };

      updateRoom(updatedRoom);
    }
  };

  // Gửi biểu cảm
  const sendEmote = (emote: string) => {
    sendMessage(emote);
    setShowEmotes(false);
  };

  // Đổi đội
  const changeTeam = (teamColor: string) => {
    if (!localPlayer || !roomCode || localPlayer.isReady) return;

    const updatedPlayers = players.map((player) => {
      if (player.id === localPlayer.id) {
        return { ...player, team: teamColor };
      }
      return player;
    });

    // Cập nhật thông tin trong phòng
    const currentRoom = getRoomByCode(roomCode);
    if (currentRoom) {
      const updatedRoom = {
        ...currentRoom,
        players: updatedPlayers,
      };

      updateRoom(updatedRoom);
    }

    setPlayers(updatedPlayers);
    setLocalPlayer({ ...localPlayer, team: teamColor });
  };

  // Kick người chơi
  const kickPlayer = (playerId: string) => {
    if (!localPlayer?.isHost || !roomCode) return;

    const playerToRemove = players.find((p) => p.id === playerId);
    if (!playerToRemove) return;

    const updatedPlayers = players.filter((p) => p.id !== playerId);
    setPlayers(updatedPlayers);

    const kickMessage: ChatMessage = {
      playerId: "system",
      playerName: "Hệ thống",
      avatar: "🤖",
      message: `${playerToRemove.name} đã bị kick khỏi phòng`,
      timestamp: Date.now(),
    };

    const updatedMessages = [...chatMessages, kickMessage];
    setChatMessages(updatedMessages);

    // Cập nhật thông tin trong phòng
    const currentRoom = getRoomByCode(roomCode);
    if (currentRoom) {
      const updatedRoom = {
        ...currentRoom,
        players: updatedPlayers,
        messages: updatedMessages,
      };

      updateRoom(updatedRoom);
    }

    setPlayerToKick(null);
  };

  // Tạo ID ngẫu nhiên cho người chơi
  const generatePlayerId = (): string => {
    return Math.random().toString(36).substring(2, 10);
  };

  // Xử lý khi thoát khỏi phòng
  const leaveRoom = () => {
    if (!localPlayer || !roomCode) {
      onCancel();
      return;
    }

    // Nếu là host, giải tán phòng
    if (localPlayer.isHost) {
      const rooms = getRoomsFromStorage();
      const updatedRooms = rooms.filter((room) => room.code !== roomCode);
      saveRoomsToStorage(updatedRooms);
    } else {
      // Nếu không phải host, chỉ rời phòng
      const currentRoom = getRoomByCode(roomCode);
      if (currentRoom) {
        const updatedPlayers = currentRoom.players.filter(
          (p) => p.id !== localPlayer.id
        );

        const leaveMessage: ChatMessage = {
          playerId: "system",
          playerName: "Hệ thống",
          avatar: "🤖",
          message: `${localPlayer.name} đã rời phòng`,
          timestamp: Date.now(),
        };

        const updatedMessages = [...currentRoom.messages, leaveMessage];

        const updatedRoom = {
          ...currentRoom,
          players: updatedPlayers,
          messages: updatedMessages,
        };

        updateRoom(updatedRoom);
      }
    }

    onCancel();
  };

  return (
    <div className="multiplayer-container">
      <h2 className="multiplayer-title">Chế độ thi đấu</h2>

      {!roomCode && !isCreatingRoom && !isJoiningRoom && (
        <div className="multiplayer-options">
          <h3>Chơi với bạn bè</h3>
          <div className="buttons-row">
            <Button onClick={() => setIsCreatingRoom(true)}>
              Tạo phòng mới
            </Button>
            <Button onClick={() => setIsJoiningRoom(true)}>
              Tham gia phòng
            </Button>
          </div>

          <div className="quick-options">
            <h3>Tham gia nhanh</h3>
            <Button onClick={joinRandomRoom}>Tìm phòng ngẫu nhiên</Button>

            <Button
              onClick={() => {
                // Open modal for entering player profile
                setIsCreatingRoom(true);

                // Pre-fill with random name
                setPlayerName(`Player_${Math.floor(Math.random() * 1000)}`);
              }}
            >
              Tạo phòng công khai
            </Button>
          </div>

          <div className="player-stats">
            <h3>Thống kê người chơi</h3>
            <div className="stats-container">
              <div className="stat-item">
                <span className="stat-label">Trận thắng:</span>
                <span className="stat-value">23</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Tổng điểm:</span>
                <span className="stat-value">1,250</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Xếp hạng:</span>
                <span className="stat-value">Thách đấu</span>
              </div>
            </div>
          </div>

          <Button onClick={onCancel} variant="secondary">
            Quay lại
          </Button>
        </div>
      )}

      {isCreatingRoom && (
        <div className="multiplayer-form">
          <h3 className="rounded-xl">Tạo phòng mới</h3>

          <div className="form-group">
            <label htmlFor="playerName">Tên của bạn:</label>
            <input
              id="playerName"
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Nhập tên của bạn"
              maxLength={20}
            />
          </div>

          <div className="form-group">
            <label>Chọn hình đại diện:</label>
            <div className="avatar-selector">
              {DEFAULT_AVATARS.map((avatar, index) => (
                <div
                  key={index}
                  className={`avatar-option ${
                    selectedAvatar === avatar ? "selected" : ""
                  }`}
                  onClick={() => setSelectedAvatar(avatar)}
                >
                  {avatar}
                </div>
              ))}
            </div>
          </div>

          <div className="form-group password-protection">
            <label htmlFor="passwordProtection" className="checkbox-label">
              <input
                id="passwordProtection"
                type="checkbox"
                checked={isRoomPasswordProtected}
                onChange={() =>
                  setIsRoomPasswordProtected(!isRoomPasswordProtected)
                }
              />
              Phòng có mật khẩu
            </label>
          </div>

          {isRoomPasswordProtected && (
            <div className="form-group">
              <label htmlFor="roomPassword">Mật khẩu phòng:</label>
              <input
                id="roomPassword"
                type="password"
                value={roomPassword}
                onChange={(e) => setRoomPassword(e.target.value)}
                placeholder="Nhập mật khẩu phòng"
              />
            </div>
          )}

          <div className="form-group">
            <label>Thiết lập trò chơi:</label>
            <div className="game-settings">
              <div className="setting-group">
                <label htmlFor="difficulty">Độ khó:</label>
                <select
                  id="difficulty"
                  value={gameSettings.difficulty}
                  onChange={(e) =>
                    setGameSettings({
                      ...gameSettings,
                      difficulty: e.target.value as "easy" | "medium" | "hard",
                    })
                  }
                >
                  <option value="easy">Dễ</option>
                  <option value="medium">Trung bình</option>
                  <option value="hard">Khó</option>
                </select>
              </div>

              <div className="setting-group">
                <label htmlFor="timeLimit">Thời gian mỗi câu (giây):</label>
                <input
                  id="timeLimit"
                  type="number"
                  min="5"
                  max="120"
                  value={gameSettings.timeLimit}
                  onChange={(e) =>
                    setGameSettings({
                      ...gameSettings,
                      timeLimit: parseInt(e.target.value),
                    })
                  }
                />
              </div>

              <div className="setting-group">
                <label htmlFor="questionCount">Số lượng câu hỏi:</label>
                <input
                  id="questionCount"
                  type="number"
                  min="5"
                  max="30"
                  value={gameSettings.questionCount}
                  onChange={(e) =>
                    setGameSettings({
                      ...gameSettings,
                      questionCount: parseInt(e.target.value),
                    })
                  }
                />
              </div>

              <div className="setting-group checkbox-group">
                <label htmlFor="teamMode" className="checkbox-label">
                  <input
                    id="teamMode"
                    type="checkbox"
                    checked={gameSettings.teamMode}
                    onChange={() =>
                      setGameSettings({
                        ...gameSettings,
                        teamMode: !gameSettings.teamMode,
                      })
                    }
                  />
                  Chế độ đội
                </label>
              </div>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-buttons">
            <Button onClick={createRoom}>Tạo phòng</Button>
            <Button
              onClick={() => setIsCreatingRoom(false)}
              variant="secondary"
            >
              Hủy
            </Button>
          </div>
        </div>
      )}

      {isJoiningRoom && (
        <div className="multiplayer-form">
          <h3 className="rounded-xl">Tham gia phòng</h3>

          <div className="form-group">
            <label htmlFor="playerName">Tên của bạn:</label>
            <input
              id="playerName"
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Nhập tên của bạn"
              maxLength={20}
            />
          </div>

          <div className="form-group">
            <label htmlFor="roomCode">Mã phòng:</label>
            <input
              id="roomCode"
              type="text"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              placeholder="Nhập mã phòng"
              maxLength={4}
            />
          </div>

          <div className="form-group password-input">
            <label htmlFor="passwordInput">Mật khẩu phòng (nếu có):</label>
            <input
              id="passwordInput"
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Nhập mật khẩu phòng nếu cần"
            />
          </div>

          <div className="form-group">
            <label>Chọn hình đại diện:</label>
            <div className="avatar-selector">
              {DEFAULT_AVATARS.map((avatar, index) => (
                <div
                  key={index}
                  className={`avatar-option ${
                    selectedAvatar === avatar ? "selected" : ""
                  }`}
                  onClick={() => setSelectedAvatar(avatar)}
                >
                  {avatar}
                </div>
              ))}
            </div>
          </div>

          <div className="form-group spectator-mode">
            <label htmlFor="spectatorMode" className="checkbox-label">
              <input
                id="spectatorMode"
                type="checkbox"
                checked={isSpectator}
                onChange={() => setIsSpectator(!isSpectator)}
              />
              Tham gia với tư cách khán giả
            </label>
            {isSpectator && (
              <p className="spectator-note">
                Bạn sẽ chỉ có thể xem trò chơi mà không tham gia
              </p>
            )}
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-buttons">
            <Button onClick={joinRoom}>Tham gia</Button>
            <Button onClick={() => setIsJoiningRoom(false)} variant="secondary">
              Hủy
            </Button>
          </div>
        </div>
      )}

      {roomCode && localPlayer && (
        <div className="game-room">
          <div className="room-info">
            <div className="room-header">
              <h3>Phòng: {roomCode}</h3>
              {isRoomPasswordProtected && (
                <span className="password-protected-badge">🔒</span>
              )}
              <div className="room-actions">
                <button
                  className="icon-button"
                  onClick={() => setShowQRCode(!showQRCode)}
                  title="Chia sẻ bằng mã QR"
                >
                  🔗
                </button>
                {localPlayer.isHost && (
                  <button
                    className="icon-button settings-button"
                    onClick={() => setShowSettingsModal(!showSettingsModal)}
                    title="Cài đặt phòng"
                  >
                    ⚙️
                  </button>
                )}
              </div>
            </div>

            <p className="room-code-instruction">
              Chia sẻ mã phòng này với bạn bè để họ tham gia
            </p>

            {showQRCode && (
              <div className="qr-code-container">
                <QRCode
                  url={`${
                    isKTPathName
                      ? "http://localhost:3000"
                      : "https://math-fun-qr.vercel.app"
                  }/join?room=${roomCode}${
                    isRoomPasswordProtected ? "&hasPassword=true" : ""
                  }`}
                  size={150}
                />
                <p>Quét mã QR để tham gia phòng</p>
                <Button
                  onClick={() => setShowQRCode(false)}
                  variant="secondary"
                >
                  Đóng
                </Button>
              </div>
            )}
          </div>

          <div className="game-room-content">
            <div className="left-panel">
              <div className="players-list">
                <div className="players-header">
                  <h3>Người chơi ({players.length})</h3>
                  {gameSettings.teamMode && (
                    <div className="team-selector">
                      <span>Đổi đội:</span>
                      {TEAM_COLORS.map((color) => (
                        <button
                          key={color}
                          className={`team-button team-${color} ${
                            localPlayer.team === color ? "selected" : ""
                          }`}
                          onClick={() => changeTeam(color)}
                          disabled={
                            localPlayer.isReady ||
                            (localPlayer.isHost && players.length > 1)
                          }
                        >
                          {color.charAt(0).toUpperCase()}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {players.map((player) => (
                  <div
                    key={player.id}
                    className={`player-item ${
                      player.id === localPlayer.id ? "current-player" : ""
                    } ${
                      gameSettings.teamMode && player.team
                        ? `team-${player.team}`
                        : ""
                    }`}
                  >
                    <div className="player-avatar">{player.avatar}</div>
                    <div className="player-info">
                      <div className="player-name">
                        {player.name}{" "}
                        {player.isHost && (
                          <span className="host-badge">Chủ phòng</span>
                        )}
                        {isSpectator && (
                          <span className="spectator-badge">Khán giả</span>
                        )}
                      </div>
                      <div className="player-status">
                        {player.isReady ? (
                          <span className="ready-status">Sẵn sàng ✓</span>
                        ) : (
                          <span className="not-ready-status">
                            Chưa sẵn sàng
                          </span>
                        )}
                      </div>
                    </div>

                    {localPlayer.isHost && player.id !== localPlayer.id && (
                      <div className="host-controls">
                        <button
                          className="kick-button"
                          onClick={() => setPlayerToKick(player.id)}
                          title="Kick người chơi"
                        >
                          ❌
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Kick player confirmation modal */}
              {playerToKick && (
                <div className="modal-overlay">
                  <div className="modal-content">
                    <h4>Kick người chơi</h4>
                    <p>Bạn có chắc muốn kick người chơi này ra khỏi phòng?</p>
                    <div className="modal-buttons">
                      <Button onClick={() => kickPlayer(playerToKick)}>
                        Kick
                      </Button>
                      <Button
                        onClick={() => setPlayerToKick(null)}
                        variant="secondary"
                      >
                        Hủy
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Game settings modal */}
              {showSettingsModal && localPlayer.isHost && (
                <div className="modal-overlay">
                  <div className="modal-content settings-modal">
                    <h4>Thiết lập trò chơi</h4>

                    <div className="form-group">
                      <label htmlFor="difficulty-edit">Độ khó:</label>
                      <select
                        id="difficulty-edit"
                        value={gameSettings.difficulty}
                        onChange={(e) =>
                          setGameSettings({
                            ...gameSettings,
                            difficulty: e.target.value as
                              | "easy"
                              | "medium"
                              | "hard",
                          })
                        }
                      >
                        <option value="easy">Dễ</option>
                        <option value="medium">Trung bình</option>
                        <option value="hard">Khó</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="timeLimit-edit">
                        Thời gian mỗi câu (giây):
                      </label>
                      <input
                        id="timeLimit-edit"
                        type="number"
                        min="5"
                        max="120"
                        value={gameSettings.timeLimit}
                        onChange={(e) =>
                          setGameSettings({
                            ...gameSettings,
                            timeLimit: parseInt(e.target.value),
                          })
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="questionCount-edit">
                        Số lượng câu hỏi:
                      </label>
                      <input
                        id="questionCount-edit"
                        type="number"
                        min="5"
                        max="30"
                        value={gameSettings.questionCount}
                        onChange={(e) =>
                          setGameSettings({
                            ...gameSettings,
                            questionCount: parseInt(e.target.value),
                          })
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="teamMode-edit" className="checkbox-label">
                        <input
                          id="teamMode-edit"
                          type="checkbox"
                          checked={gameSettings.teamMode}
                          onChange={() =>
                            setGameSettings({
                              ...gameSettings,
                              teamMode: !gameSettings.teamMode,
                            })
                          }
                        />
                        Chế độ đội
                      </label>
                    </div>

                    <div className="modal-buttons">
                      <Button
                        onClick={() => {
                          setShowSettingsModal(false);
                          setChatMessages([
                            ...chatMessages,
                            {
                              playerId: "system",
                              playerName: "Hệ thống",
                              avatar: "🤖",
                              message: "Thiết lập phòng đã được cập nhật",
                              timestamp: Date.now(),
                            },
                          ]);
                        }}
                      >
                        Lưu thay đổi
                      </Button>
                      <Button
                        onClick={() => setShowSettingsModal(false)}
                        variant="secondary"
                      >
                        Hủy
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="right-panel">
              <div className="chat-container">
                <div className="chat-messages" ref={chatMessagesRef}>
                  {chatMessages.length === 0 ? (
                    <div className="empty-chat">
                      <p>Hãy gửi tin nhắn đầu tiên!</p>
                    </div>
                  ) : (
                    chatMessages.map((msg, index) => (
                      <div
                        key={index}
                        className={`chat-message ${
                          msg.playerId === localPlayer.id ? "own-message" : ""
                        } ${msg.playerId === "system" ? "system-message" : ""}`}
                      >
                        <div className="message-avatar">{msg.avatar}</div>
                        <div className="message-content">
                          <div className="message-header">
                            <span className="message-author">
                              {msg.playerName}
                            </span>
                            <span className="message-time">
                              {new Date(msg.timestamp).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          <div className="message-text">{msg.message}</div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="emote-container">
                  {showEmotes && (
                    <div className="emote-picker">
                      {DEFAULT_EMOTES.map((emote, index) => (
                        <button
                          key={index}
                          className="emote-button"
                          onClick={() => sendEmote(emote)}
                        >
                          {emote}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="chat-input-container">
                  <button
                    className="emote-toggle-button"
                    onClick={() => setShowEmotes(!showEmotes)}
                    title="Gửi biểu cảm"
                  >
                    😊
                  </button>
                  <input
                    type="text"
                    className="chat-input"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    placeholder="Nhắn tin với mọi người..."
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && currentMessage.trim()) {
                        sendMessage(currentMessage);
                      }
                    }}
                  />
                  <button
                    className="send-button"
                    onClick={() => sendMessage(currentMessage)}
                    disabled={!currentMessage.trim()}
                  >
                    📤
                  </button>
                </div>
              </div>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="room-controls">
            {localPlayer.isHost ? (
              <Button
                onClick={startGame}
                disabled={
                  !players.every(
                    (player) => player.isReady || player.id === localPlayer.id
                  )
                }
              >
                Bắt đầu
              </Button>
            ) : (
              <Button
                onClick={toggleReady}
                variant={localPlayer.isReady ? "secondary" : "primary"}
                disabled={isSpectator}
              >
                {isSpectator
                  ? "Chỉ xem"
                  : localPlayer.isReady
                  ? "Hủy sẵn sàng"
                  : "Sẵn sàng"}
              </Button>
            )}
            <Button onClick={leaveRoom} variant="secondary">
              Rời phòng
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiplayerMode;
