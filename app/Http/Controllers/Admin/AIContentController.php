<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\AIContentService;
use Illuminate\Http\Request;

class AIContentController extends Controller
{
    protected $aiService;

    public function __construct(AIContentService $aiService)
    {
        $this->aiService = $aiService;
    }

    public function generateLessonOutline(Request $request)
    {
        $request->validate([
            'topic' => 'required|string|max:255'
        ]);

        try {
            $outline = $this->aiService->generateLessonOutline($request->topic);
            return response()->json($outline);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to generate lesson outline',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function generateQuizQuestions(Request $request)
    {
        $request->validate([
            'topic' => 'required|string|max:255',
            'count' => 'integer|min:1|max:10'
        ]);

        try {
            $questions = $this->aiService->generateQuizQuestions(
                $request->topic,
                $request->count ?? 5
            );
            return response()->json($questions);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to generate quiz questions',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function enhanceContent(Request $request)
    {
        $request->validate([
            'content' => 'required|string',
            'type' => 'required|string|in:improve,simplify,elaborate'
        ]);

        try {
            $prompt = match ($request->type) {
                'improve' => "Improve this educational content while maintaining its core message: {$request->content}",
                'simplify' => "Simplify this educational content to make it more accessible: {$request->content}",
                'elaborate' => "Elaborate on this educational content with more details and examples: {$request->content}",
            };

            $response = $this->aiService->generateCourseContent($prompt);
            return response()->json($response);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to enhance content',
                'message' => $e->getMessage()
            ], 500);
        }
    }
} 