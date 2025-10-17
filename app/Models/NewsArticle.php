<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class NewsArticle extends Model
{
    use HasFactory;

    protected $fillable = [
        'news_category_id',
        'title',
        'slug',
        'content',
        'featured_image',
        'status',
        'published_at',
        'reviewed_by',
        'reviewed_at',
        'rejection_reason',
        'uploaded_by',
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'reviewed_at' => 'datetime',
    ];

    /**
     * Get the category that owns the news article
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(NewsCategory::class, 'news_category_id');
    }

    /**
     * Generate a SEO-friendly slug from the title
     */
    public static function createSlug($title)
    {
        // Create basic slug
        $slug = Str::slug($title); // Limit the slug length for SEO optimization (around 60 characters)
        if (strlen($slug) > 60) {
            $slug = substr($slug, 0, 60); // Ensure we don't cut in the middle of a word
            $lastDash = strrpos($slug, '-');
            if ($lastDash !== false) {
                $slug = substr($slug, 0, $lastDash);
            }
        }    // Check if slug exists
        $count = static::whereRaw("slug RLIKE '^{$slug}(-[0-9]+)?$'")->count(); // If slug exists, append number
        return $count ? "{$slug}-{$count}" : $slug;
    }

    /**
     * Get the full URL for the featured image
     */
    public function getFeaturedImageUrlAttribute()
    {
        if (!$this->featured_image) {
            return null;
        }

        if (filter_var($this->featured_image, FILTER_VALIDATE_URL)) {
            return $this->featured_image;
        }

        return asset('storage/' . $this->featured_image);
    }

    /**
     * Get the user who uploaded/created the article
     */
    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }

    /**
     * Get the user who reviewed the article
     */
    public function reviewer()
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }

    /**
     * Check if article is in pending review state
     */
    public function isPending()
    {
        return $this->status === 'pending';
    }

    /**
     * Check if article is approved
     */
    public function isApproved()
    {
        return $this->status === 'published';
    }

    /**
     * Check if article is rejected
     */
    public function isRejected()
    {
        return $this->status === 'rejected';
    }

    /**
     * Get pending articles
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Get rejected articles
     */
    public function scopeRejected($query)
    {
        return $query->where('status', 'rejected');
    }

    /**
     * Get published news
     */
    public function scopePublished($query)
    {
        return $query->where('status', 'published')
            ->where('published_at', '<=', now());
    }
    /**
     * Get scheduled news
     */
    public function scopeScheduled($query)
    {
        return $query->where('status', 'scheduled')
            ->where('published_at', '>', now());
    }
    /**
     * Get draft news
     */
    public function scopeDraft($query)
    {
        return $query->where('status', 'draft');
    }
}
