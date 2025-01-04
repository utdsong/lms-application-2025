import { motion } from 'framer-motion';
import { Trophy, Star, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  course: {
    title: string;
    points: number;
    achievements: string[];
  };
  onClose: () => void;
  onShare: () => void;
}

export function CourseCompletion({ course, onClose, onShare }: Props) {
  const fireworks = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        particleCount,
        spread: 60,
        origin: { x: Math.random(), y: Math.random() * 0.3 + 0.5 }
      });
    }, 250);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onAnimationComplete={fireworks}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 p-4"
    >
      <motion.div
        initial={{ scale: 0.5, y: 100 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-gradient-to-b from-purple-600 to-blue-600 p-8 rounded-xl max-w-lg w-full text-center"
      >
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-24 h-24 mx-auto mb-6 bg-yellow-400/20 rounded-full flex items-center justify-center"
        >
          <Trophy className="w-12 h-12 text-yellow-400" />
        </motion.div>

        <h2 className="text-3xl font-bold mb-4">Congratulations!</h2>
        <p className="text-xl mb-6">
          You've completed <span className="text-yellow-300">{course.title}</span>
        </p>

        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="text-center">
            <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <p className="text-sm text-white/80">Points Earned</p>
            <p className="text-lg font-bold">{course.points} XP</p>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onShare}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg flex items-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            Share
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="px-6 py-3 bg-white text-purple-600 rounded-lg font-bold"
          >
            Continue Learning
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
} 