import { Course } from '../../services/courseService';

interface Props {
  course: Course;
}

export function ProgressTracker({ course }: Props) {
  const totalChallenges = course.challenges.length;
  const completedChallenges = course.challenges.filter(c => c.completed).length;
  const progressPercentage = (completedChallenges / totalChallenges) * 100;

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-gray-400">
        <span>Progress</span>
        <span>{completedChallenges}/{totalChallenges} Challenges</span>
      </div>
      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-accent transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
} 