<?php


use App\Http\Controllers\Accounting\CategoryController;
use App\Http\Controllers\Accounting\PaymentMethodController;
use Illuminate\Support\Facades\Route;

Route::group(
   ['prefix' => 'accounting', 'as' => 'accounting.', 'middleware' => 'auth'],
   function () {
      Route::get('menu', function () {
         return view('accounting.menu');
      })->name('menu');
      
      //category routes
       Route::group(['prefix' => 'category', 'as' => 'category.'], function () {
         Route::get('list', [CategoryController::class, 'list'])->name('list');
         Route::get('table', [CategoryController::class, 'table'])->name('table');
         Route::post('store', [CategoryController::class, 'store'])->name('store');
         Route::get('form', [CategoryController::class, 'form'])->name('form');
         Route::get('search', [CategoryController::class, 'search_form'])->name('search_form');
         Route::get('search_results', [CategoryController::class, 'search_results'])->name('search_results');
         Route::get('edit/{id}', [CategoryController::class, 'edit'])->name('edit');
         Route::post('update/{id}', [CategoryController::class, 'update'])->name('update');
         Route::post('delete/{id}', [CategoryController::class, 'delete'])->name('delete');
      });

      //payment method routes
      Route::group(['prefix' => 'payment_method', 'as' => 'payment_method.'], function () {
         Route::get('list', [PaymentMethodController::class, 'list'])->name('list');
         Route::get('table', [PaymentMethodController::class, 'table'])->name('table');
         Route::post('store', [PaymentMethodController::class, 'store'])->name('store');
         Route::get('form', [PaymentMethodController::class, 'form'])->name('form');
         Route::get('search', [PaymentMethodController::class, 'search_form'])->name('search_form');
         Route::get('search_results', [PaymentMethodController::class, 'search_results'])->name('search_results');
         Route::get('edit/{id}', [PaymentMethodController::class, 'edit'])->name('edit');
         Route::post('update/{id}', [PaymentMethodController::class, 'update'])->name('update');
         Route::post('delete/{id}', [PaymentMethodController::class, 'delete'])->name('delete');
      });
      
   }
);