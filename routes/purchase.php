<?php

use App\Http\Controllers\Purchase\PurchaseInvoiceController;

use Illuminate\Support\Facades\Route;


Route::group(
    ['prefix' => 'purchase', 'as' => 'purchase.', 'middleware' => 'auth'],
    function () {
        Route::get('menu', function () {
            return view('purchase.menu');
        })->name('menu');

        Route::group(['prefix' => 'purchase_invoice', 'as' => 'purchase_invoice.'], function () {
            Route::get('list', [PurchaseInvoiceController::class, 'list'])->name('list');
            Route::get('table', [PurchaseInvoiceController::class, 'table'])->name('table');
            Route::post('store', [PurchaseInvoiceController::class, 'store'])->name('store');
            Route::get('form', [PurchaseInvoiceController::class, 'form'])->name('form');
            Route::get('edit/{id}', [PurchaseInvoiceController::class, 'edit'])->name('edit');
            Route::post('update/{id}', [PurchaseInvoiceController::class, 'update'])->name('update');
            Route::post('delete/{id}', [PurchaseInvoiceController::class, 'delete'])->name('delete');
            Route::get('search-form', [PurchaseInvoiceController::class, 'search_form'])->name('search_form');
            Route::post('search-results', [PurchaseInvoiceController::class, 'search_results'])->name('search_results');
            Route::post('get_product_info', [PurchaseInvoiceController::class, 'get_product_info'])->name('get_product_info');
        });
    }
);