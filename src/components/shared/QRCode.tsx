import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";

interface QRCodeProps {
  url: string;
  level: number;
  size?: number;
  title?: string;
}

const QRCode: React.FC<QRCodeProps> = ({ url, level, size = 200, title }) => {
  // Màu sắc dựa trên level
  const colors = {
    1: "#FF9F1C", // primary
    2: "#41B3A3", // secondary
    3: "#D58BDD", // accent
  };

  // Lấy màu tương ứng với level
  const color = colors[level as keyof typeof colors] || colors[1];

  return (
    <motion.div
      className="text-center p-4 bg-white rounded-2xl shadow-lg"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
      }}
    >
      {title && (
        <h3 className="text-lg font-comic mb-4 text-center" style={{ color }}>
          {title}
        </h3>
      )}

      <div
        className="p-3 border-4 rounded-xl inline-block"
        style={{ borderColor: color }}
      >
        <QRCodeSVG
          value={url}
          size={size}
          fgColor={color}
          level="H"
          imageSettings={{
            src: `/images/logo-level${level}.png`,
            excavate: true,
            height: size * 0.2,
            width: size * 0.2,
          }}
        />
      </div>

      <p className="mt-3 text-sm text-gray-600">
        Quét mã QR để vào bài tập Cấp độ {level}
      </p>
    </motion.div>
  );
};

export default QRCode;
