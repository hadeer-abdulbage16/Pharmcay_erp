<?php

use App\Http\Controllers\User_Roles\RoleController;
use App\Http\Controllers\User_Roles\UserController;
use Illuminate\Support\Facades\Route;


Route::group(
    ['prefix' => 'user_roles', 'as' => 'user_roles.', 'middleware' => 'auth'],
    function () {

        // Menu
        Route::get('menu', function () {
            return view('user_roles.menu');
        })->name('menu');


        // Roles

        Route::group(['prefix' => 'roles', 'as' => 'roles.'], function () {
            Route::get('list', [RoleController::class, 'list'])->name('list');
            Route::get('table', [RoleController::class, 'table'])->name('table');
            Route::post('store', [RoleController::class, 'store'])->name('store');
            Route::get('form', [RoleController::class, 'form'])->name('form');
            Route::get('edit/{id}', [RoleController::class, 'edit'])->name('edit');
            Route::post('update/{id}', [RoleController::class, 'update'])->name('update');
            Route::post('delete/{id}', [RoleController::class, 'delete'])->name('delete');
            Route::get('search', [RoleController::class, 'search_form'])->name('search_form');
            Route::get('search-results', [RoleController::class, 'search_results'])->name('search_results');
        });

        // User

        Route::group(['prefix' => 'users', 'as' => 'users.'], function () {
            Route::get('list', [UserController::class, 'list'])->name('list');
            Route::get('table', [UserController::class, 'table'])->name('table');
            Route::post('store', [UserController::class, 'store'])->name('store');
            Route::get('form', [UserController::class, 'form'])->name('form');
            Route::get('edit/{id}', [UserController::class, 'edit'])->name('edit');
            Route::post('update/{id}', [UserController::class, 'update'])->name('update');
            Route::post('delete/{id}', [UserController::class, 'delete'])->name('delete');
            Route::post('change_pass', [UserController::class, 'change_pass'])->name('change_pass');
            Route::get('search', [UserController::class, 'search_form'])->name('search_form');
            Route::get('search-results', [UserController::class, 'search_results'])->name('search_results');
        });
    }
);
