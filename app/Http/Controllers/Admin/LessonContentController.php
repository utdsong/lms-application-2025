<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use App\Models\LessonContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class LessonContentController extends Controller
{
    public function store(Request $request, Lesson $lesson)
    {
        $validated = $request->validate([
            'type' => 'required|in:text,video,code,image',
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'description' => 'nullable|string',
            'order' => 'required|integer|min:0',
            'metadata' => 'nullable|array'
        ]);

        $content = $lesson->contents()->create($validated);
        return response()->json($content, 201);
    }

    public function uploadVideo(Request $request, Lesson $lesson)
    {
        $request->validate([
            'video' => 'required|file|mimetypes:video/mp4,video/quicktime|max:100000'
        ]);

        try {
            $file = $request->file('video');
            $path = $file->store('lesson-videos', 'public');

            // Create video content
            $content = $lesson->contents()->create([
                'type' => 'video',
                'title' => $file->getClientOriginalName(),
                'content' => '',
                'order' => $lesson->contents->count(),
                'metadata' => [
                    'videoUrl' => Storage::url($path),
                    'videoType' => 'custom'
                ]
            ]);

            return response()->json([
                'message' => 'Video uploaded successfully',
                'content' => $content
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to upload video',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function reorder(Request $request, Lesson $lesson)
    {
        $request->validate([
            'contents' => 'required|array',
            'contents.*.id' => 'required|exists:lesson_contents,id',
            'contents.*.order' => 'required|integer|min:0'
        ]);

        foreach ($request->contents as $item) {
            $lesson->contents()
                ->where('id', $item['id'])
                ->update(['order' => $item['order']]);
        }

        return response()->json(['message' => 'Content reordered successfully']);
    }
} 