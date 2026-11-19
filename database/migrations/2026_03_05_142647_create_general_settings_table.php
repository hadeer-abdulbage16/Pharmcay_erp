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
        Schema::create('general_settings', function (Blueprint $table) {
            $table->id();
            $table->string('title');  
            $table->tinyInteger('branch_id')->nullable();  
            $table->string('timezone')->nullable(); 
            $table->integer('logo_width')->nullable();
            $table->integer('logo_height')->nullable(); 
            $table->integer('credit_amount')->nullable();
            $table->integer('credit_days')->nullable();  
            $table->date('start_date')->nullable();  
            $table->integer('financial_year_start_month')->nullable();  
            $table->string('currency_symbol_placement')->nullable();  
            $table->integer('currency_precision')->nullable();  
            $table->string('currency_symbol')->nullable(); 
            $table->integer('currency_id')->nullable();
            
            $table->tinyInteger('default_purchase_store_id')->nullable();
            $table->tinyInteger('default_sales_store_id');
            $table->tinyInteger('allow_expired_products');
            $table->tinyInteger('expiry_date_warning');
            $table->tinyInteger('prevent_expired_sales');
            $table->unsignedBigInteger('default_cashier_id');
            $table->tinyInteger('show_payment_summary_on_save');
            $table->integer('return_days_limit');
            $table->tinyInteger('cash_supply_account_id');
            $table->tinyInteger('cash_expense_account_id');
            $table->string('incoming_cheques_account');

           
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('general_settings');
    }
};
