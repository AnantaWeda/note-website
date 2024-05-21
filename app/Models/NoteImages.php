<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NoteImages extends Model
{
    use HasFactory;

    protected $table = "note_images";
    protected $primaryKey = "id_note_images";

    protected $fillable = [
        "id_users",
        "name"
    ];
}
