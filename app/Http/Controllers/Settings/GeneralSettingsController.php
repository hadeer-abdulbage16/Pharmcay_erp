<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\Settings\GeneralSettings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class GeneralSettingsController extends Controller
{
    //
    public function store(Request $request)
    {

        $data = $request->validate([

            'title' => "required|string|max:255", 
            'timezone' => "nullable|string",
            'logo_width' => "nullable",
            'logo_height' => "nullable", 
            'credit_amount' => "nullable",
            'credit_days' => "nullable|string", 
            'start_date' => "nullable|date",
            'financial_year_start_month' => "nullable|integer",
            'currency_symbol_placement' => "nullable|string",
            'currency_precision' => "nullable|integer",
            'currency_id' => "nullable|integer",
            'default_purchase_store_id' => "nullable|integer",
            'default_sales_store_id' => "nullable|integer",
            'allow_expired_products' => "nullable|boolean",
            'prevent_expired_sales' => "nullable|boolean",
            'expiry_date_warning_enabled' => "nullable|boolean",
            'return_days_limit' => "nullable|integer",
            'show_payment_summary_on_save' => "nullable|boolean",
            'default_cashier_id' => "nullable|integer",
            'cash_supply_account_id' => "nullable|integer",
            'cash_expense_account_id' => "nullable|integer",
            'incoming_cheques_account_id' => "nullable",
        ]);

        $settings = GeneralSettings::first();
        $data['allow_expired_products'] = $request->has('allow_expired_products');
        $data['prevent_expired_sales'] = $request->has('prevent_expired_sales');
        $data['expiry_date_warning_enabled'] = $request->has('expiry_date_warning_enabled');
        $data['show_payment_summary_on_save'] = $request->has('show_payment_summary_on_save');
        $data['default_cashier_id'] = Auth::id();
        data_set($data, 'currency_symbol', get_currency_symbol($request->currency_id));
        if ($settings) {
            $settings->update($data);
        }else{
            $settings = GeneralSettings::create($data);
        }
        config(['app.name' => $settings->title]); 
        config(['def.currency_symbol' => $settings->currency_symbol]);

        setEnv('APP_NAME', '"' . $settings->title . '"'); 
        setEnv('APP_CURRENCY_SYMBOL', '"' . $settings->currency_symbol . '"'); 
        return to_route('settings.general.menu')->with('success', 'General settings updated successfully.');
    }

    
}
