<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SoundManagementController extends Controller
{
    public function index()
    {
        $sounds = Storage::disk('public')->files('sounds');
        $soundFiles = collect($sounds)->map(function ($path) {
            return [
                'name' => basename($path),
                'path' => Storage::url($path),
                'size' => Storage::disk('public')->size($path),
                'last_modified' => Storage::disk('public')->lastModified($path)
            ];
        });

        return response()->json($soundFiles);
    }

    public function store(Request $request)
    {
        $request->validate([
            'sound' => 'required|file|mimes:mp3,wav|max:5120', // 5MB max
            'type' => ['required', Rule::in(['effect', 'music'])]
        ]);

        $file = $request->file('sound');
        $path = $file->store('public/sounds/' . $request->type);

        return response()->json([
            'message' => 'Sound uploaded successfully',
            'path' => Storage::url($path)
        ]);
    }

    public function destroy($filename)
    {
        $path = 'sounds/' . $filename;
        if (Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
            return response()->json(['message' => 'Sound deleted successfully']);
        }

        return response()->json(['message' => 'File not found'], 404);
    }

    public function test($filename)
    {
        $path = 'sounds/' . $filename;
        if (Storage::disk('public')->exists($path)) {
            return response()->file(storage_path('app/public/' . $path));
        }

        return response()->json(['message' => 'File not found'], 404);
    }
} 