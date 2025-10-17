<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class AdminUserSeeder extends Seeder
{
    /**
     * Creates initial users with their respective roles.
     */
    public function run(): void
    {
        $adminRole = Role::where('name', 'Administrator')->first();
        $editorRole = Role::where('name', 'Editor')->first();

        // Create Admin user
        $adminEmail = env('ADMIN_EMAIL', 'admin@example.com');
        $adminUser = User::where('email', $adminEmail)->first();

        if (!$adminUser) {
            $adminUser = User::create([
                'name' => 'Admin',
                'email' => $adminEmail,
                'password' => Hash::make(env('ADMIN_PASSWORD', 'Admin123!')),
                'is_active' => true,
            ]);

            $adminUser->assignRole($adminRole);
            $this->command->info('Admin user created successfully.');
        } else {
            $adminUser->syncRoles($adminRole);
            $this->command->info('Admin user already exists, role synced.');
        }

        // Create Editor user
        $editorEmail = env('EDITOR_EMAIL', 'editor@example.com');
        $editorUser = User::where('email', $editorEmail)->first();

        if (!$editorUser) {
            $editorUser = User::create([
                'name' => 'Editor',
                'email' => $editorEmail,
                'password' => Hash::make(env('EDITOR_PASSWORD', 'Editor123!')),
                'is_active' => true,
            ]);

            $editorUser->assignRole($editorRole);
            $this->command->info('Editor user created successfully.');
        } else {
            $editorUser->syncRoles($editorRole);
            $this->command->info('Editor user already exists, role synced.');
        }
    }
}
