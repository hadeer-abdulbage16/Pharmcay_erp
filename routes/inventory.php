<?php
 
use App\Http\Controllers\Inventory\CategoryController;
use App\Http\Controllers\Inventory\ProductStockController;
use App\Http\Controllers\Inventory\ProductController;
use App\Http\Controllers\Inventory\StoresController;
use App\Models\Inventory\StockMovementController;
use Illuminate\Support\Facades\Route;

Route::group(
   ['prefix' => 'inventory', 'as' => 'inventory.', 'middleware' => 'auth'],
   function () {
      Route::get('menu', function () {
         return view('inventory.menu');
      })->name('menu');
      //store routes
      Route::group(['prefix' => 'store', 'as' => 'store.'], function () {
         Route::get('list', [StoresController::class, 'list'])->name('list');
         Route::get('table', [StoresController::class, 'table'])->name('table');
         Route::post('store', [StoresController::class, 'store'])->name('store');
         Route::get('form', [StoresController::class, 'form'])->name('form');
         Route::get('search', [StoresController::class, 'search_form'])->name('search_form');
         Route::get('search_results', [StoresController::class, 'search_results'])->name('search_results');
         Route::get('edit/{id}', [StoresController::class, 'edit'])->name('edit');
         Route::post('update/{id}', [StoresController::class, 'update'])->name('update');
         Route::post('delete/{id}', [StoresController::class, 'delete'])->name('delete');
      });
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
     
      //product routes
      Route::group(['prefix' => 'product', 'as' => 'product.'], function () {
         Route::get('list', [ProductController::class, 'list'])->name('list');
         Route::get('table', [ProductController::class, 'table'])->name('table');
         Route::post('store', [ProductController::class, 'store'])->name('store');
         Route::get('form', [ProductController::class, 'form'])->name('form');
         Route::get('search', [ProductController::class, 'search_form'])->name('search_form');
         Route::get('search_results', [ProductController::class, 'search_results'])->name('search_results');
         Route::get('edit/{id}', [ProductController::class, 'edit'])->name('edit');
         Route::post('update/{id}', [ProductController::class, 'update'])->name('update');
         Route::post('delete/{id}', [ProductController::class, 'delete'])->name('delete');
      });

      //opening stock routes
      Route::group(['prefix' => 'product_stock', 'as' => 'product_stock.'], function () {
         Route::get('list', [ProductStockController::class, 'list'])->name('list');
         Route::get('table', [ProductStockController::class, 'table'])->name('table');
         Route::post('store', [ProductStockController::class, 'store'])->name('store');
         Route::get('form', [ProductStockController::class, 'form'])->name('form');
         Route::get('search', [ProductStockController::class, 'search_form'])->name('search_form');
         Route::get('search_results', [ProductStockController::class, 'search_results'])->name('search_results');
         Route::get('edit/{id}', [ProductStockController::class, 'edit'])->name('edit');
         Route::post('update/{id}', [ProductStockController::class, 'update'])->name('update');
         Route::post('delete/{id}', [ProductStockController::class, 'delete'])->name('delete');
         Route::post('get_product_info', [ProductStockController::class, 'get_product_info'])->name('get_product_info');

      });
        // stock movement
        Route::group(['prefix' => 'stock-movement', 'as' => 'stock_movement.'], function () {
            Route::get('list', [StockMovementController::class, 'list'])->name('list');
            Route::get('table', [StockMovementController::class, 'table'])->name('table'); 
            Route::get('search', [StockMovementController::class, 'search_form'])->name('search_form');
            Route::get('search-results', [StockMovementController::class, 'search_results'])->name('search_results');
        });
   }
);