<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('note_images', function (Blueprint $table) {
            $table->id("id_note_images");
            $table->unsignedBigInteger('id_users');
            $table->string("name");
            $table->foreign('id_users')->references('id_users')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('note_images');
    }
};
