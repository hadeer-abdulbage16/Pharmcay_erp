<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Api\ProductApiController;
use Illuminate\Support\Facades\Route;

/*Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');*/


Route::group(['prefix' => 'product', 'as' => 'productApi'], function(){
  Route::get('list', [ProductApiController::class, 'list'])->name('list');
  Route::post('store', [ProductApiController::class, 'store'])->name('store');
});
