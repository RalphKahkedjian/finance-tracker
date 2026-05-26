<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = [
        'category_id',
        'title',
        'amount',
        'type',
        'date',
        'note'
    ];

    public function category() {
        return $this->belongsTo(Category::class);
    }
}
