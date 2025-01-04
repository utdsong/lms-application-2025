<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index()
    {
        $courses = Course::with(['challenges'])->get();
        return response()->json($courses);
    }

    public function show(Course $course)
    {
        return response()->json($course->load(['challenges']));
    }

    public function userProgress(Request $request)
    {
        $progress = $request->user()
            ->courses()
            ->with(['challenges'])
            ->get();

        return response()->json($progress);
    }
} 