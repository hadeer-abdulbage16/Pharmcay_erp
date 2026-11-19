<?php

namespace App\Models\Inventory;

use Illuminate\Database\Eloquent\Model;
use App\Models\Inventory\Product;
use App\Models\Inventory\Stores;

class ProductStock extends Model
{
    //
    protected $guarded = [];
    
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
     public function store()
    {
        return $this->belongsTo(Stores::class);
    }
}
