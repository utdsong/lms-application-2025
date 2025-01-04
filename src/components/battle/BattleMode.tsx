import { useState, useEffect } from 'react';
import { Sword, Shield, Heart, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Challenge } from '../../services/courseService';

interface Props {
  challenge: Challenge;
  opponent: {
    id: string;
    username: string;
    rank: string;
  };
  onComplete: (won: boolean) => void;
}

export function BattleMode({ challenge, opponent, onComplete }: Props) {
  const [timeLeft, setTimeLeft] = useState(challenge.time_limit);
  const [playerHealth, setPlayerHealth] = useState(100);
  const [opponentHealth, setOpponentHealth] = useState(100);
  const [battleLog, setBattleLog] = useState<string[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(t => Math.max(0, t - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const attack = () => {
    const damage = Math.floor(Math.random() * 20) + 10;
    setOpponentHealth(h => Math.max(0, h - damage));
    setBattleLog(log => [...log, `You dealt ${damage} damage!`]);

    // Opponent counter-attack
    setTimeout(() => {
      const counterDamage = Math.floor(Math.random() * 15) + 5;
      setPlayerHealth(h => Math.max(0, h - counterDamage));
      setBattleLog(log => [...log, `Opponent dealt ${counterDamage} damage!`]);
    }, 1000);
  };

  const defend = () => {
    const heal = Math.floor(Math.random() * 10) + 5;
    setPlayerHealth(h => Math.min(100, h + heal));
    setBattleLog(log => [...log, `You restored ${heal} health!`]);
  };

  return (
    <div className="bg-secondary p-6 rounded-xl">
      {/* Battle Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div>
            <h3 className="font-bold">You</h3>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-500" />
              <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-red-500"
                  animate={{ width: `${playerHealth}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="text-xl font-mono">
          <Clock className="w-5 h-5 inline mr-2" />
          {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <h3 className="font-bold">{opponent.username}</h3>
            <div className="flex items-center gap-2">
              <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-red-500"
                  animate={{ width: `${opponentHealth}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              </div>
              <Heart className="w-4 h-4 text-red-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Battle Actions */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={attack}
          className="flex-1 bg-red-500/20 hover:bg-red-500/30 p-4 rounded-lg"
        >
          <Sword className="w-6 h-6 mx-auto mb-2" />
          Attack
        </button>
        <button
          onClick={defend}
          className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 p-4 rounded-lg"
        >
          <Shield className="w-6 h-6 mx-auto mb-2" />
          Defend
        </button>
      </div>

      {/* Battle Log */}
      <div className="h-32 overflow-y-auto bg-gray-800/50 rounded-lg p-2">
        {battleLog.map((log, index) => (
          <p key={index} className="text-sm text-gray-400">{log}</p>
        ))}
      </div>
    </div>
  );
} 