<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Challenge extends Model
{
    protected $fillable = [
        'lesson_id',
        'type',
        'title',
        'description',
        'difficulty',
        'points',
        'game_config',
        'success_criteria'
    ];

    protected $casts = [
        'game_config' => 'array',
        'success_criteria' => 'array'
    ];

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }

    public function gameElements()
    {
        return $this->hasMany(GameElement::class);
    }
} 