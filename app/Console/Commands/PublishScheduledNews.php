<?php

namespace App\Console\Commands;

use App\Models\NewsArticle;
use Illuminate\Console\Command;

class PublishScheduledNews extends Command
{
    protected $signature = 'news:publish-scheduled';
    protected $description = 'Publish scheduled news articles that have reached their publish date';

    public function handle()
    {
        $articles = NewsArticle::where('status', 'scheduled')
            ->where('published_at', '<=', now())
            ->get();

        $count = 0;
        foreach ($articles as $article) {
            $article->update(['status' => 'published']);
            $count++;
            $this->info("Published: {$article->title}");
        }

        $this->info("Total articles published: {$count}");
        return Command::SUCCESS;
    }
}
