<?php

use App\Http\Controllers\crm\CustomerController;
use App\Http\Controllers\crm\GroupMasterController;
use App\Http\Controllers\crm\SupplierController; 
use Illuminate\Support\Facades\Route;


Route::group(
    ['prefix' => 'crm', 'as' => 'crm.', 'middleware' => 'auth'],
    function () {

        // Menu
        Route::get('menu', function () {
            return view('crm.menu');
        })->name('menu');


        // supplier

        Route::group(['prefix' => 'supplier', 'as' => 'supplier.'], function () {
            Route::get('list', [SupplierController::class, 'list'])->name('list');
            Route::get('table', [SupplierController::class, 'table'])->name('table');
            Route::post('store', [SupplierController::class, 'store'])->name('store');
            Route::get('form', [SupplierController::class, 'form'])->name('form');
            Route::get('edit/{id}', [SupplierController::class, 'edit'])->name('edit');
            Route::post('update/{id}', [SupplierController::class, 'update'])->name('update');
            Route::post('delete/{id}', [SupplierController::class, 'delete'])->name('delete');
            Route::get('search', [SupplierController::class, 'search_form'])->name('search_form');
            Route::get('search-results', [SupplierController::class, 'search_results'])->name('search_results');
        });
        // customer

        Route::group(['prefix' => 'customer', 'as' => 'customer.'], function () {
            Route::get('list', [CustomerController::class, 'list'])->name('list');
            Route::get('table', [CustomerController::class, 'table'])->name('table');
            Route::post('store', [CustomerController::class, 'store'])->name('store');
            Route::get('form', [CustomerController::class, 'form'])->name('form');
            Route::get('edit/{id}', [CustomerController::class, 'edit'])->name('edit');
            Route::post('update/{id}', [CustomerController::class, 'update'])->name('update');
            Route::post('delete/{id}', [CustomerController::class, 'delete'])->name('delete');
            Route::get('search', [CustomerController::class, 'search_form'])->name('search_form');
            Route::get('search-results', [CustomerController::class, 'search_results'])->name('search_results');
        });

        // Group master
        Route::group(['prefix' => 'group', 'as' => 'group_master.'], function () {
            Route::get('list', [GroupMasterController::class, 'list'])->name('list');
            Route::get('table', [GroupMasterController::class, 'table'])->name('table');
            Route::post('store', [GroupMasterController::class, 'store'])->name('store');
            Route::get('form', [GroupMasterController::class, 'form'])->name('form');
            Route::get('edit/{id}', [GroupMasterController::class, 'edit'])->name('edit');
            Route::post('update/{id}', [GroupMasterController::class, 'update'])->name('update');
            Route::post('delete/{id}', [GroupMasterController::class, 'delete'])->name('delete');
            Route::get('search', [GroupMasterController::class, 'search_form'])->name('search_form');
            Route::get('search-results', [GroupMasterController::class, 'search_results'])->name('search_results');
        });
    }
);
