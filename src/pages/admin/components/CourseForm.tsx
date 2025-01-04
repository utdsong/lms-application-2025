import { useState } from 'react';
import { X, Plus, Image as ImageIcon } from 'lucide-react';
import { Course } from '../../../types/course';

interface Props {
  course?: Course | null;
  onSave: (course: Partial<Course>) => Promise<void>;
}

export function CourseForm({ course, onSave }: Props) {
  const [formData, setFormData] = useState<Partial<Course>>(
    course || {
      title: '',
      description: '',
      level: 'beginner',
      category: '',
      thumbnail: '',
      prerequisites: [],
      learningOutcomes: [],
      status: 'draft'
    }
  );

  const [newPrerequisite, setNewPrerequisite] = useState('');
  const [newOutcome, setNewOutcome] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('/api/admin/upload', {
      method: 'POST',
      body: formData
    });

    const { url } = await response.json();
    setFormData(prev => ({ ...prev, thumbnail: url }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full bg-secondary p-2 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full bg-secondary p-2 rounded-lg h-32"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Level</label>
              <select
                value={formData.level}
                onChange={e => setFormData(prev => ({ ...prev, level: e.target.value as any }))}
                className="w-full bg-secondary p-2 rounded-lg"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full bg-secondary p-2 rounded-lg"
                required
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Thumbnail</label>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
              {formData.thumbnail ? (
                <div className="relative">
                  <img
                    src={formData.thumbnail}
                    alt="Course thumbnail"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, thumbnail: '' }))}
                    className="absolute top-2 right-2 p-1 bg-red-500 rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer">
                  <div className="flex flex-col items-center">
                    <ImageIcon className="w-12 h-12 text-gray-400" />
                    <span className="mt-2 text-sm text-gray-400">
                      Click to upload thumbnail
                    </span>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Prerequisites</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newPrerequisite}
                onChange={e => setNewPrerequisite(e.target.value)}
                className="flex-1 bg-secondary p-2 rounded-lg"
                placeholder="Add prerequisite..."
              />
              <button
                type="button"
                onClick={() => {
                  if (newPrerequisite.trim()) {
                    setFormData(prev => ({
                      ...prev,
                      prerequisites: [...(prev.prerequisites || []), newPrerequisite.trim()]
                    }));
                    setNewPrerequisite('');
                  }
                }}
                className="bg-accent p-2 rounded-lg"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.prerequisites?.map((prereq, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-secondary px-3 py-1 rounded-full"
                >
                  <span>{prereq}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        prerequisites: prev.prerequisites?.filter((_, i) => i !== index)
                      }));
                    }}
                    className="text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Learning Outcomes</label>
            {/* Similar implementation as prerequisites */}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => setFormData(course || {
            title: '',
            description: '',
            level: 'beginner',
            category: '',
            thumbnail: '',
            prerequisites: [],
            learningOutcomes: [],
            status: 'draft'
          })}
          className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-500"
        >
          Reset
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-accent hover:bg-accent/80"
        >
          {course ? 'Update Course' : 'Create Course'}
        </button>
      </div>
    </form>
  );
} 