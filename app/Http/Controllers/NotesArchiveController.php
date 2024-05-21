<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class NotesArchiveController extends Controller
{
    public function view(){
        return Inertia::render('Archive');
    }
}
