<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Exception;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration form.
     */
    public function create()
    {
        // Debug log
        Log::info('Register page accessed');

        // First test with simple response
        // return response()->json(['message' => 'Register route works']);

        // Then test with Inertia
        try {
            return Inertia::render('Auth/Register');
        } catch (Exception $e) {
            Log::error('Register page error: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Handle registration form submission.
     */
    public function store(Request $request)
    {
        try {
            // Log the incoming request for debugging
            Log::info('Registration attempt', [
                'email' => $request->email,
                'name' => $request->name,
                'has_password' => !empty($request->password),
                'has_password_confirmation' => !empty($request->password_confirmation)
            ]);

            // Validate form input
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|string|min:8|confirmed',
            ]);

            Log::info('Validation passed', ['validated_data' => array_keys($validated)]);

            // Create new user
            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
            ]);

            Log::info('User created successfully', ['user_id' => $user->id]);

            // Log the user in
            Auth::login($user);

            Log::info('User logged in successfully', ['user_id' => $user->id]);

            // Redirect to dashboard (skip email verification for now)
            return redirect()->route('dashboard')->with('success', 'Account created successfully.');

        } catch (Exception $e) {
            Log::error('Registration failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            // Return back with error message
            return back()->withErrors([
                'registration' => 'Registration failed: ' . $e->getMessage()
            ])->withInput($request->except('password', 'password_confirmation'));
        }
    }
}
