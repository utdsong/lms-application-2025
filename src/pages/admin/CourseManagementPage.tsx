import { useState, useEffect } from 'react';
import { Plus, Sparkles } from 'lucide-react';
import { Course } from '../../types/course';
import { CourseForm } from './components/CourseForm';
import { LessonEditor } from './components/LessonEditor';
import toast from 'react-hot-toast';

export function CourseManagementPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [showAIHelper, setShowAIHelper] = useState(false);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const response = await fetch('/api/admin/courses');
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      toast.error('Failed to load courses');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Course Management</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setShowAIHelper(true)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            AI Assistant
          </button>
          <button
            onClick={() => setShowCourseForm(true)}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Course
          </button>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-[#1B2333] rounded-xl overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500/50 transition-all"
            onClick={() => setSelectedCourse(course)}
          >
            {course.thumbnail && (
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="font-bold text-white mb-2">{course.title}</h3>
              <p className="text-sm text-gray-400 mb-4">{course.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                  {course.lessons?.length || 0} Lessons
                </span>
                <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">
                  {course.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Course Form Modal */}
      {showCourseForm && (
        <CourseForm
          onClose={() => setShowCourseForm(false)}
          onSave={() => {
            loadCourses();
            setShowCourseForm(false);
          }}
        />
      )}

      {/* Lesson Editor Modal */}
      {selectedCourse && (
        <LessonEditor
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
          onUpdate={loadCourses}
        />
      )}
    </div>
  );
} 