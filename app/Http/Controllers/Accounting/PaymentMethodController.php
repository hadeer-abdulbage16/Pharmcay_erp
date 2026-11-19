<?php

namespace App\Http\Controllers\Accounting;

use App\Http\Controllers\Controller;
use App\Models\Accounting\PaymentMethod;
use Illuminate\Http\Request;

class PaymentMethodController extends Controller
{
    //
        public function list(Request $request)
        {
            $query = PaymentMethod::OrderBy('created_at' , 'desc');
    
            if( $request->show_all)
                {
                    $payment_methods = $query->get();
                }else{
                    $payment_methods = $query->paginate(10);
                }
            if( $request->ajax()){
                return view ('accounting.payment_method.table' , compact('payment_methods'));
            }    
            
            return view('accounting.payment_method.list' , compact( 'payment_methods' ));
        }

        public function table(Request $request)
        {
            $query = PaymentMethod::OrderBy('created_at' , 'desc');
    
            if( $request->show_all)
                {
                    $payment_methods = $query->get();
                }else{
                    $payment_methods = $query->paginate(10);
                }
             return view('accounting.payment_method.table' , compact( 'payment_methods' ) );
         }

         public function store( Request $request)
         {
             $validate = $request->validate([
                 'code' => 'required|string|max:255|unique:payment_methods,code',
                 'name' => 'required|string|max:255',
                 
             ]);
             PaymentMethod::Create([
                'code' => $request->code,
                'name' => $request->name,
             ]);
             return response()->json(['msg' => "Payment Method Saved successfuly"]);
         }
        public function edit(Request $request)
        {
                $payment_method = PaymentMethod::findOrFail($request->id);
                return response()->json(['payment_method' => $payment_method]);
        }
        public function update(Request $request)
        {
            $validate = $request->validate([
                'code' => 'required|string|max:255|unique:payment_methods,code,' . $request->id,
                'name' => 'required|string|max:255',
                
            ]);
            PaymentMethod::updateOrCreate(['id' => $request->id], $validate);
            return response()->json(['msg' => "Payment Method Updated successfuly"]);
        }
        public function delete(Request $request)
        {
            $payment_method = PaymentMethod::findOrFail($request->id);
            $payment_method->delete();
            return response()->json(['msg' => "Payment Method Deleted successfuly"]);
        }

        public function search_form()
        {
            return view('accounting.payment_method.search');
        }
        public function search_results(Request $request)
        {
            $query = PaymentMethod::Query();
            if ($request->code) {
                $query->where('code', 'like', '%' . $request->code . '%');
            }     
            if ($request->name) {
                $query->where('name', 'like', '%' . $request->name . '%');
            }
            $payment_methods = $query->paginate(10);    
             return view('accounting.payment_method.table' , compact( 'payment_methods' ) );
         }

         public function form(Request $request ){
            $id =  $request->id ?? null;
            $payment_methods = $id ? PaymentMethod::findOrFail($id) : null;
            return view('accounting.payment_method.form' , compact('payment_methods'));
        }

}
