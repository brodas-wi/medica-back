<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pages', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->longText('content')->nullable();
            $table->longText('css')->nullable();
            $table->longText('js')->nullable();
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft');

            // Navbar and Footer relationships
            $table->foreignId('navbar_id')->nullable()->constrained('navbars')->onDelete('set null');
            $table->foreignId('footer_id')->nullable()->constrained('footers')->onDelete('set null');

            // Published date tracking
            $table->timestamp('published_at')->nullable();

            // User relationships
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->foreignId('updated_by')->constrained('users')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pages');
    }
};
