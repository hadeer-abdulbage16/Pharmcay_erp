<?php

namespace App\Services\Purchase;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Purchase\PurchaseInvoice;
use App\Models\Purchase\PurchaseInvoiceItem;
class PurchaseInvoiceService
{
    public function store( Request $request)
    {
        DB::beginTransaction();

        try {
            $invoice = PurchaseInvoice::create([
                'store_id' => $request->store_id,
                'supplier_id' => $request->supplier_id,
                'invoice_number' => $request->invoice_number,
                'invoice_date' => $request->invoice_date,
                'sln_number' => $request->sln_number,
                'notes' => $request->notes,
                'items_count' => count($request->item),
                'barcode_count' => count($request->item),
                'sale_price_total' => 0,
                'purchase_price_total' => 0,
                'vat_total' => 0,
                'discount_value' => 0,
                'discount_percent' => $request->discount_percent,
                'profit_value' => 0,
                'profit_percent' => $request->profit_percent,
                'grand_total' => 0,
                'payment_method' => $request->payment_method,
            ]);

            $total = 0;
            $vat = 0;
            $discount = 0;
            $sale_total = 0;
            $purchase_total = 0;
            $profit_total = 0;
            $vat_total = 0;
            $grand_total = 0;


            foreach ($request->items as $item) {
                $qty = $item['qty'];
                $sale_price = $item['sale_price'];
                $purchase_price = $item['purchase_price'];
                $tax_percent = $item['tax_percent'];
                $tax_value = ($purchase_price * $tax_percent) / 100;
                $discount_percent = $item['discount_percent'];
                $discount_value = ($purchase_price * $discount_percent) / 100;
                


                // calce value

                $unit_price = $purchase_price - $discount_value + $tax_value;
                $total = $unit_price * $qty;
                $profit = ($sale_price - $purchase_price) ;
                $profit_percent = $purchase_price > 0 ? ($profit / $purchase_price) * 100 : 0;
                $vat = (($total * $tax_percent) / 100) * $qty;

                PurchaseInvoiceItem::create([
                    'purchase_invoice_id' => $invoice->id,
                    'product_id' => $item['product_id'],
                    'product_name' => $item['product_name'],
                    'product_code' => $item['product_code'],
                    'unit' => $item['unit'],
                    'qty' => $qty ,
                    'balance' => $item['balance'],
                    'expiry_date' => $item['expiry_date'],
                    'sale_price' => $sale_price,
                    'purchase_price' => $purchase_price,
                    'tax_value' => $tax_value,
                    'tax_percent' => $tax_percent,
                    'discount_value' => $discount_value,
                    'discount_percent' => $discount_percent,
                    'profit_value' => $profit,
                    'profit_percent' => $profit_percent,
                    'total' => $unit_price,
                    
                ]);

                $grand_total += $total;
                $vat_total += $tax_value;
                $discount += $discount_value;
                $sale_total += $sale_price * $qty;
                $purchase_total += $purchase_price * $qty;
                $profit_total += $profit * $qty;    

                

            }
            $invoice->update([
                    'sale_price_total' => $sale_total,
                    'purchase_price_total' => $purchase_total,
                    'vat_total' => $vat_total,
                    'discount_value' => $discount,
                    'profit_value' => $profit_total,
                    'grand_total' => $grand_total,
                ]);

            DB::commit();
            return $invoice;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }

    }
}
