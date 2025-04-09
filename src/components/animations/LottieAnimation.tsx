import React from "react";
import Lottie from "lottie-react";

interface LottieAnimationProps {
  animationPath: string;
  width?: number;
  height?: number;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({
  animationPath,
  width = 200,
  height = 200,
  loop = true,
  autoplay = true,
  className = "",
  style = {},
}) => {
  return (
    <div
      className={`lottie-container ${className}`}
      style={{ width, height, ...style }}
    >
      <Lottie
        animationData={animationPath}
        loop={loop}
        autoplay={autoplay}
        style={{ width: "100%", height: "100%" }}
        rendererSettings={{
          preserveAspectRatio: "xMidYMid slice",
        }}
      />
    </div>
  );
};

export default LottieAnimation;
