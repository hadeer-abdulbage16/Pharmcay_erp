<?php

namespace App\Models\crm;

use Illuminate\Database\Eloquent\Model;
use App\Models\Accounts\Ledger;

class GroupMaster extends Model
{
    protected $guarded = [];

    public function parent()
    {
        return $this->belongsTo(GroupMaster::class, 'parent_id');
    }
    public function children()
    {
        return $this->hasMany(GroupMaster::class, 'parent_id');
    }
  
}
