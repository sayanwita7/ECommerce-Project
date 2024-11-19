<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MainController;

Route::get('/', function () {
    return view('welcome');
});
Route::view('/login','login');
Route::view('/register','register');
Route::post('loginaction',[MainController::class,'login']);
Route::post('register',[MainController::class,'register']);
Route::get("/logout",[MainController::class,'logout']);
Route::get("/edit-user/{id}",[MainController::class,'edit']);
Route::view("/change-password/{id}",'changePassword');
Route::post("/update",[MainController::class,'update']);
Route::post("/change-password",[MainController::class,'changePassword']);
