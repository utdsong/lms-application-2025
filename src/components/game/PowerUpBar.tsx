import { Clock, Shield, Zap, Brain } from 'lucide-react';

type PowerUpType = 'time' | 'shield' | 'multiplier' | 'hint';

interface PowerUp {
  type: PowerUpType;
  icon: React.ElementType;
  label: string;
  description: string;
}

interface Props {
  onUsePowerUp: (type: PowerUpType) => void;
}

const powerUps: PowerUp[] = [
  {
    type: 'time',
    icon: Clock,
    label: 'Time Freeze',
    description: 'Pause the timer for 30 seconds'
  },
  {
    type: 'shield',
    icon: Shield,
    label: 'Shield',
    description: 'Protect against one wrong answer'
  },
  {
    type: 'multiplier',
    icon: Zap,
    label: '2x Points',
    description: 'Double points for next challenge'
  },
  {
    type: 'hint',
    icon: Brain,
    label: 'Hint',
    description: 'Get a helpful hint'
  }
];

export function PowerUpBar({ onUsePowerUp }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {powerUps.map((powerUp) => (
        <button
          key={powerUp.type}
          onClick={() => onUsePowerUp(powerUp.type)}
          className="bg-secondary p-4 rounded-lg hover:bg-white/5 transition-colors"
        >
          <div className="flex flex-col items-center text-center">
            <powerUp.icon className="w-8 h-8 mb-2 text-accent" />
            <span className="font-semibold mb-1">{powerUp.label}</span>
            <span className="text-sm text-gray-400">{powerUp.description}</span>
          </div>
        </button>
      ))}
    </div>
  );
} 