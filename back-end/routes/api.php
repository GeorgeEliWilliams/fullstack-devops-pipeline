<?php

use App\Http\Controllers\Api\AuthenticationController;
use App\Http\Controllers\Api\PasswordResetController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

Route::get("health", function () {
    return response()->json([
        'status' => "ok"
    ]);
});


Route::post('login', [class, 'login']);
Route::post('logout', [class, 'logout'])->middleware('auth:sanctum');

Route::post('password/forgot', [PasswordResetController::class, 'forgotPassword']);
Route::post('password/reset', [PasswordResetController::class, 'resetPassword']);


Route::middleware(['auth:sanctum'])->group(function () {

    Route::patch("users/{user}/change-password", [AuthenticationController::class, "changePassword"]);
    Route::patch("users/{user}", [UserController::class, "update"]);


    Route::prefix('admin')->group(function () {
        Route::apiResource("users", UserController::class);
    });
});

