<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserSettings extends Model
{
    protected $fillable = [
        'user_id',
        'sound_enabled',
        'music_enabled',
        'sound_volume',
        'music_volume',
        'tutorial_progress'
    ];

    protected $casts = [
        'sound_enabled' => 'boolean',
        'music_enabled' => 'boolean',
        'sound_volume' => 'float',
        'music_volume' => 'float',
        'tutorial_progress' => 'array'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
} 