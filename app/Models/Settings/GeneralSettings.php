<?php

namespace App\Models\Settings;

use App\Models\Inventory\Stores;
use Illuminate\Database\Eloquent\Model;

class GeneralSettings extends Model
{
     protected $guarded = [];

     public function stories(){
          return $this->belongsTo(Stores::class, 'branch_id', 'id');
          
     }
}
