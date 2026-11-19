<?php

namespace App\Models\Inventory;

use Illuminate\Database\Eloquent\Model; 
use App\Models\Company\Company;
use App\Models\Inventory\Stores;

class Product extends Model
{
    //
    protected $guarded = [];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function company()
    {
        return $this->belongsTo(Company::class);
    }
    public function store()
    {
        return $this->belongsTo(Stores::class);
    }
    public function stock()
    {
        return $this->hasMany(ProductStock::class);
    }

}
