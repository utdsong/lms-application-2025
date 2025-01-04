import { useState } from 'react';
import { Play, Mic, RotateCw } from 'lucide-react';

interface DialogueLine {
  speaker: string;
  text: string;
  translation: string;
  audio: string;
}

interface ConversationProps {
  title: string;
  dialogue: DialogueLine[];
  context: string;
}

export function ConversationPractice({
  title,
  dialogue,
  context
}: ConversationProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  return (
    <div className="bg-[#1B2333] rounded-xl p-6">
      <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
      <p className="text-gray-400 mb-6">{context}</p>

      <div className="space-y-4">
        {dialogue.map((line, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              index === currentLine
                ? 'bg-blue-500/20 border border-blue-500'
                : 'bg-[#252f44]'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-gray-400">{line.speaker}</span>
              <button
                onClick={() => {/* Play audio */}}
                className="p-2 hover:bg-[#2a3547] rounded-full"
              >
                <Play className="w-4 h-4 text-white" />
              </button>
            </div>
            <p className="text-white">{line.text}</p>
            {showTranslation && (
              <p className="text-gray-400 mt-2">{line.translation}</p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={() => setShowTranslation(!showTranslation)}
          className="px-4 py-2 bg-[#252f44] text-white rounded-lg"
        >
          {showTranslation ? 'Hide' : 'Show'} Translation
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentLine(prev => Math.max(0, prev - 1))}
            className="p-2 bg-[#252f44] rounded-lg"
          >
            <RotateCw className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={() => setIsRecording(!isRecording)}
            className={`p-2 rounded-lg ${
              isRecording ? 'bg-red-500' : 'bg-green-500'
            }`}
          >
            <Mic className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
} 