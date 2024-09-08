<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\MotorcycleController;
use App\Http\Controllers\NotesArchiveController;
use App\Http\Controllers\NotesCategoryController;
use App\Http\Controllers\NotesDeleteController;
use App\Http\Controllers\NotesHomeController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::middleware('auth')->group(function () {
    Route::get('/', [NotesHomeController::class, 'view'])->name('home.view');
    Route::get('/category/{id_category}', [NotesHomeController::class, 'viewByCategory'])->name('home.view.category');
    Route::post('/action/note/create', [NotesHomeController::class, 'create'])->name('home.create');
    Route::post('/action/note/restore', [NotesHomeController::class, 'restore'])->name('home.restore');

    Route::post('/action/note/update', [NotesHomeController::class, 'update'])->name('home.update');
    Route::post('/action/note/archive', [NotesHomeController::class, 'archive'])->name('home.archive');

    Route::delete('/action/note/soft/delete/{id_notes}', [NotesHomeController::class, 'softDelete'])->name('home.soft.delete');
    Route::delete('/action/note/delete/{id_notes}', [NotesHomeController::class, 'delete'])->name('home.delete');

    Route::get('/note/image/{name}',[NotesHomeController::class, 'noteGetImage']);
    Route::post('/action/note/image', [NotesHomeController::class, 'handleImage'])->name('home.handleImage');

    Route::get('/notes/archive', [NotesArchiveController::class, 'view'])->name('notesArchive.view');
    Route::get('/notes/delete', [NotesDeleteController::class, 'view'])->name('notesDelete.view');    

    Route::post('/action/note/category/create', [NotesCategoryController::class, 'create'])->name('category.create');
    Route::post('/action/note/category/update', [NotesCategoryController::class, 'update'])->name('category.update');
    Route::delete('/action/note/category/delete/{id_category}', [NotesCategoryController::class, 'delete'])->name('category.delete');

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

    Route::post('account/update', [RegisteredUserController::class, 'update'])->name('register.update');
});
Route::middleware('guest')->group(function () {
    Route::get('register', [RegisteredUserController::class, 'create'])->name('register');
    Route::post('register', [RegisteredUserController::class, 'store']);

    Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    //github provider
    Route::get('login/github', [AuthenticatedSessionController::class, 'redirectToProviderGithub'])->name('login.github');
    Route::get('github/callback', [AuthenticatedSessionController::class, 'handleProviderCallbackGithub'])->name('login.github.callback');

    //google provider
    Route::get('login/google', [AuthenticatedSessionController::class, 'redirectToProviderGoogle'])->name('login.google');
    Route::get('google/callback', [AuthenticatedSessionController::class, 'handleProviderCallbackGoogle'])->name('login.google.callback');

    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])->name('password.request');
    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])->name('password.email');
});

