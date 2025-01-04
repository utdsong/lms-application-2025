<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TutorialStep;
use Illuminate\Http\Request;

class TutorialController extends Controller
{
    public function index()
    {
        $steps = TutorialStep::orderBy('order')->get();
        $userProgress = auth()->user()->settings->tutorial_progress ?? [];

        return response()->json([
            'steps' => $steps,
            'progress' => $userProgress
        ]);
    }

    public function markComplete(Request $request, TutorialStep $step)
    {
        $settings = auth()->user()->settings;
        $progress = $settings->tutorial_progress ?? [];
        $progress[$step->step_id] = true;
        
        $settings->update(['tutorial_progress' => $progress]);

        return response()->json(['success' => true]);
    }
} 