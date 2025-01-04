export const mockChallenges = [
  {
    id: 1,
    title: 'Daily Learning Sprint',
    description: 'Complete 3 lessons today',
    points: 100,
    progress: 1,
    total: 3,
    deadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
  },
  {
    id: 2,
    title: 'Coding Streak',
    description: 'Solve 5 coding challenges',
    points: 150,
    progress: 2,
    total: 5,
    deadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  }
];

export const mockCourseData = [
  {
    id: 1,
    title: 'Introduction to Programming',
    description: 'Learn the basics of programming',
    thumbnail: 'https://placehold.co/600x400',
    level: 'beginner',
    progress: 60,
    challenges: [
      {
        id: 1,
        title: 'Variables Quiz',
        type: 'quiz',
        points: 50,
        completed: false
      }
    ]
  },
  // Add more mock courses...
];

export const mockLeaderboardData = {
  global: [
    {
      id: 1,
      name: "Alex Turner",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      points: 2500,
      rank: 1,
      change: 'up'
    },
    {
      id: 2,
      name: "Lisa Park",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
      points: 2350,
      rank: 2,
      change: 'down'
    },
    {
      id: 3,
      name: "James Miller",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
      points: 2200,
      rank: 3,
      change: 'same'
    }
  ],
  course: [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      points: 850,
      rank: 1,
      change: 'up'
    },
    {
      id: 2,
      name: "Mike Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      points: 720,
      rank: 2,
      change: 'same'
    },
    {
      id: 3,
      name: "Emma Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      points: 680,
      rank: 3,
      change: 'down'
    }
  ]
};

export const mockAchievements = {
  unlocked: [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first lesson",
      icon: "Trophy",
      status: "unlocked",
      progress: 100,
      total: 100,
      xp: 50,
      dateUnlocked: "2024-03-10"
    }
  ],
  inProgress: [
    {
      id: 2,
      title: "Quick Learner",
      description: "Complete 5 lessons in a day",
      icon: "Zap",
      status: "locked",
      progress: 3,
      total: 5,
      xp: 100
    },
    {
      id: 3,
      title: "Streak Master",
      description: "Maintain a 7-day learning streak",
      icon: "Flame",
      status: "locked",
      progress: 5,
      total: 7,
      xp: 150
    },
    {
      id: 4,
      title: "Knowledge Seeker",
      description: "Complete all lessons in a course",
      icon: "BookOpen",
      status: "locked",
      progress: 8,
      total: 12,
      xp: 200
    }
  ]
}; 