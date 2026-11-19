<?php

use App\Http\Controllers\AuthController; 
use App\Http\Controllers\system_setup\LanguageController;
use Illuminate\Support\Facades\Route;

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware('auth')->name('dashboard');
 
Route::get('/', function () {
    if(auth()->check()){
        return to_route('dashboard');
    }else{
        return to_route('login');
    }
});
 
Route::get('lang/{locale}',[LanguageController::class,'change_lang'])->name('lang');
