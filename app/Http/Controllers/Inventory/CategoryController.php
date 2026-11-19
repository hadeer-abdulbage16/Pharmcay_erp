<?php

namespace App\Http\Controllers\Inventory;

use App\Http\Controllers\Controller;
use App\Models\Inventory\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    //
    public function list(Request $request)
    {
         $query = Category::OrderBy('created_at' , 'desc');

        if( $request->show_all)
            {
                $categories = $query->get();
            }else{
                $categories = $query->paginate(10);
            }
        if( $request->ajax()){
            return view ('inventory.category.table' , compact('categories'));
        }    
        
        return view('inventory.category.list' , compact( 'categories' ));
    }

    public function table(Request $request)
    {
        $query = Category::OrderBy('created_at' , 'desc');

        if( $request->show_all)
            {
                $categories = $query->get();
            }else{
                $categories = $query->paginate(10);
            }
         return view('inventory.category.table' , compact( 'categories' ) );
    }
    public function store( Request $request)
    {
        $validate = $request->validate([
            'code' => 'required|string|max:255|unique:categories,code',
            'title' => 'required|string|max:255',
            
        ]);

        $category = Category::updateOrCreate(['id' => $request->id], $validate);

        return response()->json(['msg' => "Category Saved successfuly"]);
    }
    public function edit(Request $request)
    {
        $category = Category::findOrFail($request->id);
        return response()->json(['Category' => $category]);
    }
    public function update(Request $request)
    {
        $validate = $request->validate([
            'code' => 'string|max:255|unique:categories,code,' . $request->id,
            'title' => 'string|max:255',
            
        ]);

        $category = Category::updateOrCreate(['id' => $request->id], $validate);

        return response()->json(['msg' => "Category Updated successfuly"]);
    }

    public function delete(Request $request)
    {
        $category = Category::findOrFail($request->id);
        $category->delete();
        return response()->json(['msg' => "Category Deleted successfuly"]);
    } 
    public function form(Request $request ){
        $id =  $request->id ?? null;
        $category = $id ? Category::findOrFail($id) : null;
        return view('inventory.category.form' , compact('category'));
    }
    
    public function search_form()
    {
        return view('inventory.category.search');
    }
    public function search_results(Request $request)
    {
        $query = Category::query();

        if ($request->code) {
            $query->where('code', 'like', '%' . $request->code . '%');
        }

        if ($request->title) {
            $query->where('title', 'like', '%' . $request->title . '%');
        }

        $categories = $query->get();

        return view('inventory.category.table', compact('categories'));
    }
}

