<?php

namespace App\Services;

use App\Models\User;
use App\Models\Achievement;
use App\Events\AchievementUnlocked;
use Illuminate\Support\Facades\DB;

class AchievementService
{
    public function checkAndAwardAchievements(User $user)
    {
        $achievements = Achievement::all();
        
        foreach ($achievements as $achievement) {
            if (!$user->achievements->contains($achievement->id) && $this->hasMetCriteria($user, $achievement)) {
                $this->awardAchievement($user, $achievement);
            }
        }
    }

    private function hasMetCriteria(User $user, Achievement $achievement)
    {
        $criteria = $achievement->criteria;

        switch ($achievement->type) {
            case 'lesson':
                return $this->checkLessonCriteria($user, $criteria);
            case 'course':
                return $this->checkCourseCriteria($user, $criteria);
            case 'streak':
                return $this->checkStreakCriteria($user, $criteria);
            case 'challenge':
                return $this->checkChallengeCriteria($user, $criteria);
        }

        return false;
    }

    private function awardAchievement(User $user, Achievement $achievement)
    {
        DB::transaction(function () use ($user, $achievement) {
            $user->achievements()->attach($achievement->id, [
                'unlocked_at' => now()
            ]);

            $user->increment('total_points', $achievement->points);

            event(new AchievementUnlocked($user, $achievement));
        });
    }
} 