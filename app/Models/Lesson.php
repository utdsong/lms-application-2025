<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    protected $fillable = [
        'course_id',
        'title',
        'order',
        'estimated_time',
        'status'
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function contents()
    {
        return $this->hasMany(Content::class)->orderBy('order');
    }

    public function challenges()
    {
        return $this->hasMany(Challenge::class);
    }
} 