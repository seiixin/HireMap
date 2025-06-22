<?php

namespace App\Http\Controllers;

use App\Models\Application;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $applications = Application::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();

        $stats = [
            'applied' => $applications->where('status', 'applied')->count(),
            'replied' => $applications->where('status', 'replied')->count(),
            'interview' => $applications->where('status', 'interview')->count(),
            'final' => $applications->where('status', 'final')->count(),
            'offer' => $applications->where('status', 'offer')->count(),          
        ];

        return Inertia::render('Dashboard', [
            'applications' => $applications,
            'stats' => $stats,
        ]);
    }
}
