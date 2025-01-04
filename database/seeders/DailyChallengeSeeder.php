<?php

namespace Database\Seeders;

use App\Models\DailyChallenge;
use Illuminate\Database\Seeder;

class DailyChallengeSeeder extends Seeder
{
    public function run()
    {
        DailyChallenge::create([
            'title' => 'Daily Learning Sprint',
            'description' => 'Complete 3 lessons today',
            'points' => 100,
            'total' => 3,
            'deadline' => now()->endOfDay(),
        ]);
    }
} 