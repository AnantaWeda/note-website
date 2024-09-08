<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules;
use Illuminate\Validation\Rules\File;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'profile' => ['required', File::types(['jpg','png','jpeg'])->max(2000)],
        ]);

        $name = Str::random().'.'.$request->profile->getClientOriginalExtension();
        Storage::disk('public')->putFileAs("profile",$request->profile,$name);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'provider' => "platform",
            'profile' => "/storage/profile/$name"
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }

    public function update(Request $request): RedirectResponse{
        $user = Auth::user();
        $nameProfile = null;

        $data = [
            'name' => $request->name
        ];
        $request->validate([
            'name' => 'required|string|max:255',
            'password' => ['nullable', 'confirmed', Rules\Password::defaults()],
            'profile' => ['nullable', File::types(['jpg','png','jpeg'])->max(2000)],
        ]);

        if($request->profile){
            $nameProfile = Str::random().'.'.$request->profile->getClientOriginalExtension();
            Storage::disk('public')->putFileAs("profile",$request->profile,$nameProfile);
            $data['profile'] = env("APP_URL")."/storage/profile/$nameProfile";
        }

        if($request->password){
            $data["password"] = Hash::make($request->password);
        }

        $user->update($data);

        return redirect()->back();
    }
}
