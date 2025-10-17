<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Promotion extends Model
{
    use HasFactory;

    // Mass assignable attributes
    protected $fillable = [
        'title',
        'short_description',
        'long_description',
        'category',
        'image_url',
        'active_days',
        'end_date',
        'order',
        'status',
        'created_by',
        'updated_by',
    ];

    // Attribute casting
    protected $casts = [
        'end_date' => 'date',
        'active_days' => 'array',
        'order' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // Get user who created the promotion
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    // Get user who last updated the promotion
    public function updater()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    // Get active promotions ordered by order field
    public static function getActive()
    {
        return self::where('status', 'active')
            ->where(function ($query) {
                $query->whereNull('end_date')
                    ->orWhere('end_date', '>=', Carbon::today());
            })
            ->orderBy('order')
            ->get();
    }

    // Scope for active promotions
    public function scopeActive($query)
    {
        return $query->where('status', 'active')
            ->where(function ($q) {
                $q->whereNull('end_date')
                    ->orWhere('end_date', '>=', Carbon::today());
            });
    }

    // Check if promotion is active today
    public function isActiveToday()
    {
        if ($this->status !== 'active') {
            return false;
        }

        if ($this->isExpired()) {
            return false;
        }

        if (empty($this->active_days)) {
            return true;
        }

        $today = strtolower(Carbon::now()->locale('es')->dayName);
        $dayMapping = [
            'lunes' => 'monday',
            'martes' => 'tuesday',
            'miércoles' => 'wednesday',
            'jueves' => 'thursday',
            'viernes' => 'friday',
            'sábado' => 'saturday',
            'domingo' => 'sunday'
        ];

        $todayEnglish = array_search($today, $dayMapping) ?: $today;

        return in_array($todayEnglish, $this->active_days);
    }

    // Get active days label in Spanish
    public function getActiveDaysLabelAttribute()
    {
        if (empty($this->active_days)) {
            return 'Todos los días';
        }

        $dayNames = [
            'monday' => 'Lunes',
            'tuesday' => 'Martes',
            'wednesday' => 'Miércoles',
            'thursday' => 'Jueves',
            'friday' => 'Viernes',
            'saturday' => 'Sábado',
            'sunday' => 'Domingo'
        ];

        $activeDayNames = array_map(function ($day) use ($dayNames) {
            return $dayNames[$day] ?? $day;
        }, $this->active_days);

        return implode(', ', $activeDayNames);
    }

    // Get image URL with fallback
    public function getImageAttribute()
    {
        return $this->image_url ?: 'https://via.placeholder.com/600x350/23366A/ffffff?text=Promocion';
    }

    // Get remaining days for promotion
    public function getRemainingDaysAttribute()
    {
        if (!$this->end_date) {
            return null;
        }

        $days = Carbon::today()->diffInDays($this->end_date, false);
        return $days > 0 ? $days : 0;
    }

    // Check if promotion is still valid
    public function isValid()
    {
        if (!$this->end_date) {
            return true;
        }

        return Carbon::today()->lte($this->end_date);
    }

    // Get all unique categories
    public static function getCategories()
    {
        return self::select('category')
            ->distinct()
            ->whereNotNull('category')
            ->where('category', '!=', '')
            ->orderBy('category')
            ->pluck('category');
    }
}
