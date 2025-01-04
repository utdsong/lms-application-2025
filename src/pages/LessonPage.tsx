import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import ReactPlayer from 'react-player';
import ReactMarkdown from 'react-markdown';
import { ChevronDown, ChevronUp, CheckCircle, Circle } from 'lucide-react';
import { courses } from '../data/curriculum';
import { QuizSection } from '../components/lesson/QuizSection';

export function LessonPage() {
  const { courseSlug } = useParams();
  const { userProgress } = useProgress();
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState<'objectives' | 'content' | 'video' | 'quiz'>('objectives');

  const course = courses.find(c => c.slug === courseSlug);

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-[#1B2333] rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <Link to="/" className="text-blue-500 hover:text-blue-400">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Course Header - Always visible */}
      <div className="bg-[#1B2333] rounded-xl p-6 mb-6">
        <h1 className="text-2xl font-bold text-white">{course.title}</h1>
        <p className="text-gray-400 mt-2">{course.description}</p>
      </div>

      {/* Weekly Modules - Always visible */}
      <div className="space-y-4">
        {course.modules.map((module, index) => (
          <div key={module.id} className="bg-[#1B2333] rounded-xl">
            {/* Week Header - Always visible */}
            <div className="px-6 py-4 flex items-center justify-between border-b border-[#252f44]">
              <h2 className="text-lg font-semibold text-white">{module.title}</h2>
              <button
                onClick={() => setExpandedWeek(expandedWeek === module.id ? null : module.id)}
                className="p-2 hover:bg-[#252f44] rounded-lg transition-colors"
              >
                {expandedWeek === module.id ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>

            {/* Week Content - Expandable */}
            {expandedWeek === module.id && (
              <div className="p-6">
                {module.lessons.map(lesson => (
                  <div key={lesson.id} className="mt-4 first:mt-0">
                    <div className="bg-[#252f44] rounded-lg p-4">
                      <h3 className="text-white font-medium mb-4">{lesson.title}</h3>
                      
                      {/* Section Navigation */}
                      <div className="flex flex-wrap gap-4 mb-6">
                        {['objectives', 'content', 'video', 'quiz'].map(section => (
                          <button
                            key={section}
                            onClick={() => setActiveSection(section as any)}
                            className={`px-4 py-2 rounded-lg transition-colors
                              ${activeSection === section 
                                ? 'bg-blue-500 text-white' 
                                : 'text-gray-400 hover:bg-[#2a3547]'}`}
                          >
                            {section.charAt(0).toUpperCase() + section.slice(1)}
                          </button>
                        ))}
                      </div>

                      {/* Content Sections */}
                      <div className="mt-4">
                        {activeSection === 'objectives' && lesson.objectives && (
                          <div className="space-y-2">
                            {lesson.objectives.map(objective => (
                              <div key={objective.id} className="flex items-start gap-2 text-gray-300">
                                <Circle className="w-4 h-4 mt-1" />
                                <span>{objective.description}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {activeSection === 'content' && (
                          <div className="prose prose-invert max-w-none">
                            <ReactMarkdown>{lesson.content}</ReactMarkdown>
                          </div>
                        )}

                        {activeSection === 'video' && lesson.video && (
                          <div className="aspect-video">
                            <ReactPlayer
                              url={lesson.video.url}
                              width="100%"
                              height="100%"
                              controls
                            />
                          </div>
                        )}

                        {activeSection === 'quiz' && lesson.quiz && (
                          <QuizSection 
                            quiz={lesson.quiz}
                            onComplete={async () => {
                              // Handle quiz completion
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 