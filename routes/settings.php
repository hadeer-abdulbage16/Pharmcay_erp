<?php

use App\Http\Controllers\Settings\GeneralSettingsController;
use App\Models\Currency;
use App\Models\Settings\GeneralSettings;
use App\Models\Inventory\Stores;
use Illuminate\Support\Facades\Route;



Route::group(
    ['prefix' => 'settings', 'as' => 'settings.', 'middleware' => 'auth'],
    function () {

        // Menu   
                  
        // General Settings
        Route::group(['prefix' => 'general', 'as' => 'general.'], function () {

            Route::get('menu', function () {
                $currencies = Currency::get();
                 $stores = Stores::get();
                $settings=GeneralSettings::first() ;
                return view('settings.general.index',compact('settings', 'currencies' , 'stores'));
            })->name('menu');
            Route::post('store', [GeneralSettingsController::class, 'store'])->name('store');
        });
    }
);