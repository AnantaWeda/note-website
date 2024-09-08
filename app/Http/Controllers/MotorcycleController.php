<?php

namespace App\Http\Controllers;

use App\Http\Requests\Motorcycle\MotorcycleCreateRequest;
use App\Http\Requests\Motorcycle\MotorcycleDeleteRequest;
use App\Http\Requests\Motorcycle\MotorcycleUpdateRequest;
use App\Models\Category;
use App\Models\Motorcycle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MotorcycleController extends Controller
{
    public function view(){
        $user = Auth::user();

        $dataCategory = Category::select("*")->where('id_users',$user->id_users)->get();
        $dataMotorcycle = Motorcycle::select("*")->paginate(10);
        
        return Inertia::render("Motorcycle/Motorcycle",[
            "dataCategory" => $dataCategory,
            "dataMotorcycle" => $dataMotorcycle
        ]);
    }

    public function create(MotorcycleCreateRequest $request){
        $user = Auth::user();

        Motorcycle::create([
            "id_users" => $user->id_users,
            "name" => $request->name,
            "type_motorcycle" => $request->type_motorcycle,
            "merk_motorcycle" => $request->merk_motorcycle,
            "CC" => $request->cc,
            "color" => $request->color,
            "price" => $request->price,
            "date_launching" => $request->date_launching,
        ]);

        return redirect()->back();
    }

    public function update(MotorcycleUpdateRequest $request){
        $user = Auth::user();

        Motorcycle::where([
            ["id_motorcycle", $request->id_motorcycle],
            ["id_users", $user->id_users]
        ])->update([
            "name" => $request->name,
            "type_motorcycle" => $request->type_motorcycle,
            "merk_motorcycle" => $request->merk_motorcycle,
            "CC" => $request->cc,
            "color" => $request->color,
            "price" => $request->price,
            "date_launching" => $request->date_launching,
        ]);

        return redirect()->back();
    }

    public function delete(MotorcycleDeleteRequest $request){
        $user = Auth::user();

        Motorcycle::where([
            ["id_motorcycle", $request->id_motorcycle],
            ["id_users", $user->id_users]
        ])->delete();

        return redirect()->back();
    }
}
