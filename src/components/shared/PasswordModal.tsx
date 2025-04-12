import React, { useState } from "react";
import { useRouter } from "next/router";
import "../styles/PasswordModal.css";

interface PasswordModalProps {
  onClose: () => void;
}

const PasswordModal: React.FC<PasswordModalProps> = ({ onClose }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const correctPassword = "huyen25081997";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      // Store authentication status in session storage
      sessionStorage.setItem("teacherAuthenticated", "true");
      router.push("/history");
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
          <p>Vui lòng nhập mật khẩu để truy cập trang lịch sử làm bài:</p>
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
