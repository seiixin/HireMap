<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobApplication extends Model
{
    use HasFactory;

    // Mass-assignable fields
    protected $fillable = [
        'link',
        'job_title',
        'applied',
        'replied',
        'interview',
        'final_interview',
        'job_offer',
    ];

    // (Optional) Cast booleans for status fields
    protected $casts = [
        'applied' => 'boolean',
        'replied' => 'boolean',
        'interview' => 'boolean',
        'final_interview' => 'boolean',
        'job_offer' => 'boolean',
    ];
}
