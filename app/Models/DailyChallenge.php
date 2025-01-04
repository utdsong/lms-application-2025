<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class DailyChallenge extends Model
{
    protected $fillable = [
        'title',
        'description',
        'target_count',
        'xp_reward',
        'expires_at'
    ];

    protected $casts = [
        'expires_at' => 'datetime'
    ];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_daily_challenges')
            ->withPivot('progress', 'completed')
            ->withTimestamps();
    }
} 