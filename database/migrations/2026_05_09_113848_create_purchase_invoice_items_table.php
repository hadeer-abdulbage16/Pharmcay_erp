<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('purchase_invoice_items', function (Blueprint $table) {
            $table->id();
            $table->string('barcode')->nullable();
            $table->string('product_code'); 
            $table->string('product_name');
            $table->string('unit');
            $table->integer('qty')->default(0);
            $table->integer('balance')->default(0);
            $table->string('expiry_date')->nullable();
            $table->decimal('sale_price', 10, 2)->default(0);
            $table->decimal('purchase_price', 10, 2)->default(0);
            $table->decimal('tax_value', 10, 2)->default(0);
            $table->decimal('tax_percent', 5, 2)->default(0);
            $table->decimal('discount_value', 10, 2)->default(0);
            $table->decimal('discount_percent', 5, 2)->default(0);
            $table->decimal('profit_value', 15, 2)->default(0);
            $table->decimal('profit_percent', 8, 2)->default(0);
            $table->decimal('total', 15, 2)->default(0);
            $table->bigInteger('purchase_invoice_id');
           
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchase_invoice_items');
    }
};
