<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\GameChallenge;
use App\Services\AIContentService;
use Illuminate\Http\Request;

class GameChallengeController extends Controller
{
    protected $aiService;

    public function __construct(AIContentService $aiService)
    {
        $this->aiService = $aiService;
    }

    public function index(Course $course)
    {
        return response()->json($course->challenges);
    }

    public function store(Request $request, Course $course)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|in:quiz,code,puzzle',
            'content' => 'required|json',
            'points' => 'required|integer|min:0'
        ]);

        $challenge = $course->challenges()->create($validated);
        return response()->json($challenge, 201);
    }

    public function generateChallenge(Request $request, Course $course)
    {
        $validated = $request->validate([
            'type' => 'required|in:quiz,code,puzzle',
            'topic' => 'required|string|max:255'
        ]);

        try {
            $content = $this->aiService->generateGameChallenge(
                $validated['topic'],
                $validated['type']
            );

            return response()->json([
                'content' => $content,
                'message' => 'Challenge generated successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to generate challenge',
                'message' => $e->getMessage()
            ], 500);
        }
    }
} 