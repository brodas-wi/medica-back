<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormSubmission extends Model
{
    use HasFactory;

    /**
     * Mass assignable attributes
     */
    protected $fillable = [
        'form_id',
        'data',
    ];

    /**
     * Attribute casting
     */
    protected $casts = [
        'data' => 'array',
        'created_at' => 'datetime'
    ];

    /**
     * Get the form that owns the submission
     */
    public function form()
    {
        return $this->belongsTo(Form::class);
    }
}
