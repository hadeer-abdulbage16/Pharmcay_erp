<?php

namespace App\Models\Inventory;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class StockMovementController extends Model
{
          public function list(Request $request)
    {

        $query = StockMovement::with(['product', 'store'])->orderBy('created_at', 'desc');

        if ($request->show_all) {
            $stock_movements = $query->get();
        } else {
            $stock_movements = $query->paginate(10);
        }

        if ($request->ajax()) {
            return view('inventory.stock_movement.table', compact('stock_movements'))->render();
        }

        return view('inventory.stock_movement.list', compact('stock_movements'));
    }

   

   

    public function table(Request $request)
    {
        $query = StockMovement::query();

        if ($request->show_all) {
            $stock_movements = $query->get();
        } else {
            $stock_movements = $query->paginate(10);
        }

        return view('inventory.stock_movement.table', compact('stock_movements'));
    }

  

    public function search_form(Request $request)
    {
        return view('inventory.stock_movement.search');
    }


    public function search_results(Request $request)
    {
        $query = StockMovement::query();
        if ($request->name) {
            $query->where("name", 'like', "%" . $request->name . "%");
        }

        $stock_movements = $query->paginate(10);
        return view('inventory.stock_movement.table', compact('stock_movements'))->render();
    }
}
