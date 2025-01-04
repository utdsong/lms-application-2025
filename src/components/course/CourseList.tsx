import { Book, Code, Star, ArrowRight, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Course {
  id: number;
  title: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  icon: any;
  color: string;
  lastLesson?: string;
  slug: string;
  description: string;
}

export function CourseList() {
  const navigate = useNavigate();

  const courses: Course[] = [
    {
      id: 1,
      title: "Introduction to Programming",
      progress: 75,
      totalLessons: 12,
      completedLessons: 9,
      icon: Code,
      color: "text-blue-500",
      lastLesson: "Functions and Methods",
      slug: "intro-to-programming",
      description: "Learn the fundamentals of programming with Python"
    },
    {
      id: 2,
      title: "Speak French From Day 1",
      progress: 0,
      totalLessons: 30,
      completedLessons: 0,
      icon: Book,
      color: "text-purple-500",
      slug: "french-speaking",
      description: "Master French conversation in 30 days"
    },
    {
      id: 3,
      title: "Web Development Basics",
      progress: 45,
      totalLessons: 10,
      completedLessons: 4,
      icon: Book,
      color: "text-blue-500",
      lastLesson: "CSS Layouts",
      slug: "web-development-basics",
      description: "Learn the basics of web development"
    },
    {
      id: 4,
      title: "Advanced JavaScript",
      progress: 0,
      totalLessons: 15,
      completedLessons: 0,
      icon: Star,
      color: "text-yellow-500",
      slug: "advanced-javascript",
      description: "Master advanced JavaScript concepts"
    }
  ];

  const handleCourseClick = (course: Course) => {
    if (course.progress === 0) {
      navigate(`/course/${course.slug}/lesson/1`);
    } else {
      const nextLesson = course.completedLessons + 1;
      navigate(`/course/${course.slug}/lesson/${nextLesson}`);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {courses.map(course => (
        <div key={course.id} className="bg-[#1B2333] rounded-xl p-5 shadow-lg shadow-blue-500/5">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 bg-opacity-20 rounded-lg ${course.color.replace('text', 'bg')}`}>
                <course.icon className={`w-5 h-5 ${course.color}`} />
              </div>
              <div>
                <h3 className="font-medium text-white">{course.title}</h3>
                <p className="text-sm text-gray-400 mt-1">
                  {course.lastLesson ? `Last: ${course.lastLesson}` : course.description}
                </p>
              </div>
            </div>
            <span className={`text-sm font-medium ${course.color}`}>
              {course.progress}% Complete
            </span>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="bg-gray-700/50 h-2 rounded-full">
                <div 
                  className={`h-full rounded-full ${course.color.replace('text', 'bg')}`}
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>{course.completedLessons}/{course.totalLessons} Lessons</span>
              </div>
            </div>

            <button 
              onClick={() => handleCourseClick(course)}
              className={`w-full py-2 px-4 rounded-lg flex items-center justify-center gap-2 
                ${course.progress === 0 
                  ? 'bg-blue-500 hover:bg-blue-600' 
                  : 'bg-[#1d283a] hover:bg-[#252f44]'} 
                transition-colors`}
            >
              {course.progress === 0 ? (
                <>
                  <Play className="w-4 h-4" />
                  <span>Start Learning</span>
                </>
              ) : (
                <>
                  <ArrowRight className="w-4 h-4" />
                  <span>Continue Learning</span>
                </>
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
} 