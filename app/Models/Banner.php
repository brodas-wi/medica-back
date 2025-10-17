<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
    use HasFactory;

    /**
     * Mass assignable attributes
     */
    protected $fillable = [
        'title',
        'category',
        'description',
        'image_url',
        'primary_button_text',
        'primary_button_url',
        'secondary_button_text',
        'secondary_button_url',
        'show_category',
        'show_description',
        'show_primary_button',
        'show_secondary_button',
        'order',
        'status',
        'created_by',
        'updated_by'
    ];

    /**
     * Attribute casting
     */
    protected $casts = [
        'show_category' => 'boolean',
        'show_description' => 'boolean',
        'show_primary_button' => 'boolean',
        'show_secondary_button' => 'boolean',
        'order' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user who created the banner
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get the user who last updated the banner
     */
    public function updater()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    /**
     * Get active banners ordered by order field
     */
    public static function getActive()
    {
        return self::where('status', 'active')
            ->orderBy('order')
            ->get();
    }

    /**
     * Scope for active banners
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Get image URL with fallback
     */
    public function getImageAttribute()
    {
        return $this->image_url ?: 'https://via.placeholder.com/1200x400/123c69/ffffff?text=Banner+Image';
    }
}
