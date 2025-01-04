<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('tutorial_steps', function (Blueprint $table) {
            $table->id();
            $table->string('step_id')->unique();
            $table->string('title');
            $table->text('description');
            $table->string('target_element');
            $table->enum('position', ['top', 'right', 'bottom', 'left']);
            $table->integer('order');
            $table->boolean('required')->default(false);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('tutorial_steps');
    }
}; 