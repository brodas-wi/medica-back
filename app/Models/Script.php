<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Script extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'code',
        'location',
        'is_active',
        'priority',
        'scope',
        'page_ids',
        'created_by',
        'updated_by'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'priority' => 'integer',
        'page_ids' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user who created the script
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get the user who last updated the script
     */
    public function updater()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    /**
     * Get pages associated with this script
     */
    public function pages()
    {
        return $this->belongsToMany(Page::class, 'page_ids');
    }

    /**
     * Check if script applies to a specific page
     */
    public function appliesTo($pageId)
    {
        if ($this->scope === 'global') {
            return true;
        }

        if ($this->scope === 'specific' && is_array($this->page_ids)) {
            return in_array($pageId, $this->page_ids);
        }

        return false;
    }
}
