<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class MediaFile extends Model
{
    use HasFactory;

    /**
     * Mass assignable attributes.
     *
     * @var array
     */
    protected $fillable = [
        'filename',
        'alt_text',
        'path',
        'disk',
        'mime_type',
        'file_type',
        'size',
        'metadata',
        'status',
        'rejection_reason',
        'uploaded_by',
        'reviewed_by',
        'reviewed_at',
    ];

    /**
     * Attribute casting configuration.
     *
     * @var array
     */
    protected $casts = [
        'metadata' => 'array',
        'reviewed_at' => 'datetime',
    ];

    /**
     * Get the user who uploaded the file.
     */
    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }

    /**
     * Get the user who reviewed the file.
     */
    public function reviewer()
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }

    /**
     * Get the full URL of the file.
     */
    public function getUrlAttribute()
    {
        return Storage::disk($this->disk)->url($this->path);
    }

    /**
     * Get formatted file size.
     */
    public function getFormattedSizeAttribute()
    {
        $units = ['B', 'KB', 'MB', 'GB'];
        $bytes = $this->size;

        for ($i = 0; $bytes > 1024; $i++) {
            $bytes /= 1024;
        }

        return round($bytes, 2) . ' ' . $units[$i];
    }

    /**
     * Check if file is an image.
     */
    public function isImage()
    {
        return $this->file_type === 'image';
    }

    /**
     * Check if file is a video.
     */
    public function isVideo()
    {
        return $this->file_type === 'video';
    }

    /**
     * Check if file is a document.
     */
    public function isDocument()
    {
        return $this->file_type === 'document';
    }

    /**
     * Check if file is approved.
     */
    public function isApproved()
    {
        return $this->status === 'approved';
    }

    /**
     * Check if file is pending review.
     */
    public function isPending()
    {
        return $this->status === 'pending';
    }

    /**
     * Check if file was rejected.
     */
    public function isRejected()
    {
        return $this->status === 'rejected';
    }

    /**
     * Scope query to approved files.
     */
    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    /**
     * Scope query to pending files.
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope query by file type.
     */
    public function scopeByType($query, $type)
    {
        return $query->where('file_type', $type);
    }

    /**
     * Determine file type from MIME type.
     */
    public static function determineFileType($mimeType)
    {
        if (str_starts_with($mimeType, 'image/')) {
            return 'image';
        } elseif (str_starts_with($mimeType, 'video/')) {
            return 'video';
        } elseif (str_starts_with($mimeType, 'audio/')) {
            return 'audio';
        } elseif (in_array($mimeType, [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-powerpoint',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'text/plain',
        ])) {
            return 'document';
        } else {
            return 'other';
        }
    }

    /**
     * Extract metadata from file.
     */
    public static function extractMetadata($filePath, $mimeType)
    {
        $metadata = [];

        if (str_starts_with($mimeType, 'image/')) {
            if (function_exists('getimagesize')) {
                $imageInfo = getimagesize($filePath);
                if ($imageInfo) {
                    $metadata['width'] = $imageInfo[0];
                    $metadata['height'] = $imageInfo[1];
                    $metadata['dimensions'] = $imageInfo[0] . 'x' . $imageInfo[1];
                }
            }
        }

        return $metadata;
    }

    /**
     * Generate user-friendly filename.
     */
    public static function generateFilename($originalName)
    {
        $extension = pathinfo($originalName, PATHINFO_EXTENSION);
        $name = pathinfo($originalName, PATHINFO_FILENAME);

        return time() . '_' . \Illuminate\Support\Str::slug($name) . '.' . $extension;
    }
}
