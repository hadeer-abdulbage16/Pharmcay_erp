<?php

namespace App\Http\Controllers\Invoice;

use App\Http\Controllers\Controller;
use App\Models\Invoice\Settings;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    //
    public  function store(Request $request)
    {
       
        $data = $request->validate([
            'store_id' => 'required|integer',
            'print_type' => 'required|in:a4,thermal,no_print',
            'template' => 'required|string',
            'print_name' => 'nullable|string',
            'organization_name' => 'nullable|string',
            'tax_number' => 'nullable|string',
            'invoice_header' => 'nullable|string',
            'invoice_footer' => 'nullable|string',
            'min_invoice_amount' => 'required|numeric',
            'print_copies' => 'required|integer',
        ]);
         //check box
            $data['show_customer_name'] = $request->has('show_customer_name') ? 'active' : 'inactive';
            $data['show_seller_name'] = $request->has('show_seller_name') ? 'active' : 'inactive';
            

        $result = Settings::updateOrCreate(
          ['store_id' => $data['store_id']],
          $data
       );
       
        return to_route('invoice.settings.index')->with('success', 'Invoice settings updated successfully.');
    }
}    