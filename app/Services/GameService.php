<?php

namespace App\Services;

use App\Models\Challenge;
use App\Models\GameElement;
use Illuminate\Support\Facades\DB;

class GameService
{
    public function createChallenge(array $data)
    {
        return DB::transaction(function () use ($data) {
            $challenge = Challenge::create([
                'lesson_id' => $data['lesson_id'],
                'title' => $data['title'],
                'description' => $data['description'],
                'type' => $data['type'],
                'difficulty' => $data['difficulty'],
                'points' => $data['points'],
                'game_config' => $data['game_config'],
                'success_criteria' => $data['success_criteria']
            ]);

            // Create game elements if provided
            if (isset($data['game_config']['elements'])) {
                foreach ($data['game_config']['elements'] as $element) {
                    $challenge->gameElements()->create($element);
                }
            }

            return $challenge->load('gameElements');
        });
    }

    public function updateChallenge(Challenge $challenge, array $data)
    {
        return DB::transaction(function () use ($challenge, $data) {
            $challenge->update($data);

            if (isset($data['game_config']['elements'])) {
                // Remove old elements
                $challenge->gameElements()->delete();

                // Create new elements
                foreach ($data['game_config']['elements'] as $element) {
                    $challenge->gameElements()->create($element);
                }
            }

            return $challenge->load('gameElements');
        });
    }

    public function validateGamePlay($challengeId, $result)
    {
        $challenge = Challenge::findOrFail($challengeId);
        $criteria = collect($challenge->success_criteria);
        
        // Validate against success criteria
        $success = $criteria->every(function ($criterion) use ($result) {
            switch ($criterion['type']) {
                case 'score':
                    return $result['score'] >= $criterion['target'];
                case 'time':
                    return $result['time'] <= $criterion['target'];
                case 'accuracy':
                    return $result['accuracy'] >= $criterion['target'];
                case 'completion':
                    return $result['completed'] >= $criterion['target'];
                default:
                    return false;
            }
        });

        return [
            'success' => $success,
            'points_earned' => $success ? $challenge->points : 0,
            'criteria_met' => $criteria->map(function ($criterion) use ($result) {
                return [
                    'type' => $criterion['type'],
                    'target' => $criterion['target'],
                    'achieved' => $result[$criterion['type']] ?? 0,
                    'met' => ($result[$criterion['type']] ?? 0) >= $criterion['target']
                ];
            })
        ];
    }
} 