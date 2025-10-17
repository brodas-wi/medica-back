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
        Schema::create('media_files', function (Blueprint $table) {
            $table->id();
            $table->string('filename');
            $table->string('alt_text');
            $table->string('path');
            $table->string('disk')->default('public');
            $table->string('mime_type');
            $table->string('file_type'); // image, video, audio, document, other
            $table->unsignedBigInteger('size'); // in bytes
            $table->json('metadata')->nullable(); // dimensions, duration, etc.
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->text('rejection_reason')->nullable();
            $table->unsignedBigInteger('uploaded_by');
            $table->unsignedBigInteger('reviewed_by')->nullable();
            $table->timestamp('reviewed_at')->nullable();
            $table->timestamps();

            $table->foreign('uploaded_by')->references('id')->on('users');
            $table->foreign('reviewed_by')->references('id')->on('users');

            $table->index(['status', 'file_type']);
            $table->index('uploaded_by');
            $table->index('created_at');
            $table->index('alt_text');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('media_files');
    }
};
