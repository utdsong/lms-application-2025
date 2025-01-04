import { useState, useEffect } from 'react';
import { X, Video, Code, Book, Image, Link as LinkIcon } from 'lucide-react';
import { LessonContent } from '../../../types/course';

interface Props {
  lesson: any;
  content?: LessonContent;
  onClose: () => void;
  onSave: () => void;
}

export function ContentEditor({ lesson, content, onClose, onSave }: Props) {
  const [formData, setFormData] = useState({
    type: content?.type || 'text',
    title: content?.title || '',
    content: content?.content || '',
    description: content?.description || '',
    order: content?.order || 0,
    videoUrl: content?.metadata?.videoUrl || '',
    videoType: content?.metadata?.videoType || 'youtube'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const endpoint = content 
        ? `/api/admin/lessons/${lesson.id}/content/${content.id}`
        : `/api/admin/lessons/${lesson.id}/content`;
        
      const method = content ? 'PUT' : 'POST';

      // Format content based on type
      const contentData = {
        ...formData,
        metadata: {
          videoUrl: formData.videoUrl,
          videoType: formData.videoType
        }
      };

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contentData)
      });

      if (!response.ok) throw new Error('Failed to save content');

      onSave();
      onClose();
    } catch (error) {
      console.error('Failed to save content:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-[#1B2333] rounded-xl w-full max-w-2xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">
            {content ? 'Edit Content' : 'Add Content'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Content Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600"
            >
              <option value="text">Text</option>
              <option value="video">Video</option>
              <option value="code">Code</option>
              <option value="image">Image</option>
            </select>
          </div>

          {formData.type === 'video' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Video Type</label>
                <select
                  value={formData.videoType}
                  onChange={(e) => setFormData({ ...formData, videoType: e.target.value })}
                  className="w-full p-2 rounded bg-gray-700 border border-gray-600"
                >
                  <option value="youtube">YouTube</option>
                  <option value="vimeo">Vimeo</option>
                  <option value="custom">Custom URL</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Video URL</label>
                <input
                  type="text"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  className="w-full p-2 rounded bg-gray-700 border border-gray-600"
                  placeholder="Enter video URL"
                />
              </div>
            </>
          )}

          {/* Rest of the form fields */}
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 h-20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Content</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 h-32"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600"
            >
              Save Content
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 