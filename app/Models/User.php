<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    protected $fillable = [
        'username',
        'email',
        'password',
        'current_rank',
        'total_points',
        'current_streak'
    ];

    public function courses()
    {
        return $this->belongsToMany(Course::class, 'user_progress')
            ->withPivot(['current_points', 'completed_challenges']);
    }

    public function badges()
    {
        return $this->belongsToMany(Badge::class, 'user_badges')
            ->withTimestamps();
    }

    public function challengeAttempts()
    {
        return $this->hasMany(ChallengeAttempt::class);
    }

    public function settings()
    {
        return $this->hasOne(UserSettings::class);
    }
} 