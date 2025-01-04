<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class LeaderboardController extends Controller
{
    public function index($timeframe = 'daily')
    {
        $cacheKey = "leaderboard:{$timeframe}";
        
        return Cache::remember($cacheKey, 60, function () use ($timeframe) {
            $query = DB::table('user_points')
                ->join('users', 'users.id', '=', 'user_points.user_id')
                ->select(
                    'users.id',
                    'users.name',
                    'users.avatar',
                    DB::raw('SUM(points) as total_points')
                )
                ->groupBy('users.id', 'users.name', 'users.avatar');

            // Add timeframe filter
            switch ($timeframe) {
                case 'daily':
                    $query->whereDate('user_points.created_at', today());
                    break;
                case 'weekly':
                    $query->whereBetween('user_points.created_at', [now()->startOfWeek(), now()->endOfWeek()]);
                    break;
                case 'monthly':
                    $query->whereMonth('user_points.created_at', now()->month)
                        ->whereYear('user_points.created_at', now()->year);
                    break;
            }

            $entries = $query->orderByDesc('total_points')
                ->limit(100)
                ->get()
                ->map(function ($entry, $index) {
                    return [
                        'id' => $entry->id,
                        'name' => $entry->name,
                        'avatar' => $entry->avatar,
                        'points' => $entry->total_points,
                        'rank' => $index + 1,
                        'change' => 'same'
                    ];
                });

            return $entries;
        });
    }
} 