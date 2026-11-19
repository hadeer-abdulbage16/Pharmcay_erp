<?php

namespace App\Http\Controllers\Inventory;

use App\Http\Controllers\Controller;
use App\Models\Inventory\ProductStock;
use App\Models\Inventory\Product;
use App\Models\Inventory\Stores;
use Illuminate\Http\Request;

class ProductStockController extends Controller
{
    //
    public function list( Request $request)
    {
        $query = ProductStock::orderBy('created_at' , 'desc');

        if( $request->show_all)
            {
                $product_stock = $query->get();
            }else{
                $product_stock = $query->paginate(10);
            }
        if( $request->ajax()){
            return view('inventory.product_stock.table' , compact('product_stock'));
        } 
        
        return view('inventory.product_stock.list' , compact( 'product_stock' ));
    }
    public function table(Request $request)
    {
        $query = ProductStock::orderBy('created_at' , 'desc');

        if( $request->show_all)
            {
                $product_stock = $query->get();
            }else{
                $product_stock = $query->paginate(10);
            }
         return view('inventory.product_stock.table' , compact( 'product_stock' ) );
    }
    public function store( Request $request)
    {
        $validate = $request->validate([
            'barcode' => 'required|max:255',
            'product_code' => 'required|string|max:255',
            'product_name' => 'required|string|max:255',
            'unit' => 'required|string|max:255',
            'quantity' => 'required|integer',
            'expiry_date' => 'nullable|string|max:255',
            'sale_price' => 'required|numeric',
            'tax' => 'nullable|numeric',
            'discount' => 'nullable|numeric',
            'min_purchase_quantity' => 'nullable|integer',
            'min_sale_quantity' => 'nullable|integer',
            'alert_quantity' => 'nullable|integer'
        ]);

        ProductStock::create([
             'barcode' => $request->input('barcode'), 
             'product_code' => $request->input('product_code'), 
             'product_name' => $request->input('product_name'),
             'quantity' => $request->input('quantity', 0),
             'unit' => $request->input('unit'), 
             'expiry_date' => $request->input('expiry_date'),
             'sale_price' => $request->input('sale_price'),
             'purchase_price' => $request->input('purchase_price'),
             'tax' => $request->input('tax'),
             'price' => $request->input('price'),
             'discount' => $request->input('discount'),
             'store_id' => $request->input('store_id'),
             'product_id' => $request->input('product_id'),
             'min_purchase_quantity' => $request->input('min_purchase_quantity'),
             'min_sale_quantity' => $request->input('min_sale_quantity'),
             'alert_quantity' => $request->input('alert_quantity'),
             'discount_type' => $request->input('discount_type'),
        ]);
        return response()->json(['msg' => 'Stock Created successfuly']);
    }
    public function delete( $id)
    {
        $product_stock = ProductStock::findOrFail($id);
        $product_stock->delete();
        return response()->json(['msg' => 'Opening Stock Deleted successfuly']);
    }
    public function edit( $id)
    {
        $product_stock = ProductStock::findOrFail($id);
        return response()->json($product_stock);
    }
    public function update( Request $request, $id)
    {
        $product_stock = ProductStock::findOrFail($id);
        $validate = $request->validate([
            'barcode' => 'required|max:255',
            'product_code' => 'required|string|max:255',
            'product_name' => 'required|string|max:255',
            'unit' => 'required|string|max:255',
            'quantity' => 'required|integer',
            'expiry_date' => 'nullable|string|max:255',
            'sale_price' => 'required|numeric',
            'tax' => 'nullable|numeric',
            'discount' => 'nullable|numeric',
            'min_purchase_quantity' => 'nullable|integer',
            'min_sale_quantity' => 'nullable|integer',
            'alert_quantity' => 'nullable|integer'
        ]);

        $product_stock->update([
            'barcode' => $request->input('barcode'), 
             'product_code' => $request->input('product_code'), 
             'product_name' => $request->input('product_name'),
             'quantity' => $request->input('quantity', 0),
             'unit' => $request->input('unit'), 
             'expiry_date' => $request->input('expiry_date'),
             'sale_price' => $request->input('sale_price'),
             'purchase_price' => $request->input('purchase_price'),
             'tax' => $request->input('tax'),
             'discount' => $request->input('discount'),
             'store_id' => $request->input('store_id'),
             'product_id' => $request->input('product_id'),
             'min_purchase_quantity' => $request->input('min_purchase_quantity'),
             'min_sale_quantity' => $request->input('min_sale_quantity'),
             'alert_quantity' => $request->input('alert_quantity'),
             'discount_type' => $request->input('discount_type'),
        ]);
        return response()->json(['msg' => "Opening Stock Updated successfuly"]);
    }
    public function form( Request $request )
    {
        $id =  $request->id ?? null;
        $product_stock = $id ? ProductStock::findOrFail($id) : null;
        $stores = Stores::get();
        return view('inventory.product_stock.form' , compact('product_stock' , 'stores'));

    }
    public function search_form()
    {
        return view('inventory.product_stock.search');
    }

    public function search_results( Request $request)
    {
        $query = ProductStock::query();

        if ($request->filled('product_code')) {
            $query->where('product_code', 'like', '%' . $request->input('product_code') . '%');
        }

        if ($request->filled('product_name')) {
            $query->where('product_name', 'like', '%' . $request->input('product_name') . '%');
        }

        if ($request->filled('barcode')) {
            $query->where('barcode', 'like', '%' . $request->input('barcode') . '%');
        }

        if ($request->filled('expiry_date')) {
            $query->whereDate('expiry_date', $request->input('expiry_date'));
        }

        $product_stock = $query->orderBy('created_at', 'desc')->paginate(10);

        return view('inventory.product_stock.table', compact('product_stock'));
    } 

    public function get_product_info( Request $request)
    {
        $product = Product::where('barcode', $request->input('barcode'))->first();
        if ($product) {
            return response()->json([
                'success' => true,
                'data' => [
                    'id' => $product->id,
                    'name' => $product->name_en ,
                    'code' => $product->code,
                    'unit' => $product->unit,
                    'price' => $product->price,
                    'tax_value' => $product->tax_value,
                    'tax_percent' => $product->tax_percent,
                    'discount_value' => $product->discount_value,
                    'discount_percent' => $product->discount_percent,
                    
                ],
            ]);
        } else {
            return response()->json(['success' => false, 'message' => 'Product not found']);
        }
    }
}
