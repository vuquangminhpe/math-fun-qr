/**
 * Tiện ích cho âm thanh trong ứng dụng
 */

/**
 * Các loại âm thanh có sẵn trong ứng dụng
 */
export enum SoundType {
  CORRECT = "correct",
  WRONG = "wrong",
  APPLAUSE = "applause",
  BUBBLES = "bubbles",
  STARS = "stars",
  CLICK = "click",
}

/**
 * Phát âm thanh
 * @param sound Loại âm thanh cần phát
 * @param volume Âm lượng (0-1, mặc định là 0.5)
 */
export const playSound = (sound: SoundType, volume: number = 0.5): void => {
  try {
    const audio = new Audio(`/sounds/${sound}.mp3`);
    audio.volume = Math.min(1, Math.max(0, volume));

    // Bắt lỗi nếu không thể phát âm thanh
    audio.play().catch((error) => {
      console.error(`Error playing sound: ${error.message}`);
    });
  } catch (error) {
    console.error(`Error creating audio: ${error}`);
  }
};

/**
 * Lớp quản lý âm thanh nền
 */
export class BackgroundMusic {
  private static instance: BackgroundMusic;
  private audio: HTMLAudioElement | null = null;
  private isPlaying: boolean = false;

  private constructor() {
    // Singleton pattern
  }

  /**
   * Lấy instance của lớp BackgroundMusic
   */
  public static getInstance(): BackgroundMusic {
    if (!BackgroundMusic.instance) {
      BackgroundMusic.instance = new BackgroundMusic();
    }
    return BackgroundMusic.instance;
  }

  /**
   * Phát nhạc nền
   * @param src Đường dẫn file âm thanh
   * @param volume Âm lượng (0-1)
   * @param loop Có lặp lại không
   */
  public play(src: string, volume: number = 0.3, loop: boolean = true): void {
    // Dừng nhạc hiện tại nếu có
    this.stop();

    try {
      this.audio = new Audio(src);
      this.audio.volume = Math.min(1, Math.max(0, volume));
      this.audio.loop = loop;

      // Bắt lỗi nếu không thể phát âm thanh
      this.audio
        .play()
        .then(() => {
          this.isPlaying = true;
        })
        .catch((error) => {
          console.error(`Error playing background music: ${error.message}`);
          this.isPlaying = false;
        });
    } catch (error) {
      console.error(`Error creating background music: ${error}`);
    }
  }

  /**
   * Dừng nhạc nền
   */
  public stop(): void {
    if (this.audio && this.isPlaying) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.isPlaying = false;
    }
  }

  /**
   * Tạm dừng/tiếp tục nhạc nền
   */
  public toggle(): void {
    if (!this.audio) return;

    if (this.isPlaying) {
      this.audio.pause();
      this.isPlaying = false;
    } else {
      this.audio
        .play()
        .then(() => {
          this.isPlaying = true;
        })
        .catch((error) => {
          console.error(`Error resuming background music: ${error.message}`);
        });
    }
  }

  /**
   * Thay đổi âm lượng
   * @param volume Âm lượng (0-1)
   */
  public setVolume(volume: number): void {
    if (this.audio) {
      this.audio.volume = Math.min(1, Math.max(0, volume));
    }
  }

  /**
   * Kiểm tra nhạc có đang phát không
   */
  public isCurrentlyPlaying(): boolean {
    return this.isPlaying;
  }
}

// Export instance mặc định
export const backgroundMusic = BackgroundMusic.getInstance();
