<?php

namespace App\Console\Commands;

use App\Models\Promotion;
use Carbon\Carbon;
use Illuminate\Console\Command;

class DeactivateExpiredPromotions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'promotions:deactivate-expired';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Deactivate all expired promotions automatically';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Checking for expired promotions...');

        // Get all active promotions with end_date in the past
        $expiredPromotions = Promotion::where('status', 'active')
            ->whereNotNull('end_date')
            ->where('end_date', '<', Carbon::today())
            ->get();

        if ($expiredPromotions->isEmpty()) {
            $this->info('No expired promotions found.');
            return 0;
        }

        $count = $expiredPromotions->count();
        $this->info("Found {$count} expired promotion(s).");

        // Deactivate each expired promotion
        foreach ($expiredPromotions as $promotion) {
            $promotion->update([
                'status' => 'inactive',
                'updated_by' => null // System update
            ]);

            $this->line("- Deactivated: {$promotion->title} (expired on {$promotion->end_date->format('Y-m-d')})");
        }

        $this->info("Successfully deactivated {$count} promotion(s).");
        return 0;
    }
}
