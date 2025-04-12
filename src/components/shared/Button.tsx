import React from "react";
import "../styles/globals.css";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline";
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className = "",
  disabled = false,
  type = "button",
  variant = "primary",
}) => {
  // Base button classes
  const baseClasses =
    "px-4 py-2 rounded-md font-medium transition-all duration-200";

  // Variant specific classes
  const variantClasses = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    secondary: "bg-green-500 hover:bg-green-600 text-white",
    outline:
      "bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-50",
  };

  // Disabled classes
  const disabledClasses = "opacity-50 cursor-not-allowed";

  // Combine all classes
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${
    disabled ? disabledClasses : ""
  } ${className}`;

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
