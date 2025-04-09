/**
 * Tiện ích cho các animation trong ứng dụng
 */

// Các animation cơ bản cho các component
export const slideInFromLeft = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
  exit: {
    x: -100,
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

export const slideInFromRight = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
  exit: {
    x: 100,
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

export const scaleUp = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
  exit: {
    scale: 0.8,
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

export const popUp = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: [0, 1.1, 1],
    opacity: 1,
    transition: {
      duration: 0.4,
      times: [0, 0.7, 1],
    },
  },
  exit: {
    scale: 0,
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

// Animation cho container với staggered children
export const staggerContainer = (staggerChildren: number = 0.1) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
});

// Animation cho các item trong container
export const staggerItem = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
  exit: {
    y: 20,
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

// Animation for page transitions
export const pageTransition = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3 },
  },
};

// Animation for button hover
export const buttonHover = {
  scale: 1.05,
  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
  transition: { duration: 0.2 },
};

// Animation for button tap
export const buttonTap = {
  scale: 0.95,
  transition: { duration: 0.1 },
};

// Animation for celebration effects
export const celebrationEffect = {
  scale: [1, 1.2, 1],
  rotate: [0, 5, -5, 0],
  transition: {
    duration: 0.5,
    times: [0, 0.4, 0.8, 1],
    repeat: 1,
  },
};
