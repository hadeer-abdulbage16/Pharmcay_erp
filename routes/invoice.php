<?php

use App\Http\Controllers\Invoice\SettingsController;
use App\Models\Invoice\Settings;
use App\Models\Inventory\Stores;
use Illuminate\Support\Facades\Route;



Route::group(
    ['prefix' => 'invoice', 'as' => 'invoice.', 'middleware' => 'auth'],
    function () {
      //menu
        Route::get('menu', function () {
         return view('invoice.menu');
      })->name('menu');
                  
        //  Settings
        Route::group(['prefix' => 'settings', 'as' => 'settings.'], function () {

            Route::get('index', function () {
                 $stores = Stores::get();
                return view('invoice.settings.index',compact('stores'));
            })->name('index');
            Route::post('store', [SettingsController::class, 'store'])->name('store');
        });
    }
);