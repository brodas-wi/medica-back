<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the seeds to create permissions with Spanish descriptions and more granular access control.
     */
    public function run(): void
    {
        app()->make(\Spatie\Permission\PermissionRegistrar::class)->forgetCachedPermissions();

        // Define permissions with descriptions
        $permissions = [
            // Dashboard
            'view_dashboard' => 'Ver el panel de control principal',
            // Users
            'view_users' => 'Ver lista de usuarios',
            'create_users' => 'Crear nuevos usuarios',
            'edit_users' => 'Editar información de usuarios',
            'delete_users' => 'Eliminar usuarios',
            'manage_users' => 'Gestión completa de usuarios',
            // Roles
            'view_roles' => 'Ver lista de roles',
            'create_roles' => 'Crear nuevos roles',
            'edit_roles' => 'Editar roles existentes',
            'delete_roles' => 'Eliminar roles',
            'manage_roles' => 'Gestión completa de roles',
            // News Categories
            'view_news_categories' => 'Ver categorías de noticias',
            'create_news_categories' => 'Crear categorías de noticias',
            'edit_news_categories' => 'Editar categorías de noticias',
            'delete_news_categories' => 'Eliminar categorías de noticias',
            'manage_news_categories' => 'Gestión completa de categorías de noticias',
            // News Articles
            'view_news' => 'Ver noticias',
            'create_news' => 'Crear noticias',
            'edit_news' => 'Editar noticias propias',
            'delete_news' => 'Eliminar noticias propias',
            'edit_all_news' => 'Editar todas las noticias',
            'delete_all_news' => 'Eliminar todas las noticias',
            'review_news' => 'Revisar y aprobar/rechazar noticias',
            'auto_approve_news' => 'Aprobar automáticamente noticias propias',
            'manage_news' => 'Gestión completa de noticias',
            // Pages
            'view_pages' => 'Ver páginas del sitio',
            'create_pages' => 'Crear nuevas páginas',
            'edit_pages' => 'Editar páginas existentes',
            'publish_pages' => 'Publicar páginas',
            'delete_pages' => 'Eliminar páginas',
            'manage_pages' => 'Gestión completa de páginas',
            // Banners
            'view_banners' => 'Ver banners del sitio',
            'create_banners' => 'Crear nuevos banners',
            'edit_banners' => 'Editar banners existentes',
            'delete_banners' => 'Eliminar banners',
            'manage_banners' => 'Gestión completa de banners',
            // Promotions
            'view_promotions' => 'Ver promociones del sitio',
            'create_promotions' => 'Crear nuevas promociones',
            'edit_promotions' => 'Editar promociones existentes',
            'delete_promotions' => 'Eliminar promociones',
            'toggle_promotions' => 'Activar/desactivar promociones',
            'manage_promotions' => 'Gestión completa de promociones',
            // Forms
            'view_forms' => 'Ver formularios del sitio',
            'create_forms' => 'Crear nuevos formularios',
            'edit_forms' => 'Editar formularios existentes',
            'delete_forms' => 'Eliminar formularios',
            'manage_forms' => 'Gestión completa de formularios',
            // Navbars
            'view_navbars' => 'Ver menús de navegación',
            'create_navbars' => 'Crear nuevos menús',
            'edit_navbars' => 'Editar menús existentes',
            'publish_navbars' => 'Publicar menús',
            'delete_navbars' => 'Eliminar menús',
            'manage_navbars' => 'Gestión completa de menús',
            // Footers
            'view_footers' => 'Ver pies de página',
            'create_footers' => 'Crear nuevos pies de página',
            'edit_footers' => 'Editar pies de página existentes',
            'publish_footers' => 'Publicar pies de página',
            'delete_footers' => 'Eliminar pies de página',
            'manage_footers' => 'Gestión completa de pies de página',
            // Scripts
            'view_scripts' => 'Ver scripts del sitio',
            'create_scripts' => 'Crear nuevos scripts',
            'edit_scripts' => 'Editar scripts existentes',
            'delete_scripts' => 'Eliminar scripts',
            'toggle_scripts' => 'Activar/desactivar scripts',
            'manage_scripts' => 'Gestión completa de scripts',
            // Custom Blocks
            'view_blocks' => 'Ver bloques personalizados',
            'create_blocks' => 'Crear nuevos bloques',
            'edit_blocks' => 'Editar bloques existentes',
            'delete_blocks' => 'Eliminar bloques',
            'toggle_blocks' => 'Activar/desactivar bloques',
            'manage_blocks' => 'Gestión completa de bloques',
            // Media
            'view_media' => 'Ver archivos multimedia',
            'upload_media' => 'Subir archivos multimedia',
            'auto_approve_media' => 'Aprobar automáticamente archivos',
            'edit_all_media' => 'Editar todos los archivos multimedia',
            'delete_all_media' => 'Eliminar archivos multimedia',
            'review_media' => 'Revisar archivos multimedia',
            'view_pending_media' => 'Ver archivos pendientes de aprobación'
        ];

        foreach ($permissions as $permission => $description) {
            Permission::firstOrCreate([
                'name' => $permission,
                'guard_name' => 'web'
            ], [
                'description' => $description
            ]);
            $this->command->info("Permiso creado o verificado: $permission");
        }

        // Create or update roles with descriptions
        $adminRole = Role::firstOrCreate(
            ['name' => 'Administrator', 'guard_name' => 'web'],
            ['description' => 'Administrador con acceso completo al sistema']
        );

        $editorRole = Role::firstOrCreate(
            ['name' => 'Editor', 'guard_name' => 'web'],
            ['description' => 'Editor con permisos para gestionar contenido']
        );

        $this->command->info('Roles creados o verificados: Administrator, Editor');

        // Assign all permissions to admin
        $adminRole->syncPermissions(Permission::all());
        $this->command->info('Todos los permisos asignados al rol Administrator');

        // Editor permissions
        $editorPermissions = [
            'view_dashboard',
            'view_users',
            'view_roles',
            'view_pages',
            'create_pages',
            'edit_pages',
            'publish_pages',
            'view_banners',
            'create_banners',
            'edit_banners',
            'view_promotions',
            'create_promotions',
            'edit_promotions',
            'view_forms',
            'create_forms',
            'edit_forms',
            'view_navbars',
            'create_navbars',
            'edit_navbars',
            'view_footers',
            'create_footers',
            'edit_footers',
            'view_scripts',
            'create_scripts',
            'edit_scripts',
            'view_blocks',
            'create_blocks',
            'edit_blocks',
            'view_media',
            'upload_media',
            'view_news_categories',
            'create_news_categories',
            'edit_news_categories',
            'view_news',
            'create_news',
            'edit_news',
            'delete_news',
        ];

        $editorRole->syncPermissions($editorPermissions);
        $this->command->info('Permisos asignados al rol Editor');
    }
}
