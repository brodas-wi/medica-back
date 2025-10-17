<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    /**
     * Los atributos que son asignables en masa.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'description',
    ];

    /**
     * Obtiene los usuarios que tienen este rol.
     */
    public function users()
    {
        return $this->hasMany(User::class);
    }

    /**
     * Obtiene los permisos asignados a este rol.
     */
    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'role_permission');
    }

    /**
     * Verifica si el rol tiene un permiso específico.
     *
     * @param string $permissionName
     * @return bool
     */
    public function hasPermissionTo($permissionName)
    {
        return $this->permissions()->where('name', $permissionName)->exists();
    }
}
