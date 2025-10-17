<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Form extends Model
{
    use HasFactory;

    /**
     * Mass assignable attributes
     */
    protected $fillable = [
        'title',
        'slug',
        'description',
        'fields',
        'submit_button_text',
        'success_message',
        'redirect_url',
        'status',
        'order',
        'created_by',
        'updated_by'
    ];

    /**
     * Attribute casting
     */
    protected $casts = [
        'fields' => 'array',
        'order' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user who created the form
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get the user who last updated the form
     */
    public function updater()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    /**
     * Scope for active forms
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Get active forms ordered by order field
     */
    public static function getActive()
    {
        return self::where('status', 'active')
            ->orderBy('order')
            ->get();
    }

    /**
     * Get form submissions
     */
    public function submissions()
    {
        return $this->hasMany(FormSubmission::class);
    }
}
