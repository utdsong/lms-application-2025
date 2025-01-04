<?php

namespace App\Services;

use App\Models\Course;
use App\Models\Lesson;
use Illuminate\Support\Facades\DB;

class CourseService
{
    public function createCourse(array $data)
    {
        return DB::transaction(function () use ($data) {
            $course = Course::create($data);

            if (isset($data['lessons'])) {
                foreach ($data['lessons'] as $index => $lessonData) {
                    $lessonData['order'] = $index;
                    $course->lessons()->create($lessonData);
                }
            }

            return $course->load('lessons');
        });
    }

    public function updateCourse(Course $course, array $data)
    {
        return DB::transaction(function () use ($course, $data) {
            $course->update($data);

            if (isset($data['lessons'])) {
                // Update lesson order
                foreach ($data['lessons'] as $index => $lessonData) {
                    if (isset($lessonData['id'])) {
                        $lesson = $course->lessons()->find($lessonData['id']);
                        if ($lesson) {
                            $lesson->update([
                                'order' => $index,
                                ...$lessonData
                            ]);
                        }
                    } else {
                        $lessonData['order'] = $index;
                        $course->lessons()->create($lessonData);
                    }
                }
            }

            return $course->load('lessons');
        });
    }

    public function deleteCourse(Course $course)
    {
        return DB::transaction(function () use ($course) {
            // Delete associated files
            if ($course->thumbnail) {
                Storage::delete(str_replace('/storage', 'public', $course->thumbnail));
            }

            $course->delete();
            return true;
        });
    }
} 