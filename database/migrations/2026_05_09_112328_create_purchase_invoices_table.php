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
        Schema::create('purchase_invoices', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('store_id');
            $table->unsignedBigInteger('supplier_id');
            $table->string('invoice_number');
            $table->date('invoice_date');
            $table->string('sln_number')->nullable();
            $table->text('notes')->nullable();
            $table->tinyInteger('items_count')->default(0);
            $table->integer('barcode_count')->default(0);
            $table->decimal('sale_price_total', 15, 4)->default(0);
            $table->decimal('purchase_price_total', 15, 4)->default(0);
            $table->decimal('vat_total', 15, 4)->default(0);
            $table->decimal('discount_value', 15, 4)->default(0);
            $table->decimal('discount_percent', 15, 4)->default(0);
            $table->decimal('profit_value', 15, 4)->default(0);
            $table->decimal('profit_percent', 15, 4)->default(0);
            $table->decimal('grand_total', 15, 4)->default(0);
            $table->unsignedBigInteger('payment_method');
            $table->string('user_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchase_invoices');
    }
};
