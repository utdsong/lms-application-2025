<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class AIContentService
{
    protected $apiKey;
    protected $baseUrl = 'https://api.openai.com/v1';

    public function __construct()
    {
        $this->apiKey = config('services.openai.api_key');
    }

    public function generateCourseContent($prompt)
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->apiKey,
            'Content-Type' => 'application/json',
        ])->post($this->baseUrl . '/chat/completions', [
            'model' => 'gpt-4',
            'messages' => [
                [
                    'role' => 'system',
                    'content' => 'You are a helpful educational content creator.'
                ],
                [
                    'role' => 'user',
                    'content' => $prompt
                ]
            ],
            'temperature' => 0.7,
            'max_tokens' => 1000
        ]);

        return $response->json();
    }

    public function generateLessonOutline($topic)
    {
        return $this->generateCourseContent(
            "Create a detailed lesson outline for: {$topic}. " .
            "Include main topics, subtopics, and key learning points."
        );
    }

    public function generateQuizQuestions($topic, $count = 5)
    {
        return $this->generateCourseContent(
            "Generate {$count} quiz questions about: {$topic}. " .
            "Include multiple choice options and mark the correct answer."
        );
    }
} 