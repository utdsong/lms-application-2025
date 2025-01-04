<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Content extends Model
{
    protected $fillable = [
        'lesson_id',
        'type',
        'title',
        'content',
        'metadata',
        'order'
    ];

    protected $casts = [
        'metadata' => 'array'
    ];

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }
} 