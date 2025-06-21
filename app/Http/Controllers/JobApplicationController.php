<?php
namespace App\Http\Controllers;

use App\Models\JobApplication;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobApplicationController extends Controller
{
    public function index()
    {
        $jobs = JobApplication::latest()->get();

        $stats = [
            'totalApplied' => $jobs->where('applied', true)->count(),
            'replied' => $jobs->where('replied', true)->count(),
            'interviews' => $jobs->where('interview', true)->count(),
            'finalInterviews' => $jobs->where('final_interview', true)->count(),
            'offers' => $jobs->where('job_offer', true)->count(),
        ];

        return Inertia::render('Dashboard', [
            'jobs' => $jobs,
            'stats' => $stats,
        ]);
    }
}
