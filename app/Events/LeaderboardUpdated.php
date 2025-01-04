<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class LeaderboardUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $userId;
    public $newPoints;

    public function __construct($userId, $newPoints)
    {
        $this->userId = $userId;
        $this->newPoints = $newPoints;
    }

    public function broadcastOn()
    {
        return new Channel('leaderboard');
    }
} 