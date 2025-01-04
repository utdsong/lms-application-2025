import { useEffect, useRef } from 'react';
import { GameConfig } from '../../../../types/course';

interface Props {
  config: GameConfig;
  onTest: (result: any) => void;
}

export function GamePreview({ config, onTest }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Reset canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw game elements based on game type
    switch (config.type) {
      case 'memory':
        drawMemoryGame(ctx, config);
        break;
      case 'sorting':
        drawSortingGame(ctx, config);
        break;
      case 'matching':
        drawMatchingGame(ctx, config);
        break;
      // Add more game types here
    }
  }, [config]);

  const drawMemoryGame = (ctx: CanvasRenderingContext2D, config: GameConfig) => {
    const cardWidth = 80;
    const cardHeight = 120;
    const padding = 10;
    let x = padding;
    let y = padding;

    config.elements.forEach((element, index) => {
      // Draw card back
      ctx.fillStyle = '#4B5563';
      ctx.fillRect(x, y, cardWidth, cardHeight);
      
      // Draw card border
      ctx.strokeStyle = '#9CA3AF';
      ctx.strokeRect(x, y, cardWidth, cardHeight);

      // Update position for next card
      x += cardWidth + padding;
      if (x + cardWidth > ctx.canvas.width) {
        x = padding;
        y += cardHeight + padding;
      }
    });
  };

  const drawSortingGame = (ctx: CanvasRenderingContext2D, config: GameConfig) => {
    // Implement sorting game preview
  };

  const drawMatchingGame = (ctx: CanvasRenderingContext2D, config: GameConfig) => {
    // Implement matching game preview
  };

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        className="bg-gray-800 rounded-lg"
      />
      <div className="absolute top-2 right-2 flex gap-2">
        <button
          onClick={() => onTest({ type: 'preview', success: true })}
          className="bg-accent px-3 py-1 rounded text-sm"
        >
          Test Game
        </button>
      </div>
    </div>
  );
} 