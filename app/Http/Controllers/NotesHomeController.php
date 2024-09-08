<?php

namespace App\Http\Controllers;

use App\Http\Requests\NotesHome\CreateRequest;
use App\Http\Requests\NotesHome\UpdateRequest;
use App\Models\Category;
use App\Models\NoteImages;
use App\Models\Notes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\File;
use Inertia\Inertia;

class NotesHomeController extends Controller
{
    public function view(){
        $user = Auth::user();
        $data = Notes::select(
            "id_notes",
            "id_category",
            "title",
            "note",
            DB::raw("DATE_FORMAT(updated_at, '%H:%i') as update_time")
        )->where([
            ['id_users',$user->id_users],
            ['is_archive',0]
        ])->get();

        $dataCategory = Category::select("*")->where('id_users',$user->id_users)->get();

        $token = csrf_token();

        return Inertia::render('Home',[
            'data' => $data,
            'dataCategory' => $dataCategory,
            'csrf' => $token
        ]);
    }

    public function viewByCategory($id_category){
        $user = Auth::user();
        $data = Notes::select(
            "id_notes",
            "id_category",
            "title",
            "note",
            DB::raw("DATE_FORMAT(updated_at, '%H:%i') as update_time")
        )->where([
            ['id_users',$user->id_users],
            ['id_category',$id_category],
            ['is_archive',0]
        ])->get();

        $dataCategory = Category::select("*")->where('id_users',$user->id_users)->get();

        $token = csrf_token();

        return Inertia::render('Home',[
            'data' => $data,
            'dataCategory' => $dataCategory,
            'csrf' => $token
        ]);
    }

    public function create(CreateRequest $request){
        $user = Auth::user();
        Notes::create([
            "id_users" => $user->id_users,
            "id_category" => $request->id_category,
            "title" => $request->title,
            "note" => $request->note
        ]);

        return redirect()->back();
    } 

    public function update(UpdateRequest $request){
        $user = Auth::user();
        $update = Notes::where([
            ['id_notes', $request->id_notes],
            ['id_users', $user->id_users],
        ])->update([
            "title" => $request->title,
            "id_category" => $request->id_category,
            "note" => $request->note
        ]);


        return redirect()->back();
    }   

    public function handleImage(Request $request){
        $user = Auth::user();

        $validation = Validator::make($request->all(),[
            'image' => ["required",File::types(['png','jpeg','jpg'])->max(2000)]
        ]);

        if($validation->fails()){
            return response()->json(['errors' => $validation->errors()->first()],400);
        }

        $name = Str::random().'.'.$request->image->getClientOriginalExtension();

        Storage::disk('local')->putFileAs("noteImage",$request->image,$name);

        NoteImages::create([
            'id_users' => $user->id_users,
            'name' => $name
        ]);

        return response()->json([
            'url' => "http://127.0.0.1:8000/note/image/$name"
        ]);
    }

    public function noteGetImage($name){
        $user = Auth::user();

        $noteImage = NoteImages::where([
            ['id_users', $user->id_users],
            ['name', $name]
        ])->count();

        if($noteImage){
            $image = Storage::disk('local')->get("noteImage/$name");

            return response($image);
        }

        abort(404);
    }

    public function restore(Request $request){
        $user = Auth::user();

        $noteImage = Notes::withTrashed()->where([
            ['id_users', $user->id_users],
            ['id_notes', $request->id_notes]
        ])->restore();

        return redirect()->back();
    }

    public function softDelete($id_notes){
        $user = Auth::user();

        $noteImage = Notes::where([
            ['id_users', $user->id_users],
            ['id_notes', $id_notes]
        ])->delete();

        return redirect()->back();
    }

    public function delete($id_notes){
        $user = Auth::user();

        $noteImage = Notes::where([
            ['id_users', $user->id_users],
            ['id_notes', $id_notes]
        ])->forceDelete();

        return redirect()->back();
    }

    public function archive(Request $request){
        $user = Auth::user();

        $status = Notes::find($request->id_notes)->is_archive == 1 ? 0 : 1;

        Notes::find($request->id_notes)->update([
            "is_archive" => $status
        ]);

        return redirect()->back();
    }
}
