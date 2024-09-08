<?php

namespace App\Http\Controllers;

use App\Http\Requests\NotesCategory\CreateRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

// mendefinisikan sebuah class yag bernama NotesCategoryController
class NotesCategoryController extends Controller
{
    //Constructor method untuk check apakah user sudah login 
    public function __construct()
    {
        $this->middleware("auth");
    }

    //method untuk create data category
    public function create(CreateRequest $request){
        $user = Auth::user();

        Category::create([
            "id_users" => $user->id_users,
            "name" => $request->category_name,
            "color" => $request->color
        ]);

        return redirect()->back();
    }

    //method untuk update data category
    public function update(Request $request){
        $user = Auth::user();

        Category::where([
            ["id_category",$request->id_category],
            ["id_users",$user->id_users]
        ])->update([
            "name" => $request->category_name,
            "color" => $request->color
        ]);

        return redirect()->back();
    }
    
    //method untuk delete data category
    public function delete($id_category){
        $user = Auth::user();

        Category::where([
            ["id_category",$id_category],
            ["id_users",$user->id_users]
        ])->delete();

        return redirect()->back();
    }
}
