import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  points: number;
}

interface Props {
  achievement: Achievement | null;
  onClose: () => void;
}

export function AchievementPopup({ achievement, onClose }: Props) {
  if (!achievement) return null;

  const showConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        onAnimationComplete={showConfetti}
        className="fixed inset-0 flex items-center justify-center z-50 bg-black/50"
      >
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 rounded-xl text-center max-w-md mx-4">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 1 }}
            className="w-20 h-20 mx-auto mb-4 bg-yellow-400/20 rounded-full flex items-center justify-center"
          >
            <Trophy className="w-10 h-10 text-yellow-400" />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-2">Achievement Unlocked!</h2>
            <h3 className="text-xl text-yellow-300 mb-4">{achievement.title}</h3>
            <p className="text-white/80 mb-6">{achievement.description}</p>

            <div className="flex items-center justify-center gap-2 text-yellow-300 font-bold">
              <Star className="w-5 h-5" />
              <span>+{achievement.points} XP</span>
            </div>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="mt-6 px-6 py-2 bg-white text-purple-600 rounded-lg font-bold"
          >
            Awesome!
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
} 