<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Notes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class NotesArchiveController extends Controller
{
    public function view(){
        $user  = Auth::user();

        $data = Notes::select(
            "id_notes",
            "id_category",
            "title",
            "note",
            DB::raw("DATE_FORMAT(updated_at, '%H:%i') as update_time")
        )->where([
            ['id_users',$user->id_users],
            ['is_archive',1]
        ])->get();

        $dataCategory = Category::select("*")->where('id_users',$user->id_users)->get();

        $token = csrf_token();

        return Inertia::render('Archive',[
            'data' => $data,
            'dataCategory' => $dataCategory,
            'csrf' => $token
        ]);
    }
}
