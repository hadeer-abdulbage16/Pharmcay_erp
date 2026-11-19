<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use App\Models\Company\currency;
use Illuminate\Http\Request;

class CurrencyController extends Controller
{
    //
     //
    public function list( Request $request) 
    {
        $query = currency::OrderBy('created_at' , 'desc');

        if( $request->show_all)
            {
                $currency = $query->get();
            }else{
                $currency = $query->paginate(10);
            }
        if( $request->ajax()){
            return view('company.currency.table' , compact('currency'));
        }    
        
        return view('company.currency.list' , compact('currency'));
    }

    public function table(Request $request)
    {
        $query = currency::OrderBy('created_at' , 'desc');

        if( $request->show_all)
            {
                $currency = $query->get();
            }else{
                $currency = $query->paginate(10);
            }
         return view('company.currency.table' , compact('currency'));


    }

    public function store( Request $request)
    {
        $validate = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'nullable|string|max:255|unique:currencies,code',
            'symbol' => 'nullable|string',
            'decimal_digits' => 'nullable|max:5',
            
        ]);

        currency::create([
            'name' => $request->input('name'),
            'code' => $request->input('code'),
            'symbol' => $request->input('symbol'),
            'decimal_digits' => $request->input('decimal_digits'),
            
        ]);
        return response()->json(['msg' => 'Currency created successfuly']);
    }
    public function edit($id)
    {
        $currency = currency::findOrFail($id);
        return response()->json($currency);
    }
    public function update(Request $request, $id)
    {
        $validate = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'nullable|string|max:255|unique:currencies,code,' . $id,
            'symbol' => 'nullable|string',
            'decimal_digits' => 'nullable|max:5',
            
        ]);

        $store = currency::findOrFail($id);
        $store->update([
            'name' => $request->input('name'),
            'code' => $request->input('code'),
            'symbol' => $request->input('symbol'),
            'decimal_digits' => $request->input('decimal_digits'),
            
        ]);
        return response()->json(['msg' => 'Currency updated successfuly']);
    }
    public function delete($id)
    {
        $currency = currency::findOrFail($id);
        $currency->delete();
        return response()->json(['msg' => 'Currency deleted successfuly' , 'status' => 200]);
    }
    public function form( Request $request)
    {
        if( $request->id){
            $currency = currency::findOrFail($request->id);
        }else{
            $currency = null;
        }
        return view('company.currency.form' , compact('currency'));
    }
    public function search_form()
    {
        return view('company.currency.search');
    }
    public function search_results(Request $request)
    {
        $query = currency::query();

        if ($request->name) {
            $query->where('name', 'like', '%' . $request->name . '%');
        }

        if ($request->code) {
            $query->where('code', 'like', '%' . $request->code . '%');
        }

  
        $currency = $query->paginate(10);

        return view('company.currency.table', compact('currency'));
    }
}


