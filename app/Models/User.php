<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'is_active',
    ];

    /**
     * The attributes that should be hidden for serialization
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'is_active' => 'boolean',
    ];

    /**
     * Check if user can upload media files
     */
    public function canUploadMedia()
    {
        return $this->hasAnyPermission(['upload_media', 'auto_approve_media', 'manage_media']);
    }

    /**
     * Check if user's uploaded media is automatically approved
     */
    public function hasAutoApproveMedia()
    {
        return $this->hasAnyPermission(['auto_approve_media', 'manage_media']);
    }

    /**
     * Check if user can review media files
     */
    public function canReviewMedia()
    {
        return $this->hasAnyPermission(['review_media', 'manage_media']);
    }

    /**
     * Check if user can edit all media files
     */
    public function canEditAllMedia()
    {
        return $this->hasAnyPermission(['edit_all_media', 'manage_media']);
    }

    /**
     * Check if user can delete all media files
     */
    public function canDeleteAllMedia()
    {
        return $this->hasAnyPermission(['delete_all_media', 'manage_media']);
    }

    /**
     * Check if user can view pending media files
     */
    public function canViewPendingMedia()
    {
        return $this->hasAnyPermission(['view_pending_media', 'review_media', 'manage_media']);
    }

    /**
     * Check if user can view users
     */
    public function canViewUsers()
    {
        return $this->hasAnyPermission(['view_users', 'manage_users']);
    }

    /**
     * Check if user can create users
     */
    public function canCreateUsers()
    {
        return $this->hasAnyPermission(['create_users', 'manage_users']);
    }

    /**
     * Check if user can edit users
     */
    public function canEditUsers()
    {
        return $this->hasAnyPermission(['edit_users', 'manage_users']);
    }

    /**
     * Check if user can delete users
     */
    public function canDeleteUsers()
    {
        return $this->hasAnyPermission(['delete_users', 'manage_users']);
    }

    /**
     * Check if user can view roles
     */
    public function canViewRoles()
    {
        return $this->hasAnyPermission(['view_roles', 'manage_roles']);
    }

    /**
     * Check if user can create roles
     */
    public function canCreateRoles()
    {
        return $this->hasAnyPermission(['create_roles', 'manage_roles']);
    }

    /**
     * Check if user can edit roles
     */
    public function canEditRoles()
    {
        return $this->hasAnyPermission(['edit_roles', 'manage_roles']);
    }

    /**
     * Check if user can delete roles
     */
    public function canDeleteRoles()
    {
        return $this->hasAnyPermission(['delete_roles', 'manage_roles']);
    }
}
