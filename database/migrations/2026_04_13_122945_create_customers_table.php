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
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('f_name')->nullable();
            $table->string('l_name')->nullable();
            $table->string('email')->nullable()->unique();
            $table->string('phone')->nullable();
            $table->text('address')->nullable();
            $table->string('company_name')->nullable();
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->enum('type', ['individual', 'company'])->default('individual');
            $table->string('mobile')->nullable();
            $table->string('tax_no')->nullable();
            $table->string('code')->nullable();
            $table->decimal('opening_balance', 15, 5)->default(0);
            $table->decimal('credit_limit', 15, 5)->default(0);
            $table->decimal('total_sales_due', 15, 5)->default(0);
            $table->decimal('total_sales_return_due', 15, 5)->default(0);
            $table->string('pay_term')->nullable();
            $table->string('address_line_1')->nullable();
            $table->string('address_line_2')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('country')->nullable();
            $table->string('zip_code')->nullable();
            $table->string('landmark')->nullable();
            $table->string('street_name')->nullable();
            $table->string('building_number')->nullable();
            $table->string('additional_number')->nullable();
            $table->unsignedBigInteger('ledger_id')->nullable();
            $table->unsignedBigInteger('group_id')->nullable();
            $table->tinyInteger('branch_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
