<?php

namespace App\Models\Invoice;

use Illuminate\Database\Eloquent\Model;

class settings extends Model
{
    //
    protected $guarded = [];

    public function store()
    {
        return $this->belongsTo(\App\Models\Store::class, 'store_id');
    }
}
