<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class NewsCategory extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'name',
        'slug',
        'description',
    ];

    /**
     * Get the news articles that belong to the category
     */
    public function newsArticles(): HasMany
    {
        return $this->hasMany(NewsArticle::class);
    }
}
