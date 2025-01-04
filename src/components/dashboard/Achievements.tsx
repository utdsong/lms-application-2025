import { motion } from 'framer-motion';
import { Star, Trophy, Zap, Target } from 'lucide-react';

export function Achievements() {
  const achievements = [
    {
      id: 1,
      title: 'First Victory',
      description: 'Complete your first game',
      icon: Trophy,
      color: 'bg-yellow-500',
      unlocked: true,
    },
    {
      id: 2,
      title: 'Quick Learner',
      description: 'Complete 5 lessons in a day',
      icon: Zap,
      color: 'bg-blue-500',
      unlocked: true,
    },
    {
      id: 3,
      title: 'Sharpshooter',
      description: 'Get 100% accuracy in a game',
      icon: Target,
      color: 'bg-green-500',
      unlocked: false,
    },
    {
      id: 4,
      title: 'Master Mind',
      description: 'Complete all advanced courses',
      icon: Star,
      color: 'bg-purple-500',
      unlocked: false,
    },
  ];

  return (
    <div className="bg-secondary rounded-xl p-6">
      <div className="grid grid-cols-2 gap-4">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-lg ${
              achievement.unlocked ? achievement.color : 'bg-gray-700'
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <achievement.icon className={`w-5 h-5 ${
                achievement.unlocked ? 'text-white' : 'text-gray-400'
              }`} />
              <div className={`font-medium ${
                achievement.unlocked ? 'text-white' : 'text-gray-400'
              }`}>
                {achievement.title}
              </div>
            </div>
            <div className={`text-sm ${
              achievement.unlocked ? 'text-white/80' : 'text-gray-500'
            }`}>
              {achievement.description}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 