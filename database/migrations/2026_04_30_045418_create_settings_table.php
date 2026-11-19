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
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('store_id');
            $table->enum('print_type', ['a4', 'thermal' , 'no_print'])->default('a4');
            $table->string('template')->default('default');
            $table->string('print_name')->nullable();
            $table->string('organization_name')->nullable();           
            $table->string('tax_number')->nullable();
            $table->text('invoice_header')->nullable();
            $table->text('invoice_footer')->nullable();
            $table->enum('show_customer_name', ['active', 'inactive'])->default('active'); 
            $table->enum('show_seller_name', ['active', 'inactive'])->default('active'); 
            $table->decimal('min_invoice_amount', 15, 5)->default(0);
            $table->integer('print_copies')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
