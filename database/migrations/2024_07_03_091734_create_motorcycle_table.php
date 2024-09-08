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
        Schema::create('motorcycle', function (Blueprint $table) {
            $table->id("id_motorcycle");
            $table->unsignedBigInteger("id_users");
            $table->string("name");
            $table->string("type_motorcycle");
            $table->string("merk_motorcycle");
            $table->string("CC");
            $table->string("color");
            $table->string("price");
            $table->date("date_launching");
            $table->foreign("id_users")->references("id_users")->on("users");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('motorcycle');
    }
};
