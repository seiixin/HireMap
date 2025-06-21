<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Application;

class ApplicationsSeeder extends Seeder
{
    public function run(): void
    {
        Application::create([
            'user_id' => 1, // make sure user with ID 1 exists
            'job_title' => 'Laravel Developer',
            'status' => 'applied',
            'notes' => 'Initial application sent.',
        ]);
    }
}
