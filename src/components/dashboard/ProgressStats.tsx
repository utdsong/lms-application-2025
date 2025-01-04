import { motion } from 'framer-motion';
import { Trophy, Zap, Book, Star } from 'lucide-react';

interface Props {
  stats: {
    coursesCompleted: number;
    totalPoints: number;
    currentStreak: number;
    achievements: number;
  };
}

export function ProgressStats({ stats }: Props) {
  const items = [
    {
      icon: Book,
      label: 'Courses Completed',
      value: stats.coursesCompleted,
      color: 'bg-blue-500',
    },
    {
      icon: Trophy,
      label: 'Total Points',
      value: stats.totalPoints,
      color: 'bg-green-500',
    },
    {
      icon: Zap,
      label: 'Current Streak',
      value: `${stats.currentStreak} days`,
      color: 'bg-yellow-500',
    },
    {
      icon: Star,
      label: 'Achievements',
      value: stats.achievements,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-secondary rounded-xl p-6"
        >
          <div className={`${item.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
            <item.icon className="w-6 h-6 text-white" />
          </div>
          <div className="text-sm text-gray-400">{item.label}</div>
          <div className="text-2xl font-bold mt-1">{item.value}</div>
        </motion.div>
      ))}
    </div>
  );
} 