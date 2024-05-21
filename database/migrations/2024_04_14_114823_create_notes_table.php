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
        Schema::create('notes', function (Blueprint $table) {
            $table->id('id_notes');
            $table->unsignedBigInteger('id_users');
            $table->unsignedBigInteger('id_category')->nullable();
            $table->string('title');
            $table->longText('note')->nullable();
            $table->boolean('is_archive')->default(true);
            $table->foreign('id_users')->references('id_users')->on('users');
            $table->foreign('id_category')->references('id_category')->on('category');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notes');
    }
};
