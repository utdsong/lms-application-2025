<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('ai_generated_contents', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['lesson', 'challenge', 'game']);
            $table->text('prompt');
            $table->json('generated_content');
            $table->foreignId('user_id')->constrained();
            $table->boolean('is_used')->default(false);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('ai_generated_contents');
    }
}; 