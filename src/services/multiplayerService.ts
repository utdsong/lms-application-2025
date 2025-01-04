import { io, Socket } from 'socket.io-client';
import { Challenge } from './courseService';

interface GameState {
  roomId: string;
  players: {
    id: string;
    username: string;
    ready: boolean;
    progress: number;
  }[];
  challenge: Challenge;
  startTime?: number;
}

class MultiplayerService {
  private socket: Socket;
  private gameState: GameState | null = null;
  private stateListeners: ((state: GameState) => void)[] = [];

  constructor() {
    this.socket = io(import.meta.env.VITE_WS_URL, {
      auth: {
        token: localStorage.getItem('token')
      }
    });

    this.socket.on('gameState', (state: GameState) => {
      this.gameState = state;
      this.notifyListeners();
    });
  }

  joinRoom(challengeId: string) {
    this.socket.emit('joinRoom', { challengeId });
  }

  leaveRoom() {
    this.socket.emit('leaveRoom');
  }

  setReady(ready: boolean) {
    this.socket.emit('playerReady', { ready });
  }

  updateProgress(progress: number) {
    this.socket.emit('updateProgress', { progress });
  }

  onStateChange(callback: (state: GameState) => void) {
    this.stateListeners.push(callback);
    if (this.gameState) {
      callback(this.gameState);
    }
  }

  private notifyListeners() {
    if (this.gameState) {
      this.stateListeners.forEach(listener => listener(this.gameState!));
    }
  }
}

export const multiplayerService = new MultiplayerService(); 