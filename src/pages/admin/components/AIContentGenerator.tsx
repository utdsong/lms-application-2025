import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

interface Props {
  onGenerate: (content: string) => void;
  onClose: () => void;
}

export function AIContentGenerator({ onGenerate, onClose }: Props) {
  const [topic, setTopic] = useState('');
  const [type, setType] = useState<'outline' | 'quiz' | 'enhance'>('outline');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/admin/ai/${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic,
          count: type === 'quiz' ? 5 : undefined,
        }),
      });

      const data = await response.json();
      
      if (data.choices?.[0]?.message?.content) {
        onGenerate(data.choices[0].message.content);
        onClose();
      }
    } catch (error) {
      console.error('AI generation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-[#1B2333] rounded-lg w-full max-w-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <h2 className="text-xl font-semibold">AI Content Generator</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Generation Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600"
            >
              <option value="outline">Lesson Outline</option>
              <option value="quiz">Quiz Questions</option>
              <option value="enhance">Enhance Content</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Topic/Content</label>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 h-32"
              placeholder={
                type === 'outline'
                  ? 'Enter the topic for the lesson outline...'
                  : type === 'quiz'
                  ? 'Enter the topic for quiz questions...'
                  : 'Enter the content to enhance...'
              }
              required
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded bg-purple-500 hover:bg-purple-600 disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 