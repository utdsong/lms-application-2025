<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserSettings;
use Illuminate\Http\Request;

class UserSettingsController extends Controller
{
    public function update(Request $request)
    {
        $settings = UserSettings::updateOrCreate(
            ['user_id' => auth()->id()],
            $request->validate([
                'sound_enabled' => 'boolean',
                'music_enabled' => 'boolean',
                'sound_volume' => 'numeric|between:0,1',
                'music_volume' => 'numeric|between:0,1',
            ])
        );

        return response()->json($settings);
    }

    public function updateTutorialProgress(Request $request)
    {
        $settings = UserSettings::firstOrCreate(['user_id' => auth()->id()]);
        
        $progress = $settings->tutorial_progress ?? [];
        $progress[$request->step_id] = true;
        
        $settings->update(['tutorial_progress' => $progress]);

        return response()->json(['progress' => $progress]);
    }
} 