<?php

namespace App\Http\Controllers\Inventory;

use App\Http\Controllers\Controller;
use App\Models\Inventory\Stores;
use Illuminate\Http\Request;

class StoresController extends Controller
{
    //
    public function list( Request $request) 
    {
        $query = Stores::OrderBy('created_at' , 'desc');

        if( $request->show_all)
            {
                $stores = $query->get();
            }else{
                $stores = $query->paginate(10);
            }
        if( $request->ajax()){
            return view('inventory.store.table' , compact('stores'));
        }    
        
        return view('inventory.store.list' , compact('stores'));
    }

    public function table(Request $request)
    {
        $query = Stores::OrderBy('created_at' , 'desc');

        if( $request->show_all)
            {
                $stores = $query->get();
            }else{
                $stores = $query->paginate(10);
            }
         return view('inventory.store.table' , compact('stores'));


    }

    public function store( Request $request)
    {
        $validate = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'nullable|string|max:255|unique:stores,code',
            'address' => 'nullable|string',
            'email' => 'nullable|email|max:255',
            'currency' => 'nullable|string|max:255',
        ]);

        Stores::create([
            'name' => $request->input('name'),
            'code' => $request->input('code'),
            'address' => $request->input('address'),
            'email' => $request->input('email'),
            'currency' => $request->input('currency'),
        ]);
        return response()->json(['msg' => 'Store created successfuly']);
    }
    public function edit($id)
    {
        $store = Stores::findOrFail($id);
        return response()->json($store);
    }
    public function update(Request $request, $id)
    {
        $validate = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'nullable|string|max:255|unique:stores,code,' . $id,
            'address' => 'nullable|string',
            'email' => 'nullable|email|max:255',
            'currency' => 'nullable|string|max:255',
        ]);

        $store = Stores::findOrFail($id);
        $store->update([
            'name' => $request->input('name'),
            'code' => $request->input('code'),
            'address' => $request->input('address'),
            'email' => $request->input('email'),
            'currency' => $request->input('currency'),
        ]);
        return response()->json(['msg' => 'Store updated successfuly']);
    }
    public function delete($id)
    {
        $store = Stores::findOrFail($id);
        $store->delete();
        return response()->json(['msg' => 'Store deleted successfuly' , 'status' => 200]);
    }
    public function form( Request $request)
    {
        if( $request->id){
            $store = Stores::findOrFail($request->id);
        }else{
            $store = null;
        }
        return view('inventory.store.form' , compact('store'));
    }
    public function search_form()
    {
        return view('inventory.store.search');
    }
    public function search_results(Request $request)
    {
        $query = Stores::query();

        if ($request->name) {
            $query->where('name', 'like', '%' . $request->name . '%');
        }

        if ($request->code) {
            $query->where('code', 'like', '%' . $request->code . '%');
        }

  
        $stores = $query->paginate(10);

        return view('inventory.store.table', compact('stores'));
    }
}
