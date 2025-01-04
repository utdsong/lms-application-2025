<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TutorialStep;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class TutorialStepController extends Controller
{
    public function index()
    {
        $steps = TutorialStep::orderBy('order')->get();
        return response()->json($steps);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'step_id' => 'required|string|unique:tutorial_steps',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'target_element' => 'required|string',
            'position' => ['required', Rule::in(['top', 'right', 'bottom', 'left'])],
            'order' => 'required|integer|min:0',
            'required' => 'boolean'
        ]);

        $step = TutorialStep::create($validated);
        return response()->json($step, 201);
    }

    public function update(Request $request, TutorialStep $step)
    {
        $validated = $request->validate([
            'title' => 'string|max:255',
            'description' => 'string',
            'target_element' => 'string',
            'position' => [Rule::in(['top', 'right', 'bottom', 'left'])],
            'order' => 'integer|min:0',
            'required' => 'boolean'
        ]);

        $step->update($validated);
        return response()->json($step);
    }

    public function destroy(TutorialStep $step)
    {
        $step->delete();
        return response()->json(['message' => 'Step deleted successfully']);
    }

    public function reorder(Request $request)
    {
        $request->validate([
            'steps' => 'required|array',
            'steps.*.id' => 'required|exists:tutorial_steps,id',
            'steps.*.order' => 'required|integer|min:0'
        ]);

        foreach ($request->steps as $stepData) {
            TutorialStep::where('id', $stepData['id'])
                ->update(['order' => $stepData['order']]);
        }

        return response()->json(['message' => 'Steps reordered successfully']);
    }
} 