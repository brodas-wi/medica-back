<?php

namespace Database\Seeders;

use App\Models\NewsCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class NewsCategoriesSeeder extends Seeder
{
    /**
     * Seeds predefined news categories for the CMS
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Finanzas Personales',
                'description' => 'Consejos de inversión, ahorro y planificación financiera personal',
            ],
            [
                'name' => 'Actualidad Económica',
                'description' => 'Análisis de tendencias del mercado, indicadores financieros y noticias económicas',
            ],
            [
                'name' => 'Servicios Bancarios',
                'description' => 'Información sobre productos financieros, créditos y servicios bancarios',
            ],
            [
                'name' => 'Inversiones y Patrimonio',
                'description' => 'Estrategias para la gestión patrimonial, diversificación de inversiones y rendimientos',
            ],
            [
                'name' => 'Emprendimiento y Negocios',
                'description' => 'Recursos para el desarrollo empresarial, gestión de negocios y oportunidades de mercado',
            ],
        ];

        foreach ($categories as $category) {
            NewsCategory::firstOrCreate([
                'name' => $category['name'],
            ], [
                'slug' => Str::slug($category['name']),
                'description' => $category['description'],
            ]);

            $this->command->info("Categoría creada o verificada: {$category['name']}");
        }
    }
}
