class SoundService {
  private sounds: Map<string, HTMLAudioElement> = new Map();
  private bgMusic: HTMLAudioElement | null = null;
  private isMuted = false;

  constructor() {
    // Preload sounds
    this.loadSound('success', '/sounds/success.mp3');
    this.loadSound('failure', '/sounds/failure.mp3');
    this.loadSound('combo', '/sounds/combo.mp3');
    this.loadSound('reward', '/sounds/reward.mp3');
    this.loadSound('click', '/sounds/click.mp3');
    
    // Load background music
    this.bgMusic = new Audio('/sounds/background.mp3');
    this.bgMusic.loop = true;
  }

  private loadSound(name: string, path: string) {
    const audio = new Audio(path);
    this.sounds.set(name, audio);
  }

  playSound(name: string) {
    if (this.isMuted) return;
    const sound = this.sounds.get(name);
    if (sound) {
      sound.currentTime = 0;
      sound.play();
    }
  }

  startBackgroundMusic() {
    if (!this.isMuted && this.bgMusic) {
      this.bgMusic.play();
    }
  }

  stopBackgroundMusic() {
    this.bgMusic?.pause();
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopBackgroundMusic();
    } else {
      this.startBackgroundMusic();
    }
    return this.isMuted;
  }
}

export const soundService = new SoundService(); 