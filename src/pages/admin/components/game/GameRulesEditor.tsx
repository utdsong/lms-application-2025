import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { GameRule } from '../../../../types/course';

interface Props {
  rules: GameRule[];
  onChange: (rules: GameRule[]) => void;
}

export function GameRulesEditor({ rules, onChange }: Props) {
  const [newRule, setNewRule] = useState<Partial<GameRule>>({
    condition: '',
    action: '',
    points: 10
  });

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Game Rules</h3>

      <div className="grid grid-cols-3 gap-2">
        <input
          type="text"
          placeholder="Condition (e.g., match_found)"
          value={newRule.condition}
          onChange={e => setNewRule(prev => ({ ...prev, condition: e.target.value }))}
          className="bg-gray-600 p-2 rounded-lg"
        />
        <input
          type="text"
          placeholder="Action (e.g., add_points)"
          value={newRule.action}
          onChange={e => setNewRule(prev => ({ ...prev, action: e.target.value }))}
          className="bg-gray-600 p-2 rounded-lg"
        />
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Points"
            value={newRule.points}
            onChange={e => setNewRule(prev => ({ ...prev, points: parseInt(e.target.value) }))}
            className="bg-gray-600 p-2 rounded-lg w-24"
          />
          <button
            onClick={() => {
              if (newRule.condition && newRule.action) {
                onChange([...rules, newRule as GameRule]);
                setNewRule({ condition: '', action: '', points: 10 });
              }
            }}
            className="bg-accent p-2 rounded-lg"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {rules.map((rule, index) => (
          <div
            key={index}
            className="bg-gray-600 p-3 rounded-lg flex items-center gap-3"
          >
            <div className="grid grid-cols-3 flex-1 gap-4">
              <div className="text-sm">
                <span className="text-gray-400">When: </span>
                {rule.condition}
              </div>
              <div className="text-sm">
                <span className="text-gray-400">Do: </span>
                {rule.action}
              </div>
              <div className="text-sm">
                <span className="text-gray-400">Points: </span>
                {rule.points}
              </div>
            </div>
            <button
              onClick={() => onChange(rules.filter((_, i) => i !== index))}
              className="text-red-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 