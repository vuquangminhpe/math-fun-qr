import React from "react";
import { QRCodeSVG } from "qrcode.react";
import "../styles/QRCode.css";

interface QRCodeProps {
  url: string;
  title?: string;
  size?: number;
  colorDark?: string;
  colorLight?: string;
  level?: "L" | "M" | "Q" | "H";
}

const QRCode: React.FC<QRCodeProps> = ({
  url,
  title,
  size = 200,
  colorDark = "#3b82f6", // Blue color by default
  colorLight = "#ffffff",
  level = "H",
}) => {
  return (
    <div className="qr-code-container">
      {title && <h3 className="qr-code-title">{title}</h3>}

      <div className="qr-code-image">
        <QRCodeSVG
          value={url}
          size={size}
          bgColor={colorLight}
          fgColor={colorDark}
          level={level}
          includeMargin={true}
        />
      </div>

      <p className="qr-code-description">Quét mã QR để truy cập</p>
    </div>
  );
};

export default QRCode;
