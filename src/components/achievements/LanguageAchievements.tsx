import { Trophy, Star, Clock } from 'lucide-react';

const ACHIEVEMENTS = [
  {
    id: 'first-words',
    title: 'First Words',
    description: 'Complete your first French lesson',
    icon: Trophy,
    requirement: 1,
    xp: 100
  },
  {
    id: 'conversation-starter',
    title: 'Conversation Starter',
    description: 'Complete all basic greeting lessons',
    icon: Star,
    requirement: 5,
    xp: 250
  },
  {
    id: 'daily-learner',
    title: 'Daily Learner',
    description: 'Study French for 7 consecutive days',
    icon: Clock,
    requirement: 7,
    xp: 500
  }
];

export function LanguageAchievements() {
  // Implementation
} 