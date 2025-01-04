import { useState, useRef } from 'react';
import { VolumeUp, Type, Lightbulb, Mic } from 'lucide-react';

interface AdvancedFlashcardProps extends FlashcardProps {
  pronunciation?: string;
  examples?: string[];
  relatedWords?: { word: string; meaning: string }[];
}

export function AdvancedFlashcard({
  question,
  answer,
  hint,
  audio,
  pronunciation,
  examples,
  relatedWords,
  specialCharacters,
  onComplete
}: AdvancedFlashcardProps) {
  const [showExamples, setShowExamples] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  
  // ... existing flashcard code ...

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Recording logic
      setIsRecording(true);
    } catch (err) {
      console.error('Failed to start recording:', err);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      {/* ... existing flashcard UI ... */}
      
      {/* Additional Features */}
      <div className="mt-4 space-y-4">
        {pronunciation && (
          <div className="bg-[#252f44] rounded-lg p-4">
            <p className="text-gray-300">Pronunciation: {pronunciation}</p>
          </div>
        )}
        
        {examples && showExamples && (
          <div className="bg-[#252f44] rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Examples:</h4>
            <ul className="space-y-2">
              {examples.map((example, index) => (
                <li key={index} className="text-gray-300">{example}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Practice Recording Button */}
        <button
          onClick={startRecording}
          className={`p-4 rounded-full ${
            isRecording ? 'bg-red-500' : 'bg-green-500'
          }`}
        >
          <Mic className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
} 