<?php

use Illuminate\Support\Facades\Route;

Route::view("/", "index");
Route::get("login", function () {
    return redirect('/');
})->name('login');

