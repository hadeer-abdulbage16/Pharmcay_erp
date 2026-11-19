<?php

namespace App\Http\Controllers\Inventory;

use App\Http\Controllers\Controller;
use App\Models\Company\Company;
use App\Models\Inventory\Category;
use App\Models\Inventory\Product;
use App\Models\Inventory\ProductStock;
use App\Models\Inventory\Stores;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    //
    public function list(Request $request)
    {
        $query = Product::OrderBy('created_at', 'desc');

        if ($request->show_all) {
            $products = $query->get();
        } else {
            $products = $query->paginate(10);
        }
        if ($request->ajax()) {
            return view('inventory.product.table', compact('products'));
        }

        return view('inventory.product.list', compact('products'));
    }

    public function table(Request $request)
    {
        $query = Product::OrderBy('created_at', 'desc');

        if ($request->show_all) {
            $products = $query->get();
        } else {
            $products = $query->paginate(10);
        }
        return view('inventory.product.table', compact('products'));
    }

    public function store(Request $request)
    {
        $validate = $request->validate([
            'code' => 'required|string|max:255|unique:products,code',
            'short_code' => 'required|string|max:255|unique:products,short_code',
            'inter_code' => 'nullable|string|max:255',
            'name_ar' => 'required|string|max:255',
            'name_en' => 'nullable|string|max:255',
            'active_ingredient' => 'nullable|string|max:255',
            'manufacturing_type' => 'nullable|in:local,international',
            'is_medicine' => 'nullable|in:active,inactive',
            'is_general_shortage' => 'nullable|in:active,inactive',
            'company_id' => 'nullable|exists:companies,id',
            'category_id' => 'nullable|exists:categories,id',
            // 'store_id' => 'nullable|exists:stores,id',
            'description' => 'nullable|string',

            'expiry_date' => 'nullable',
            'price' => 'numeric|min:0',
        ]);
        // dd($request->all());
        $product = Product::create([
            'barcode' => $request->input('barcode'),
            'code' => $request->input('code'),
            'short_code' => $request->input('short_code'),
            'inter_code' => $request->input('inter_code'),
            'name_ar' => $request->input('name_ar'),
            'name_en' => $request->input('name_en'),
            'active_ingredient' => $request->input('active_ingredient'),
            'manufacturing_type' => $request->input('manufacturing_type'),
            'is_medicine' => $request->input('is_medicine') ? 'active' : 'inactive',
            'is_general_shortage' => $request->input('is_general_shortage') ? 'active' : 'inactive',
            'company_id' => $request->input('company_id'),
            'category_id' => $request->input('category_id'),
            // 'store_id' => $request->input('store_id'),
            'description' => $request->input('description'),
            'expiry_date' => Carbon::parse($request->input('expiry_date'))->format('Y-m-d'),
            'price' => $request->input('price'),
            'tax_value' => $request->input('tax_value'),
            'tax_percent' => $request->input('tax_percent'),
            'discount_value' => $request->input('discount_value'),
            'discount_percent' => $request->input('discount_percent'),
            'unit' => $request->input('unit'),
        ]);

        foreach ($request->store_id as $store_id) {

            ProductStock::create([
                'product_code' => $product->code,
                'product_name' => $product->name_en,
                'barcode' => $product->barcode,
                'product_id' => $product->id,
                'store_id' => $store_id,
                'quantity' => $request->input("opining_stock-$store_id") ?? 0,
                'opining_stock' => $request->input("opining_stock-$store_id") ?? 0,
                'min_purchase_quantity' => $request->input("min_purchase_quantity-$store_id") ?? 1,
                'min_sale_quantity' => $request->input("min_sale_quantity-$store_id") ?? 1,
                'alert_quantity' => $request->input("alert_quantity-$store_id") ?? 1,
                'price' =>  $request->input('price'),
                'sale_price' => $request->price,
                'purchase_price' => $request->purchase_price,
                'discount' => $request->discount_value,
                'tax' =>  $request->input('tax_value'),
                'discount_type' => 'percent',
                'unit' => $request->input('unit'),

            ]);
        }
        return response()->json(['msg' => 'Product Created successfuly']);
    }

    public function edit($id)
    {
        $product = Product::findOrFail($id);
        return response()->json($product);
    }

    public function update(Request $request, $id)
    {
        $validate = $request->validate([
            'code' => 'required|string|max:255|unique:products,code,' . $id,
            'short_code' => 'required|string|max:255|unique:products,short_code,' . $id,
            'inter_code' => 'nullable|string|max:255',
            'name_ar' => 'required|string|max:255',
            'name_en' => 'nullable|string|max:255',
            'active_ingredient' => 'nullable|string|max:255',
            'manufacturing_type' => 'nullable|in:local,international',
            'is_medicine' => 'nullable|in:active,inactive',
            'is_general_shortage' => 'nullable|in:active,inactive',
            'company_id' => 'nullable|exists:companies,id',
            'category_id' => 'nullable|exists:categories,id',
            'store_id' => 'nullable|exists:stores,id',
            'description' => 'nullable|string',
            'opening_stock' => 'integer|min:0',
            'expiry_date' => 'nullable',
            'price' => 'numeric|min:0',
        ]);

        $product = Product::findOrFail($id);
        $product->update([
            'barcode' => $request->input('barcode', 0),
            'code' => $request->input('code'),
            'short_code' => $request->input('short_code'),
            'inter_code' => $request->input('inter_code'),
            'name_ar' => $request->input('name_ar'),
            'name_en' => $request->input('name_en'),
            'active_ingredient' => $request->input('active_ingredient'),
            'manufacturing_type' => $request->input('manufacturing_type'),
            'is_medicine' => $request->input('is_medicine') ? 'active' : 'inactive',
            'is_general_shortage' => $request->input('is_general_shortage') ? 'active' : 'inactive',
            'company_id' => $request->input('company_id'),
            'category_id' => $request->input('category_id'),
            'store_id' => $request->input('store_id'),
            'description' => $request->input('description'),

            'expiry_date' =>  Carbon::parse($request->input('expiry_date'))->format('Y-m-d'),
            'price' => $request->input('price'),
            'tax_value' => $request->input('tax_value'),
            'tax_percent' => $request->input('tax_percent'),
            'discount_value' => $request->input('discount_value'),
            'discount_percent' => $request->input('discount_percent'),
            'unit' => $request->input('unit'),
        ]);
        return response()->json(['msg' => "Product Updated successfuly"]);
    }
    public function delete($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        return response()->json(['msg' => "Product Deleted successfuly"]);
    }

    public function form(Request $request)
    {
        $id =  $request->id ?? null;
        $products = $id ? Product::findOrFail($id) : null;
        $stores = Stores::get();
        $companies = Company::get();
        $categories = Category::get();
        return view('inventory.product.form', compact('products', 'stores', 'companies', 'categories'));
    }

    public function search_form()
    {
        return view('inventory.product.search');
    }

    public function search_results(Request $request)
    {
        $query = Product::query();

        if ($request->name_ar) {
            $query->where('name_ar', 'like', '%' . $request->name_ar . '%');
        }
        if ($request->name_en) {
            $query->where('name_en', 'like', '%' . $request->name_en . '%');
        }
        if ($request->code) {
            $query->where('code', 'like', '%' . $request->code . '%');
        }
        if ($request->price) {
            $query->where('price', $request->price);
        }
        if ($request->active_ingredient) {
            $query->where('active_ingredient', 'like', '%' . $request->active_ingredient . '%');
        }
        $products = $query->paginate(10);
        return view('inventory.product.table', compact('products'));
    }
}
