import { useState, useEffect } from 'react';
import { Trophy, Star, Target, Zap, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const achievements: Achievement[] = [
  {
    id: 'first_win',
    title: 'First Victory',
    description: 'Complete your first challenge',
    icon: Trophy,
    progress: 1,
    maxProgress: 1,
    unlocked: true,
    rarity: 'common'
  },
  {
    id: 'streak_master',
    title: 'Streak Master',
    description: 'Maintain a 5-challenge streak',
    icon: Zap,
    progress: 3,
    maxProgress: 5,
    unlocked: false,
    rarity: 'rare'
  },
  // Add more achievements...
];

export function AchievementSystem() {
  const [showNotification, setShowNotification] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null);

  const unlockAchievement = (achievement: Achievement) => {
    setCurrentAchievement(achievement);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div>
      {/* Achievement List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`bg-secondary p-4 rounded-lg ${
              achievement.unlocked ? 'opacity-100' : 'opacity-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <achievement.icon className={`w-8 h-8 ${
                achievement.rarity === 'legendary' ? 'text-yellow-500' :
                achievement.rarity === 'epic' ? 'text-purple-500' :
                achievement.rarity === 'rare' ? 'text-blue-500' :
                'text-gray-400'
              }`} />
              <div>
                <h3 className="font-bold">{achievement.title}</h3>
                <p className="text-sm text-gray-400">{achievement.description}</p>
              </div>
            </div>
            {!achievement.unlocked && (
              <div className="mt-3">
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all duration-500"
                    style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {achievement.progress}/{achievement.maxProgress}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Achievement Notification */}
      <AnimatePresence>
        {showNotification && currentAchievement && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed bottom-4 right-4 bg-secondary p-4 rounded-lg shadow-lg"
          >
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-yellow-500" />
              <div>
                <h4 className="font-bold">Achievement Unlocked!</h4>
                <p className="text-sm text-gray-400">{currentAchievement.title}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 