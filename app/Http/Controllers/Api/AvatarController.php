<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AvatarController extends Controller
{
    public function update(Request $request)
    {
        $validated = $request->validate([
            'avatar_url' => 'required|url',
            'avatar_style' => 'required|string',
            'avatar_seed' => 'required|string',
        ]);

        $user = auth()->user();
        $user->update($validated);

        return response()->json([
            'message' => 'Avatar updated successfully',
            'avatar_url' => $user->avatar_url
        ]);
    }
} 