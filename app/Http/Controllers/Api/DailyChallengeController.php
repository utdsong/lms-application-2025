<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DailyChallenge;
use Illuminate\Http\Request;

class DailyChallengeController extends Controller
{
    public function current()
    {
        $user = auth()->user();
        $challenge = DailyChallenge::whereDate('created_at', today())
            ->with(['userProgress' => function ($query) use ($user) {
                $query->where('user_id', $user->id);
            }])
            ->first();

        if (!$challenge) {
            $challenge = DailyChallenge::create([
                'title' => 'Daily Learning Sprint',
                'description' => 'Complete 3 lessons today',
                'points' => 100,
                'total' => 3,
                'deadline' => now()->endOfDay(),
            ]);
        }

        return response()->json([
            'id' => $challenge->id,
            'title' => $challenge->title,
            'description' => $challenge->description,
            'points' => $challenge->points,
            'progress' => $challenge->userProgress?->progress ?? 0,
            'total' => $challenge->total,
            'deadline' => $challenge->deadline,
        ]);
    }
} 