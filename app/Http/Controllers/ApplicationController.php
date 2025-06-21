<?php

namespace App\Http\Controllers;

use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ApplicationController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'job_title' => 'required|string|max:255',
            'status' => 'required|string|max:255',
            'notes' => 'nullable|string',
            'link' => 'nullable|url',
        ]);

        Application::create([
            'user_id' => Auth::id(),
            ...$validated,
        ]);

        return redirect()->back()->with('success', 'Application added successfully!');
    }

    public function update(Request $request, Application $application)
    {
        if ($application->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'job_title' => 'required|string|max:255',
            'status' => 'required|string|max:255',
            'notes' => 'nullable|string',
            'link' => 'nullable|url',
        ]);

        $application->update($validated);

        return redirect()->back()->with('success', 'Application updated successfully!');
    }

    public function destroy(Application $application)
    {
        if ($application->user_id !== Auth::id()) {
            abort(403);
        }

        $application->delete();

        return redirect()->back()->with('success', 'Application deleted successfully!');
    }
}
