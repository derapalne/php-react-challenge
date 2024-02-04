<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'logo_url', 'company_id', 'price'];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }
}
