<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Notes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class NotesDeleteController extends Controller
{
    public function view(){
        $user = Auth::user();
        $data = Notes::select(
            "id_notes",
            "id_category",
            "title",
            "note",
            DB::raw("DATE_FORMAT(updated_at, '%H:%i') as update_time")
        )->where('id_users',$user->id_users)->onlyTrashed()->get();
        $token = csrf_token();

        $dataCategory = Category::select("*")->where('id_users',$user->id_users)->get();

        return Inertia::render('Delete',[
            'data' => $data,
            'csrf' => $token,
            'dataCategory' => $dataCategory
        ]);
    }
}
