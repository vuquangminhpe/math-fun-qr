// Định nghĩa kiểu dữ liệu cho câu hỏi và đáp án

export interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  text: string;
  answers: Answer[];
  difficulty: "easy" | "medium" | "hard";
  imageUrl?: string;
}

export interface QuestionBank {
  level: number;
  questions: Question[];
}

export interface AnimationState {
  showStars: boolean;
  showBubbles: boolean;
  showApplause: boolean;
}

export interface LevelInfo {
  id: number;
  title: string;
  description: string;
  color: string;
  backgroundImage: string;
}
