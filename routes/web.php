<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\ProfileController;

Route::get('/', fn () => Inertia::render('Welcome'))->name('welcome');

Route::middleware('guest')->group(function () {
    Route::get('/login', fn () => Inertia::render('Welcome'))->name('login'); // ✅ Added this
    Route::get('/register', [RegisteredUserController::class, 'create']);
    Route::post('/register', [RegisteredUserController::class, 'store']);
    Route::post('/login', [AuthenticatedSessionController::class, 'store']);
    Route::get('/forgot-password', fn () => Inertia::render('Auth/ForgotPassword'))->name('password.request');
    Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])->name('password.email');
    Route::get('/reset-password/{token}', [NewPasswordController::class, 'create'])->name('password.reset');
    Route::post('/reset-password', [NewPasswordController::class, 'store'])->name('password.update');
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::inertia('/profile', 'Profile')->name('profile');
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::resource('applications', ApplicationController::class)->except(['show', 'create', 'edit']);
});


Route::get('/build/assets/{file}', function ($file) {
    $path = public_path("build/assets/{$file}");

    if (!file_exists($path)) {
        abort(404);
    }

    $extension = pathinfo($file, PATHINFO_EXTENSION);

    $mimeTypes = [
        'js' => 'application/javascript',
        'css' => 'text/css',
        'map' => 'application/json'
    ];

    $mimeType = $mimeTypes[$extension] ?? 'application/octet-stream';

    return response()->file($path, [
        'Content-Type' => $mimeType,
        'Cache-Control' => 'public, max-age=31536000',
    ]);
})->where('file', '.*');
