<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Api\ChallengeController;
use App\Http\Controllers\Api\LeaderboardController;
use App\Http\Controllers\Api\UserSettingsController;
use App\Http\Controllers\Api\TutorialController;
use App\Http\Controllers\Admin\TutorialStepController;
use App\Http\Controllers\Admin\SoundManagementController;
use App\Http\Controllers\Admin\AIContentController;
use App\Http\Controllers\Admin\GameChallengeController;
use App\Http\Controllers\Admin\LessonContentController;
use App\Http\Controllers\Api\DailyChallengeController;
use App\Http\Controllers\Api\AvatarController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Courses
    Route::get('/courses', [CourseController::class, 'index']);
    Route::get('/courses/{course}', [CourseController::class, 'show']);
    Route::get('/user/progress', [CourseController::class, 'userProgress']);
    
    // Challenges
    Route::post('/challenges/{challenge}/attempt', [ChallengeController::class, 'attempt']);
    
    Route::get('/leaderboard/{type?}', [LeaderboardController::class, 'index']);

    // Settings routes
    Route::put('/settings', [UserSettingsController::class, 'update']);
    Route::put('/settings/tutorial', [UserSettingsController::class, 'updateTutorialProgress']);

    // Tutorial routes
    Route::get('/tutorial', [TutorialController::class, 'index']);
    Route::post('/tutorial/{step}/complete', [TutorialController::class, 'markComplete']);

    Route::get('/daily-challenge', [DailyChallengeController::class, 'current']);
    Route::post('/daily-challenge/progress', [DailyChallengeController::class, 'updateProgress']);

    Route::post('/avatar', [AvatarController::class, 'update']);
}); 

// Admin routes
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    // Tutorial management
    Route::apiResource('tutorial-steps', TutorialStepController::class);
    Route::post('tutorial-steps/reorder', [TutorialStepController::class, 'reorder']);

    // Sound management
    Route::get('sounds', [SoundManagementController::class, 'index']);
    Route::post('sounds', [SoundManagementController::class, 'store']);
    Route::delete('sounds/{filename}', [SoundManagementController::class, 'destroy']);
    Route::get('sounds/{filename}/test', [SoundManagementController::class, 'test']);

    // AI Content Generation Routes
    Route::post('/ai/lesson-outline', [AIContentController::class, 'generateLessonOutline']);
    Route::post('/ai/quiz-questions', [AIContentController::class, 'generateQuizQuestions']);
    Route::post('/ai/enhance-content', [AIContentController::class, 'enhanceContent']);

    // Game Challenge Routes
    Route::get('courses/{course}/challenges', [GameChallengeController::class, 'index']);
    Route::post('courses/{course}/challenges', [GameChallengeController::class, 'store']);
    Route::post('courses/{course}/challenges/generate', [GameChallengeController::class, 'generateChallenge']);
    Route::put('courses/{course}/challenges/{challenge}', [GameChallengeController::class, 'update']);
    Route::delete('courses/{course}/challenges/{challenge}', [GameChallengeController::class, 'destroy']);

    // Lesson Content Routes
    Route::post('lessons/{lesson}/content', [LessonContentController::class, 'store']);
    Route::post('lessons/{lesson}/video', [LessonContentController::class, 'uploadVideo']);
    Route::post('lessons/{lesson}/content/reorder', [LessonContentController::class, 'reorder']);
    Route::put('lessons/{lesson}/content/{content}', [LessonContentController::class, 'update']);
    Route::delete('lessons/{lesson}/content/{content}', [LessonContentController::class, 'destroy']);

    // Course Management Routes
    Route::apiResource('courses', CourseController::class);
    Route::post('courses/{course}/lessons', [LessonController::class, 'store']);
    Route::post('courses/{course}/lessons/reorder', [LessonController::class, 'reorder']);
}); 