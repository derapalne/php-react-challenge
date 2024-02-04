<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'image_url', 'company_id', 'price', 'user_id'];

    public function scopeFilter($query, array $filters)
    {
        if ($filters['company'] ?? false) {
            $query->join('companies', 'products.company_id', '=', 'companies.id')
            ->where('companies.name', 'like', "%{$filters['company']}%");
        }
        if ($filters['search'] ?? false) {
            $query->where('title', 'like', "%{$filters['search']}%")
                ->orWhere('description', 'like', "%{$filters['search']}%");
        }
    }

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
