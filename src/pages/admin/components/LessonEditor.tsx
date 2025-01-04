import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Plus, Grip, Edit, Trash, Video, Code, Book, Sparkles, Upload } from 'lucide-react';
import { ContentEditor } from './ContentEditor';
import { AIContentGenerator } from './AIContentGenerator';
import toast from 'react-hot-toast';

interface Lesson {
  id: string;
  title: string;
  content: any[];
}

export function LessonEditor({ course, onUpdate }) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [showContentEditor, setShowContentEditor] = useState(false);
  const [showAIHelper, setShowAIHelper] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Load lessons
  useEffect(() => {
    if (course) {
      loadLessons();
    }
  }, [course]);

  const loadLessons = async () => {
    try {
      const response = await fetch(`/api/admin/courses/${course.id}/lessons`);
      const data = await response.json();
      setLessons(data);
    } catch (error) {
      toast.error('Failed to load lessons');
    }
  };

  const handleVideoUpload = async (file: File, lessonId: string) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('video', file);

      const response = await fetch(`/api/admin/lessons/${lessonId}/video`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      toast.success('Video uploaded successfully');
      loadLessons();
    } catch (error) {
      toast.error('Failed to upload video');
    } finally {
      setUploading(false);
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const items = Array.from(lessons);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update order in backend
    try {
      await fetch(`/api/admin/courses/${course.id}/lessons/reorder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessons: items.map((item, index) => ({
          id: item.id,
          order: index
        }))})
      });

      setLessons(items);
    } catch (error) {
      toast.error('Failed to reorder lessons');
    }
  };

  return (
    <div className="grid grid-cols-4 gap-6">
      {/* Lessons Sidebar */}
      <div className="col-span-1 bg-[#1B2333] rounded-xl p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">Lessons</h3>
          <button
            onClick={() => setShowContentEditor(true)}
            className="p-2 bg-blue-500 hover:bg-blue-600 rounded-lg"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="lessons">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {lessons.map((lesson, index) => (
                  <Draggable key={lesson.id} draggableId={lesson.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`mb-2 p-3 rounded-lg cursor-pointer ${
                          selectedLesson?.id === lesson.id
                            ? 'bg-blue-500'
                            : 'bg-gray-800/50 hover:bg-gray-700'
                        }`}
                        onClick={() => setSelectedLesson(lesson)}
                      >
                        <div className="flex items-center gap-2">
                          <div {...provided.dragHandleProps}>
                            <Grip className="w-4 h-4 text-gray-400" />
                          </div>
                          <span className="text-sm text-white">{lesson.title}</span>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      {/* Content Area */}
      <div className="col-span-3 bg-[#1B2333] rounded-xl p-6">
        {selectedLesson ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">{selectedLesson.title}</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowAIHelper(true)}
                  className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  AI Assistant
                </button>
                <label className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer">
                  <Upload className="w-5 h-5" />
                  Upload Video
                  <input
                    type="file"
                    className="hidden"
                    accept="video/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleVideoUpload(file, selectedLesson.id);
                    }}
                  />
                </label>
              </div>
            </div>

            {/* Content list */}
            {/* ... Rest of the content rendering code ... */}
          </>
        ) : (
          <div className="text-center text-gray-400 py-12">
            Select a lesson to edit its content
          </div>
        )}
      </div>

      {/* Modals */}
      {showContentEditor && (
        <ContentEditor
          lesson={selectedLesson}
          onClose={() => setShowContentEditor(false)}
          onSave={loadLessons}
        />
      )}

      {showAIHelper && (
        <AIContentGenerator
          onGenerate={handleAIGenerated}
          onClose={() => setShowAIHelper(false)}
        />
      )}
    </div>
  );
} 