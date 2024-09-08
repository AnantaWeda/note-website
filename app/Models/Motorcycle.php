<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Motorcycle extends Model
{
    use HasFactory;

    protected $table = "motorcycle";
    protected $primaryKey = "id_motorcycle";

    protected $fillable = [
        "id_users",
        "name",
        "type_motorcycle",
        "merk_motorcycle",
        "CC",
        "color",
        "price",
        "date_launching"
    ];
}
