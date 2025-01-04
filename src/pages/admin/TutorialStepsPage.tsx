import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Plus, Grip, Edit, Trash } from 'lucide-react';

interface TutorialStep {
  id: string;
  title: string;
  content: string;
  order: number;
}

export function TutorialStepsPage() {
  const [steps, setSteps] = useState<TutorialStep[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSteps();
  }, []);

  const loadSteps = async () => {
    try {
      const response = await fetch('/api/admin/tutorial-steps');
      const data = await response.json();
      setSteps(data);
    } catch (error) {
      console.error('Failed to load tutorial steps:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Tutorial Steps</h1>
        <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Step
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-400">Loading...</div>
      ) : (
        <div className="bg-[#1B2333] rounded-xl p-6">
          {steps.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              No tutorial steps found. Create your first one!
            </div>
          ) : (
            <div className="space-y-4">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg"
                >
                  <Grip className="w-5 h-5 text-gray-500" />
                  <div className="flex-1">
                    <h3 className="font-medium text-white">{step.title}</h3>
                    <p className="text-sm text-gray-400">{step.content}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-700 rounded-lg">
                      <Edit className="w-5 h-5 text-blue-400" />
                    </button>
                    <button className="p-2 hover:bg-gray-700 rounded-lg">
                      <Trash className="w-5 h-5 text-red-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
} 