<?php
use App\Http\Controllers\Company\CompanyController;
use App\Http\Controllers\Company\CurrencyController;
use Illuminate\Support\Facades\Route;

Route::group(
   ['prefix' => 'company', 'as' => 'company.', 'middleware' => 'auth'],
   function () {
      Route::get('menu', function () {
         return view('company.menu');
      })->name('menu');
      //company routes
      Route::group(['prefix' => 'company', 'as' => 'company.'], function () {
         Route::get('list', [CompanyController::class, 'list'])->name('list');
         Route::get('table', [CompanyController::class, 'table'])->name('table');
         Route::post('store', [CompanyController::class, 'store'])->name('store');
         Route::get('form', [CompanyController::class, 'form'])->name('form');
         Route::get('search', [CompanyController::class, 'search_form'])->name('search_form');
         Route::get('search_results', [CompanyController::class, 'search_results'])->name('search_results');
         Route::get('edit/{id}', [CompanyController::class, 'edit'])->name('edit');
         Route::post('update/{id}', [CompanyController::class, 'update'])->name('update');
         Route::post('delete/{id}', [CompanyController::class, 'delete'])->name('delete');
      });
       //currency routes
      Route::group(['prefix' => 'currency', 'as' => 'currency.'], function () {
         Route::get('list', [CurrencyController::class, 'list'])->name('list');
         Route::get('table', [CurrencyController::class, 'table'])->name('table');
         Route::post('store', [CurrencyController::class, 'store'])->name('store');
         Route::get('form', [CurrencyController::class, 'form'])->name('form');
         Route::get('search', [CurrencyController::class, 'search_form'])->name('search_form');
         Route::get('search_results', [CurrencyController::class, 'search_results'])->name('search_results');
         Route::get('edit/{id}', [CurrencyController::class, 'edit'])->name('edit');
         Route::post('update/{id}', [CurrencyController::class, 'update'])->name('update');
         Route::post('delete/{id}', [CurrencyController::class, 'delete'])->name('delete');
      });
   }

   

);