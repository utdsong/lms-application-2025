import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { BaseGame } from './BaseGame';
import { GameConfig } from '../../types/course';

interface Props {
  config: GameConfig;
  onComplete: (result: any) => void;
}

export function CodeChallenge({ config, onComplete }: Props) {
  const [code, setCode] = useState(config.initialCode || '');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const runCode = async () => {
    setIsRunning(true);
    try {
      const result = await evaluateCode(code, config.testCases);
      setOutput(result.output);
      
      if (result.passed) {
        engine.handleInteraction('code', 'success');
      }
    } catch (error) {
      setOutput(error.message);
    }
    setIsRunning(false);
  };

  return (
    <BaseGame config={config} onComplete={onComplete}>
      <div className="grid grid-cols-2 gap-4 h-[500px]">
        <div className="space-y-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Challenge</h3>
            <div className="prose prose-invert">
              {config.description}
            </div>
          </div>

          <Editor
            height="300px"
            defaultLanguage="javascript"
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || '')}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
            }}
          />
        </div>

        <div className="space-y-4">
          <div className="bg-gray-800 p-4 rounded-lg h-full">
            <h3 className="text-lg font-medium mb-2">Output</h3>
            <pre className="font-mono text-sm whitespace-pre-wrap">
              {output || 'Run your code to see output'}
            </pre>
          </div>

          <button
            onClick={runCode}
            disabled={isRunning}
            className="w-full py-2 bg-accent rounded-lg disabled:opacity-50"
          >
            {isRunning ? 'Running...' : 'Run Code'}
          </button>
        </div>
      </div>
    </BaseGame>
  );
} 