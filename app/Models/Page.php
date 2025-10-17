<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    use HasFactory;

    /**
     * Mass assignable attributes
     */
    protected $fillable = [
        'title',
        'slug',
        'content',
        'css',
        'js',
        'status',
        'navbar_id',
        'footer_id',
        'created_by',
        'updated_by'
    ];

    /**
     * Attribute casting
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'published_at' => 'datetime',
    ];

    /**
     * Get the user who created the page
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get the user who last updated the page
     */
    public function updater()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    /**
     * Get the associated navbar
     */
    public function navbar()
    {
        return $this->belongsTo(Navbar::class);
    }

    /**
     * Get the associated footer
     */
    public function footer()
    {
        return $this->belongsTo(Footer::class);
    }

    /**
     * Get all active scripts for this page
     */
    public function getActiveScripts($location = null)
    {
        $query = \App\Models\Script::where('is_active', true)
            ->where(function ($q) {
                $q->where('scope', 'global')
                    ->orWhere(function ($q2) {
                        $q2->where('scope', 'specific')
                            ->whereJsonContains('page_ids', (string) $this->id);
                    });
            })
            ->orderBy('priority');

        if ($location) {
            $query->where('location', $location);
        }

        return $query->get();
    }

    /**
     * Get the public URL for the page
     */
    public function getViewUrlAttribute()
    {
        return route('pages.public', $this->slug);
    }

    /**
     * Get the edit URL for the page
     */
    public function getEditUrlAttribute()
    {
        return route('editor.edit', $this->id);
    }

    /**
     * Get the settings URL for the page
     */
    public function getSettingsUrlAttribute()
    {
        return route('pages.settings', $this->id);
    }
}
