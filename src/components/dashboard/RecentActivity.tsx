import { motion } from 'framer-motion';
import { GamepadIcon, Book, Trophy, Star } from 'lucide-react';

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: 'game',
      title: 'Memory Match',
      description: 'Completed with high score',
      icon: GamepadIcon,
      color: 'bg-blue-500',
      timestamp: '2h ago',
    },
    {
      id: 2,
      type: 'course',
      title: 'JavaScript Basics',
      description: 'Completed Module 3',
      icon: Book,
      color: 'bg-green-500',
      timestamp: '4h ago',
    },
    {
      id: 3,
      type: 'achievement',
      title: 'Quick Learner',
      description: 'Earned new badge',
      icon: Trophy,
      color: 'bg-yellow-500',
      timestamp: '1d ago',
    },
  ];

  return (
    <div className="bg-secondary rounded-xl p-6">
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-4"
          >
            <div className={`${activity.color} p-2 rounded-lg`}>
              <activity.icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="font-medium">{activity.title}</div>
              <div className="text-sm text-gray-400">{activity.description}</div>
            </div>
            <div className="text-sm text-gray-400">{activity.timestamp}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 