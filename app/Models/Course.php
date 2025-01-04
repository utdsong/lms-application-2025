<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Course extends Model
{
    protected $fillable = [
        'title',
        'description',
        'thumbnail',
        'level',
        'category',
        'prerequisites',
        'learning_outcomes',
        'status'
    ];

    protected $casts = [
        'prerequisites' => 'array',
        'learning_outcomes' => 'array',
    ];

    public function lessons(): HasMany
    {
        return $this->hasMany(Lesson::class)->orderBy('order');
    }

    public function challenges()
    {
        return $this->hasMany(Challenge::class);
    }

    public function dailyChallenges()
    {
        return $this->hasMany(DailyChallenge::class);
    }
}