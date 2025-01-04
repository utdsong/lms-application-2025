<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Challenge;
use App\Models\ChallengeAttempt;
use Illuminate\Http\Request;

class ChallengeController extends Controller
{
    public function attempt(Request $request, Challenge $challenge)
    {
        $request->validate([
            'completion_time' => 'required|integer',
            'success' => 'required|boolean',
        ]);

        $points = $this->calculatePoints(
            $challenge,
            $request->completion_time,
            $request->success
        );

        $attempt = ChallengeAttempt::create([
            'user_id' => $request->user()->id,
            'challenge_id' => $challenge->id,
            'points_earned' => $points,
            'completion_time' => $request->completion_time,
            'success' => $request->success,
        ]);

        if ($request->success) {
            $this->updateUserProgress($request->user(), $points);
        }

        return response()->json([
            'attempt' => $attempt,
            'points_earned' => $points
        ]);
    }

    private function calculatePoints($challenge, $completionTime, $success)
    {
        if (!$success) return 0;

        $basePoints = $challenge->points_value;
        $timeBonus = max(0, (($challenge->time_limit - $completionTime) / 10));
        
        return (int) ($basePoints + $timeBonus);
    }

    private function updateUserProgress($user, $points)
    {
        $user->total_points += $points;
        $user->save();
    }
} 