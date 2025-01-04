import { motion } from 'framer-motion';
import { Trophy, Star, Gift, Crown, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  type: 'achievement' | 'milestone' | 'special';
  title: string;
  description: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  onClaim: () => void;
}

export function SpecialReward({ type, title, description, rarity, onClaim }: Props) {
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    onClaim();
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={`relative bg-secondary p-6 rounded-xl ${
        rarity === 'legendary' ? 'border-2 border-yellow-500' :
        rarity === 'epic' ? 'border-2 border-purple-500' :
        ''
      }`}
    >
      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-50"
      />

      <div className="relative z-10">
        <div className="flex justify-center mb-4">
          {type === 'achievement' && <Trophy className="w-16 h-16 text-yellow-500" />}
          {type === 'milestone' && <Crown className="w-16 h-16 text-purple-500" />}
          {type === 'special' && <Sparkles className="w-16 h-16 text-blue-500" />}
        </div>

        <h2 className="text-2xl font-bold text-center mb-2">{title}</h2>
        <p className="text-gray-400 text-center mb-6">{description}</p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={triggerConfetti}
          className="w-full bg-accent hover:bg-accent/80 p-3 rounded-lg font-bold"
        >
          Claim Reward
        </motion.button>
      </div>

      {/* Floating particles effect */}
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      >
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`absolute w-4 h-4 ${
              rarity === 'legendary' ? 'text-yellow-500' :
              rarity === 'epic' ? 'text-purple-500' :
              'text-blue-500'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.5,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
} 