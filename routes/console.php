<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Existing schedules
Schedule::command('news:publish-scheduled')->everyMinute();

// Promotion auto-deactivation schedule
Schedule::command('promotions:deactivate-expired')
    ->daily()
    ->at('00:01')
    ->withoutOverlapping()
    ->runInBackground();

// Alternative options (uncomment the one you prefer):

// Run every hour instead of daily
// Schedule::command('promotions:deactivate-expired')
//     ->hourly()
//     ->withoutOverlapping();

// Run every 6 hours
// Schedule::command('promotions:deactivate-expired')
//     ->everySixHours()
//     ->withoutOverlapping();