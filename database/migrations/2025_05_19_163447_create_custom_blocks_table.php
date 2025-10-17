<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('custom_blocks', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('category');
            $table->text('html_content'); // Contenido HTML del bloque
            $table->text('css_content')->nullable(); // CSS opcional específico para el bloque
            $table->text('js_content')->nullable(); // JavaScript para funcionalidad del bloque
            $table->text('admin_js')->nullable(); // JavaScript para el panel de administración en GrapesJS
            $table->string('icon_type')->default('remix'); // 'remix' o 'svg'
            $table->string('icon')->nullable(); // Nombre del icono o URL del SVG
            $table->json('settings')->nullable(); // Configuraciones adicionales en JSON
            $table->boolean('active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('custom_blocks');
    }
};
