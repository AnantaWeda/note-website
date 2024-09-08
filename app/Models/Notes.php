<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Notes extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = "notes";
    protected $primaryKey = "id_notes";

    protected $fillable = [
        "id_users",
        "id_category",
        "title",
        "note",
        "is_archive"
    ];
}
