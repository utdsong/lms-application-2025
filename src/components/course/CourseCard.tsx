import { motion } from 'framer-motion';
import { Book, Clock, Award } from 'lucide-react';

interface Props {
  course: {
    id: string;
    title: string;
    description: string;
    duration: string;
    level: string;
    progress: number;
  };
  onClick: () => void;
}

export function CourseCard({ course, onClick }: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-secondary rounded-xl p-6 cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="bg-blue-500 p-2 rounded-lg">
          <Book className="w-5 h-5" />
        </div>
        <div className="text-sm font-medium px-2 py-1 rounded bg-gray-700">
          {course.level}
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
      <p className="text-sm text-gray-400 mb-4">{course.description}</p>

      <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {course.duration}
        </div>
        <div className="flex items-center gap-1">
          <Award className="w-4 h-4" />
          {course.level}
        </div>
      </div>

      <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${course.progress}%` }}
          className="absolute inset-y-0 left-0 bg-accent"
        />
      </div>
      <div className="mt-2 text-sm text-gray-400">
        {course.progress}% Complete
      </div>
    </motion.div>
  );
} 