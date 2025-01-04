<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Services\CourseService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CourseManagementController extends Controller
{
    protected $courseService;

    public function __construct(CourseService $courseService)
    {
        $this->courseService = $courseService;
    }

    public function index()
    {
        $courses = Course::with(['lessons.contents', 'lessons.challenges'])->get();
        return response()->json($courses);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'level' => ['required', Rule::in(['beginner', 'intermediate', 'advanced'])],
            'category' => 'required|string|max:255',
            'prerequisites' => 'nullable|array',
            'learning_outcomes' => 'required|array',
            'status' => ['required', Rule::in(['draft', 'published'])]
        ]);

        if ($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('public/courses');
            $validated['thumbnail'] = Storage::url($path);
        }

        $course = $this->courseService->createCourse($validated);
        return response()->json($course, 201);
    }

    public function update(Request $request, Course $course)
    {
        $validated = $request->validate([
            'title' => 'string|max:255',
            'description' => 'string',
            'level' => [Rule::in(['beginner', 'intermediate', 'advanced'])],
            'category' => 'string|max:255',
            'prerequisites' => 'array',
            'learning_outcomes' => 'array',
            'status' => [Rule::in(['draft', 'published'])]
        ]);

        if ($request->hasFile('thumbnail')) {
            // Delete old thumbnail
            if ($course->thumbnail) {
                Storage::delete(str_replace('/storage', 'public', $course->thumbnail));
            }
            $path = $request->file('thumbnail')->store('public/courses');
            $validated['thumbnail'] = Storage::url($path);
        }

        $course = $this->courseService->updateCourse($course, $validated);
        return response()->json($course);
    }

    public function destroy(Course $course)
    {
        $this->courseService->deleteCourse($course);
        return response()->json(['message' => 'Course deleted successfully']);
    }
} 