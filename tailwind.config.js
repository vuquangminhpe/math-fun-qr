const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#FFD166", // Vàng nhạt
          DEFAULT: "#FF9F1C", // Cam
          dark: "#F76E11", // Cam đậm
        },
        secondary: {
          light: "#90E39A", // Xanh lá nhạt
          DEFAULT: "#41B3A3", // Xanh ngọc
          dark: "#2E8B57", // Xanh lá đậm
        },
        accent: {
          light: "#F5C6FF", // Tím nhạt
          DEFAULT: "#D58BDD", // Tím
          dark: "#9656A1", // Tím đậm
        },
        background: {
          light: "#F9F7F3", // Nền sáng
          DEFAULT: "#FCEFEF", // Nền hồng nhạt
          dark: "#FBE4D8", // Nền cam nhạt
        },
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        "bounce-slow": "bounce 3s infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      fontFamily: {
        comic: ["Comic Sans MS", "Comic Sans", "cursive"],
        rounded: ["Varela Round", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        bubble:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        card: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};
export default config;
