<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'image_url', 'category_id', 'price', 'user_id'];

    public function scopeFilter($query, array $filters)
    {
        if ($filters['category'] ?? false) {
            $query->where('categories.name', 'like', "%{$filters['category']}%");
        }
        if ($filters['search'] ?? false) {
            $query->where('title', 'like', "%{$filters['search']}%")
                ->orWhere('description', 'like', "%{$filters['search']}%");
        }
        if ($filters['order'] ?? false) {
            if (count(explode(' ', $filters['order'])) === 2) $query->orderBy(explode(' ', 'products.' . $filters['order'])[0], explode(' ', $filters['order'])[1]);
            else $query->orderBy('products.' . $filters['order']);
        }
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
