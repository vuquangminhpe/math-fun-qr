import React, { useState } from "react";
import { useRouter } from "next/router";
import "../styles/PasswordModal.css";

interface PasswordModalProps {
  onClose: () => void;
}

const PasswordModal: React.FC<PasswordModalProps> = ({ onClose }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [destination, setDestination] = useState<
    "history" | "manage-questions"
  >("history");
  const router = useRouter();

  const correctPassword = "huyen25081997";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      // Store authentication status in session storage
      sessionStorage.setItem("teacherAuthenticated", "true");
      router.push(`/${destination}`);
      onClose();
    } else {
      setError("Mật khẩu không đúng. Bạn không có quyền truy cập trang này.");
    }
  };

  return (
    <div className="password-modal-overlay">
      <div className="password-modal">
        <div className="password-modal-header">
          <h3>Xác thực giáo viên</h3>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="password-modal-body">
          <p>Vui lòng nhập mật khẩu để truy cập trang dành cho giáo viên:</p>
          {error && <div className="password-error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="password-input-group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
                className="password-input"
              />
            </div>

            <div className="option-selector">
              <p>Chọn chức năng:</p>
              <div className="option-buttons">
                <button
                  type="button"
                  className={`option-btn ${
                    destination === "history" ? "active" : ""
                  }`}
                  onClick={() => setDestination("history")}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Xem lịch sử làm bài
                </button>
                <button
                  type="button"
                  className={`option-btn ${
                    destination === "manage-questions" ? "active" : ""
                  }`}
                  onClick={() => setDestination("manage-questions")}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Quản lý câu hỏi
                </button>
              </div>
            </div>

            <div className="password-modal-actions">
              <button
                type="button"
                className="password-cancel-button"
                onClick={onClose}
              >
                Hủy
              </button>
              <button type="submit" className="password-submit-button">
                Xác nhận
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordModal;
