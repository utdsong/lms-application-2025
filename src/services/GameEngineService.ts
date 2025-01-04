import { GameConfig, GameElement, GameRule } from '../types/course';

export class GameEngineService {
  private config: GameConfig;
  private elements: GameElement[];
  private rules: GameRule[];
  private score: number = 0;
  private startTime: number = 0;
  private gameState: 'ready' | 'playing' | 'paused' | 'completed' = 'ready';
  private eventListeners: { [key: string]: Function[] } = {};

  constructor(config: GameConfig) {
    this.config = config;
    this.elements = config.elements;
    this.rules = config.rules;
  }

  public start(): void {
    this.gameState = 'playing';
    this.startTime = Date.now();
    this.score = 0;
    this.emit('gameStart', { timestamp: this.startTime });
  }

  public pause(): void {
    if (this.gameState === 'playing') {
      this.gameState = 'paused';
      this.emit('gamePause', { timestamp: Date.now() });
    }
  }

  public resume(): void {
    if (this.gameState === 'paused') {
      this.gameState = 'playing';
      this.emit('gameResume', { timestamp: Date.now() });
    }
  }

  public handleInteraction(elementId: string, action: string): void {
    if (this.gameState !== 'playing') return;

    const element = this.elements.find(e => e.id === elementId);
    if (!element) return;

    // Process game rules
    this.rules.forEach(rule => {
      if (this.evaluateCondition(rule.condition, { element, action })) {
        this.applyAction(rule.action, rule.points);
      }
    });
  }

  private evaluateCondition(condition: string, context: any): boolean {
    // Implement condition evaluation logic
    const [type, ...params] = condition.split('_');
    
    switch (type) {
      case 'match':
        return this.evaluateMatch(params, context);
      case 'sequence':
        return this.evaluateSequence(params, context);
      case 'time':
        return this.evaluateTime(params);
      default:
        return false;
    }
  }

  private applyAction(action: string, points: number): void {
    const [type, ...params] = action.split('_');

    switch (type) {
      case 'add':
        this.score += points;
        this.emit('scoreUpdate', { score: this.score });
        break;
      case 'complete':
        this.completeGame();
        break;
      case 'unlock':
        this.unlockElement(params[0]);
        break;
    }
  }

  private completeGame(): void {
    this.gameState = 'completed';
    const endTime = Date.now();
    const duration = endTime - this.startTime;

    const result = {
      score: this.score,
      time: duration / 1000, // Convert to seconds
      completed: true
    };

    this.emit('gameComplete', result);
  }

  public on(event: string, callback: Function): void {
    if (!this.eventListeners[event]) {
      this.eventListeners[event] = [];
    }
    this.eventListeners[event].push(callback);
  }

  private emit(event: string, data: any): void {
    if (this.eventListeners[event]) {
      this.eventListeners[event].forEach(callback => callback(data));
    }
  }

  // Additional helper methods for specific game types
  private evaluateMatch(params: string[], context: any): boolean {
    // Implement match evaluation logic
    return false;
  }

  private evaluateSequence(params: string[], context: any): boolean {
    // Implement sequence evaluation logic
    return false;
  }

  private evaluateTime(params: string[]): boolean {
    // Implement time-based evaluation logic
    return false;
  }

  private unlockElement(elementId: string): void {
    // Implement element unlocking logic
  }
} 