<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomBlock extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'category',
        'html_content',
        'css_content',
        'js_content',
        'admin_js',
        'icon_type',
        'icon',
        'settings',
        'active'
    ];

    protected $casts = [
        'settings' => 'array',
        'active' => 'boolean'
    ];

    /**
     * Obtener todas las categorías únicas
     */
    public static function getCategories()
    {
        return self::select('category')->distinct()->pluck('category');
    }
}
