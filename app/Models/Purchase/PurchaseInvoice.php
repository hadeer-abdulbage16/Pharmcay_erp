<?php

namespace App\Models\Purchase;

use Illuminate\Database\Eloquent\Model;
use App\Models\Inventory\Stores;
use App\Models\crm\Supplier;
use App\Models\Accounting\PaymentMethod;

class PurchaseInvoice extends Model
{
    //
    protected $guarded = [];

    public function items()
    {
        return $this->hasMany(PurchaseInvoiceItem::class);
    }

    public function store()
    {
        return $this->belongsTo(Stores::class , 'store_id');
    }
    public function supplier()
    {
        return $this->belongsTo(Supplier::class , 'supplier_id');
    }
    public function paymentMethod()
    {
        return $this->belongsTo(
            PaymentMethod::class, 'payment_method');
    }
   
}
