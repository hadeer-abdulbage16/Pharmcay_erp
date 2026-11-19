<?php

namespace App\Http\Controllers\Purchase;

use App\Http\Controllers\Controller;
use App\Models\Purchase\PurchaseInvoice;
use App\Models\Purchase\PurchaseInvoiceItem;
use App\Services\Purchase\PurchaseInvoiceService;
use App\Models\Inventory\Stores;
use App\Models\crm\Supplier;
use App\Models\Accounting\PaymentMethod;
use App\Models\Inventory\Product;
use Illuminate\Http\Request;

class PurchaseInvoiceController extends Controller
{
    //
    public function __construct( private PurchaseInvoiceService $service ){}


    public function list( Request $requset)
    {
        $query =  PurchaseInvoice::orderBy('created_at' , 'desc');

        if($requset->show_all){
            $invoices = $query->get();
        }else{
            $invoices = $query->paginate(10);
        }

        if($requset->ajax()){
            return view ('purchase.purchase_invoice.table' , compact('invoices'));
        }
        return view ('purchase.purchase_invoice.list' , compact('invoices'));
    }

    public function table( Request $requset)
    {
        $query =  PurchaseInvoice::orderBy('created_at' , 'desc');

        if($requset->show_all){
            $invoices = $query->get();
        }else{
            $invoices = $query->paginate(10);
        }

        return view('purchase.purchase_invoice.table' , compact('invoices'));
    }

    public function store(Request $request)
    {
            $validate = $request->validate([
                'store_id' => 'required|integer',
                'supplier_id' => 'required|integer',
                'invoice_number' => 'required|string|max:255',
                'invoice_date' => 'required|date',
                'sln_number' => 'nullable|string|max:255',
                'notes' => 'nullable|string|max:255',
                'discount_percent' => 'nullable|numeric',
                'profit_percent' => 'nullable|numeric',
                'payment_method' => 'required|string|max:255',
                'items' => 'required|array|min:1',
                'items.*.product_id' => 'required|integer',
                'items.*.qty' => 'required|integer',
                'items.*.sale_price' => 'required|numeric',
                'items.*.purchase_price' => 'required|numeric',
                'items.*.tax_percent' => 'nullable|numeric',
                'items.*.discount_percent' => 'nullable|numeric',
            ]);
        $invoice = $this->service->store($request);
        if($invoice){
            return response()->json([
                'status' => true,
                'message' => 'Purchase Invoice created successfully',
                'data' => $invoice
            ]);
        }else{
            return response()->json([
                'status' => false,
                'message' => 'Failed to create Purchase Invoice',
            ]);
        }
    }

    public function form( Request $request)
    {
        $id = $request->id ?? null ;
        $invoice = $id ? PurchaseInvoice::find($id )&& PurchaseInvoiceItem::where('purchase_invoice_id', $id)->get() : null;
            $stores = Stores::all();
            $suppliers = Supplier::all();
            $payment_methods = PaymentMethod::all();
    
            return view('purchase.purchase_invoice.form' , compact('invoice' , 'stores' , 'suppliers' , 'payment_methods'));

    }

    public function delete($id)
    {
        $invoice = PurchaseInvoice::find($id) && PurchaseInvoiceItem::where('purchase_invoice_id' , $id)->delete();
        if($invoice){
            $invoice->delete();
            return response()->json([
                'status' => true,
                'message' => 'Purchase Invoice deleted successfully',
            ]);
        }else{
            return response()->json([
                'status' => false,
                'message' => 'Failed to delete Purchase Invoice',
            ]);
        }
    }
    public function search_form()
    {
        return view('purchase.purchase_invoice.search');
    }
    public function search_results(Request $request)
    {
        $query = PurchaseInvoice::query();

        if ($request->invoice_number) {
            $query->where('invoice_number', 'like', '%' . $request->invoice_number . '%');
        }

        if ($request->supplier_id) {
            $query->where('supplier_id', $request->supplier_id);
        }

        if ($request->invoice_date) {
            $query->where('invoice_date', $request->invoice_date);
        }

        $invoices = $query->get();

        return view('purchase.purchase_invoice.table', compact('invoices'));
    }

    public function get_product_info( Request $request)
    {
       // dd($request->all());
        $query = Product::query();

        $searchQuery = $request->search_query;
        $searchType = $request->search_type;

        if($searchType === 'barcode'){
            $query->where('barcode', $searchQuery);
        }
        if($searchType === 'code'){
            $query->where('code', $searchQuery);
        }
        if($searchType === 'name'){
            $query->where('name_en','Like', '%' . $searchQuery .'%');
        }

        $product = $query->first();

        if ($product) {
            return response()->json([
                'success' => true,
                'data' => [
                    'id' => $product->id,
                    'barcode' => $product->barcode,
                    'product_name' => $product->name_en ,
                    'product_code' => $product->code,
                    'unit' => $product->unit,
                    'sale_price' => $product->price,
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
