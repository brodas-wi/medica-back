<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Navbar extends Model
{
    use HasFactory;

    /**
     * Los atributos que son asignables en masa.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'slug',
        'content',
        'css',
        'js',
        'components',
        'status',
        'created_by',
        'updated_by'
    ];

    /**
     * Los atributos que deben convertirse.
     *
     * @var array
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'components' => 'json',
    ];

    /**
     * Obtiene el usuario que creó la barra de navegación.
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Obtiene el usuario que actualizó la barra de navegación por última vez.
     */
    public function updater()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    /**
     * Obtiene la URL para editar la barra de navegación.
     */
    public function getEditUrlAttribute()
    {
        return route('navbar.editor.edit', $this->id);
    }
}
