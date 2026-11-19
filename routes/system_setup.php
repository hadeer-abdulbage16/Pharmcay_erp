<?php

use App\Http\Controllers\system_setup\LanguageController;
use Illuminate\Support\Facades\Route;



Route::group(
    ['prefix' => 'system_setup', 'as' => 'system_setup.', 'middleware' => 'auth'],
    function () {

        // Menu
        Route::get('menu', function () {
            return view('system_setup.menu');
        })->name('menu');

        Route::group(['prefix' => 'language'], function () {
    Route::get('', [LanguageController::class, 'index'])->name('language.index');
    Route::post('add-new', [LanguageController::class, 'store'])->name('language.add-new');
    Route::post('update-status', [LanguageController::class, 'update_status'])->name('language.update-status');
    Route::post('update-default-status', [LanguageController::class, 'update_default_status'])->name('language.update-default-status');
    Route::post('update', [LanguageController::class, 'update'])->name('language.update');
    Route::get('translate/{lang}', [LanguageController::class, 'translate'])->name('language.translate');
    Route::get('translate-list/{lang}', [LanguageController::class, 'translate_list'])->name('language.translate.list');
    Route::post('translate-submit/{lang}', [LanguageController::class, 'translate_submit'])->name('language.translate-submit');
    Route::post('remove-key/{lang}', [LanguageController::class, 'translate_key_remove'])->name('language.remove-key');
    Route::post('delete/{lang}', [LanguageController::class, 'delete'])->name('language.delete');
    Route::any('auto-translate/{lang}', [LanguageController::class, 'auto_translate'])->name('language.auto-translate');
});
    });

    
 
