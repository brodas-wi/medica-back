<?php

use App\Http\Controllers\CustomBlockController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FooterController;
use App\Http\Controllers\FooterEditorController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\NavbarController;
use App\Http\Controllers\NavbarEditorController;
use App\Http\Controllers\NewsDashboardController;
use App\Http\Controllers\NewsCategoryController;
use App\Http\Controllers\NewsArticleController;
use App\Models\Page;
use App\Http\Controllers\PageController;
use App\Http\Controllers\PageEditorController;
use App\Http\Controllers\PromotionController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\ScriptController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FormController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

// Main route redirect to login
Route::get('/', function () {
    return redirect()->route('login');
});

// Authentication routes
Auth::routes(['register' => false]);  // Disable registration

Route::redirect('/home', '/dashboard');

// Protected routes
Route::middleware(['auth'])->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->middleware('permission:view_dashboard')
        ->name('dashboard');

    // Profile routes - accessible to all authenticated users
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::put('/profile/password', [ProfileController::class, 'updatePassword'])->name('profile.password.update');
    Route::get('/profile/generate-password', [ProfileController::class, 'generatePassword'])->name('profile.generate.password');

    // User management
    Route::group(['prefix' => 'users', 'middleware' => 'auth'], function () {
        Route::get('/', [UserController::class, 'index'])->name('users.index');
        Route::get('/create', [UserController::class, 'create'])->name('users.create');
        Route::post('/', [UserController::class, 'store'])->name('users.store');
        Route::get('/{user}', [UserController::class, 'show'])->name('users.show');
        Route::get('/{user}/edit', [UserController::class, 'edit'])->name('users.edit');
        Route::put('/{user}', [UserController::class, 'update'])->name('users.update');
        Route::delete('/{user}', [UserController::class, 'destroy'])->name('users.destroy');
    });

    Route::post('admin/verify-password', [UserController::class, 'verifyAdminPassword'])->name('admin.verify-password');

    // Role management
    Route::group(['prefix' => 'roles', 'middleware' => 'auth'], function () {
        Route::get('/', [RoleController::class, 'index'])->name('roles.index');
        Route::get('/create', [RoleController::class, 'create'])->name('roles.create');
        Route::post('/', [RoleController::class, 'store'])->name('roles.store');
        Route::get('/{role}', [RoleController::class, 'show'])->name('roles.show');
        Route::get('/{role}/edit', [RoleController::class, 'edit'])->name('roles.edit');
        Route::put('/{role}', [RoleController::class, 'update'])->name('roles.update');
        Route::delete('/{role}', [RoleController::class, 'destroy'])->name('roles.destroy');

        // Permissions management
        Route::get('/{role}/permissions', [RoleController::class, 'permissions'])->name('roles.permissions');
        Route::post('/{role}/permissions', [RoleController::class, 'updatePermissions'])->name('roles.permissions.update');
    });

    // News Categories
    Route::group(['prefix' => 'news/categories', 'middleware' => ['auth', 'permission:view_news_categories|manage_news_categories']], function () {
        Route::get('/', [NewsCategoryController::class, 'index'])->name('news.categories.index');
        Route::get('/create', [NewsCategoryController::class, 'create'])->middleware('permission:create_news_categories|manage_news_categories')->name('news.categories.create');
        Route::post('/', [NewsCategoryController::class, 'store'])->middleware('permission:create_news_categories|manage_news_categories')->name('news.categories.store');
        Route::get('/{category}', [NewsCategoryController::class, 'show'])->name('news.categories.show');
        Route::get('/{category}/edit', [NewsCategoryController::class, 'edit'])->middleware('permission:edit_news_categories|manage_news_categories')->name('news.categories.edit');
        Route::put('/{category}', [NewsCategoryController::class, 'update'])->middleware('permission:edit_news_categories|manage_news_categories')->name('news.categories.update');
        Route::delete('/{category}', [NewsCategoryController::class, 'destroy'])->middleware('permission:delete_news_categories|manage_news_categories')->name('news.categories.destroy');
    });

    // News Articles
    Route::group(['prefix' => 'news/articles', 'middleware' => ['auth', 'permission:view_news|manage_news']], function () {
        Route::get('/', [NewsArticleController::class, 'index'])->name('news.articles.index');
        Route::get('/create', [NewsArticleController::class, 'create'])->middleware('permission:create_news|manage_news')->name('news.articles.create');
        Route::post('/', [NewsArticleController::class, 'store'])->middleware('permission:create_news|manage_news')->name('news.articles.store');
        Route::get('/{article}', [NewsArticleController::class, 'show'])->name('news.articles.show');
        Route::get('/{article}/review', [NewsArticleController::class, 'review'])->name('news.articles.review');
        Route::get('/{article}/edit', [NewsArticleController::class, 'edit'])->name('news.articles.edit');
        Route::put('/{article}', [NewsArticleController::class, 'update'])->name('news.articles.update');
        Route::delete('/{article}', [NewsArticleController::class, 'destroy'])->name('news.articles.destroy');
    });

    // News Dashboard
    Route::get('news/dashboard', [NewsDashboardController::class, 'index'])->middleware(['auth', 'permission:view_news|manage_news'])->name('news.dashboard');

    // Rutas de aprobación/rechazo
    Route::post('news/articles/{article}/approve', [NewsArticleController::class, 'approve'])->middleware(['auth', 'permission:review_news|manage_news'])->name('news.articles.approve');
    Route::post('news/articles/{article}/reject', [NewsArticleController::class, 'reject'])->middleware(['auth', 'permission:review_news|manage_news'])->name('news.articles.reject');

    // Public news routes
    Route::get('/noticias', [NewsArticleController::class, 'listArticles'])->name('news.index');
    Route::get('/noticias/{slug}', [NewsArticleController::class, 'showArticle'])->name('news.show');

    // Page management
    Route::group(['prefix' => 'pages', 'middleware' => 'auth'], function () {
        Route::get('/', [PageController::class, 'index'])->name('pages.index');
        Route::get('/create', [PageController::class, 'create'])->name('pages.create');
        Route::post('/', [PageController::class, 'store'])->name('pages.store');
        Route::get('/{page}', [PageController::class, 'show'])->name('pages.show');
        Route::get('/{page}/edit', [PageController::class, 'edit'])->name('pages.edit');
        Route::put('/{page}', [PageController::class, 'update'])->name('pages.update');
        Route::post('/{page}/duplicate', [PageController::class, 'duplicate'])->name('pages.duplicate');
        Route::get('/{page}/preview', [PageController::class, 'preview'])->name('pages.preview');
        Route::post('/{page}/publish', [PageController::class, 'publish'])->name('pages.publish');
        Route::post('/{page}/unpublish', [PageController::class, 'unpublish'])->name('pages.unpublish');
        Route::delete('/{page}', [PageController::class, 'destroy'])->name('pages.destroy');
        Route::get('/{page}/settings', [PageController::class, 'settings'])->name('pages.settings');
        Route::put('/{page}/settings', [PageController::class, 'updateSettings'])->name('pages.settings.update');
    });

    // Page editor
    Route::group(['prefix' => 'editor', 'middleware' => 'auth'], function () {
        Route::get('/new', [PageEditorController::class, 'edit'])->name('editor.new');
        Route::get('/{id}', [PageEditorController::class, 'edit'])->name('editor.edit');
    });

    // Navbar management
    Route::group(['prefix' => 'navbars', 'middleware' => 'auth'], function () {
        Route::get('/', [NavbarController::class, 'index'])->name('navbars.index');
        Route::get('/create', [NavbarController::class, 'create'])->name('navbars.create');
        Route::post('/', [NavbarController::class, 'store'])->name('navbars.store');
        Route::get('/{navbar}', [NavbarController::class, 'show'])->name('navbars.show');
        Route::get('/{navbar}/edit', [NavbarController::class, 'edit'])->name('navbars.edit');
        Route::put('/{navbar}', [NavbarController::class, 'update'])->name('navbars.update');
        Route::get('/{navbar}/preview', [NavbarController::class, 'preview'])->name('navbars.preview');
        Route::post('/{navbar}/publish', [NavbarController::class, 'publish'])->name('navbars.publish');
        Route::post('/{navbar}/unpublish', [NavbarController::class, 'unpublish'])->name('navbars.unpublish');
        Route::delete('/{navbar}', [NavbarController::class, 'destroy'])->name('navbars.destroy');
    });

    // Navbar editor
    Route::group(['prefix' => 'navbar-editor', 'middleware' => 'auth'], function () {
        Route::get('/new', [NavbarEditorController::class, 'edit'])->name('navbar.editor.new');
        Route::get('/{id}', [NavbarEditorController::class, 'edit'])->name('navbar.editor.edit');
    });

    // Footer management
    Route::group(['prefix' => 'footers', 'middleware' => 'auth'], function () {
        Route::get('/', [FooterController::class, 'index'])->name('footers.index');
        Route::get('/create', [FooterController::class, 'create'])->name('footers.create');
        Route::post('/', [FooterController::class, 'store'])->name('footers.store');
        Route::get('/{footer}', [FooterController::class, 'show'])->name('footers.show');
        Route::get('/{footer}/edit', [FooterController::class, 'edit'])->name('footers.edit');
        Route::put('/{footer}', [FooterController::class, 'update'])->name('footers.update');
        Route::get('/{footer}/preview', [FooterController::class, 'preview'])->name('footers.preview');
        Route::post('/{footer}/publish', [FooterController::class, 'publish'])->name('footers.publish');
        Route::delete('/{footer}', [FooterController::class, 'destroy'])->name('footers.destroy');
    });

    // Footer editor
    Route::group(['prefix' => 'footer-editor', 'middleware' => 'auth'], function () {
        Route::get('/new', [FooterEditorController::class, 'edit'])->name('footer.editor.new');
        Route::get('/{id}', [FooterEditorController::class, 'edit'])->name('footer.editor.edit');
    });

    // Scripts management
    Route::group(['prefix' => 'scripts', 'middleware' => 'auth'], function () {
        Route::get('/', [ScriptController::class, 'index'])->name('scripts.index');
        Route::get('/create', [ScriptController::class, 'create'])->name('scripts.create');
        Route::post('/', [ScriptController::class, 'store'])->name('scripts.store');
        Route::get('/{script}', [ScriptController::class, 'show'])->name('scripts.show');
        Route::get('/{script}/preview', [ScriptController::class, 'preview'])->name('scripts.preview');
        Route::get('/{script}/edit', [ScriptController::class, 'edit'])->name('scripts.edit');
        Route::put('/{script}', [ScriptController::class, 'update'])->name('scripts.update');
        Route::delete('/{script}', [ScriptController::class, 'destroy'])->name('scripts.destroy');
        Route::post('/{script}/toggle', [ScriptController::class, 'toggleStatus'])->name('scripts.toggle');
    });

    // Custom blocks management
    Route::group(['prefix' => 'custom-blocks', 'middleware' => 'auth'], function () {
        Route::get('/', [CustomBlockController::class, 'index'])->name('custom-blocks.index');
        Route::get('/create', [CustomBlockController::class, 'create'])->name('custom-blocks.create');
        Route::post('/', [CustomBlockController::class, 'store'])->name('custom-blocks.store');
        Route::get('/{customBlock}', [CustomBlockController::class, 'show'])->name('custom-blocks.show');
        Route::get('/{customBlock}/edit', [CustomBlockController::class, 'edit'])->name('custom-blocks.edit');
        Route::put('/{customBlock}', [CustomBlockController::class, 'update'])->name('custom-blocks.update');
        Route::delete('/{customBlock}', [CustomBlockController::class, 'destroy'])->name('custom-blocks.destroy');
        Route::post('/{customBlock}/toggle', [CustomBlockController::class, 'toggleStatus'])->name('custom-blocks.toggle');
    });

    // Promotion management
    Route::resource('promotions', PromotionController::class);
    Route::post('/promotions/{promotion}/toggle', [PromotionController::class, 'toggleStatus'])->name('promotions.toggle');

    // Banner management
    Route::group(['prefix' => 'banners', 'middleware' => 'auth'], function () {
        Route::get('/', [BannerController::class, 'index'])->name('banners.index');
        Route::get('/create', [BannerController::class, 'create'])->name('banners.create');
        Route::post('/', [BannerController::class, 'store'])->name('banners.store');
        Route::get('/{banner}/edit', [BannerController::class, 'edit'])->name('banners.edit');
        Route::put('/{banner}', [BannerController::class, 'update'])->name('banners.update');
        Route::delete('/{banner}', [BannerController::class, 'destroy'])->name('banners.destroy');
        Route::post('/update-order', [BannerController::class, 'updateOrder'])->name('banners.update-order');
    });

    // Media files management - IMPORTANTE: rutas estáticas antes de rutas con parámetros
    Route::group(['prefix' => 'media', 'middleware' => 'auth'], function () {
        Route::get('/', [MediaController::class, 'index'])->name('media.index');
        Route::get('/create', [MediaController::class, 'create'])->name('media.create');
        Route::post('/', [MediaController::class, 'store'])->name('media.store');
        Route::get('/{media}', [MediaController::class, 'show'])->name('media.show');
        Route::get('/{media}/edit', [MediaController::class, 'edit'])->name('media.edit');
        Route::put('/{media}', [MediaController::class, 'update'])->name('media.update');
        Route::delete('/{media}', [MediaController::class, 'destroy'])->name('media.destroy');
        Route::post('/{media}/approve', [MediaController::class, 'approve'])->name('media.approve');
        Route::post('/{media}/reject', [MediaController::class, 'reject'])->name('media.reject');
    });

    // Form management
    Route::group(['prefix' => 'forms', 'middleware' => 'auth'], function () {
        Route::get('/', [FormController::class, 'index'])->name('forms.index');
        Route::get('/create', [FormController::class, 'create'])->name('forms.create');
        Route::post('/', [FormController::class, 'store'])->name('forms.store');
        Route::get('/{form}/edit', [FormController::class, 'edit'])->name('forms.edit');
        Route::put('/{form}', [FormController::class, 'update'])->name('forms.update');
        Route::delete('/{form}', [FormController::class, 'destroy'])->name('forms.destroy');
        Route::get('/{form}/submissions', [FormController::class, 'submissions'])->name('forms.submissions');
    });

    // API routes
    Route::prefix('api')->group(function () {
        // Media API endpoints
        Route::get('/media/list', [MediaController::class, 'apiIndex'])->name('api.media.list');
        Route::post('/media/upload', [MediaController::class, 'apiUpload'])->name('api.media.upload');

        // Page API endpoints
        Route::get('/pages/load/{id}', [PageEditorController::class, 'load'])->name('api.pages.load');
        Route::get('/pages/search', [PageController::class, 'apiSearch'])->name('api.pages.search');
        Route::post('/pages/store', [PageEditorController::class, 'store'])->name('api.pages.store');
        Route::post('/assets/upload', [PageEditorController::class, 'uploadAsset'])->name('api.assets.upload');
        Route::get('/pages/{page}/duplicate-count', function (Page $page) {
            $count = Page::where('title', 'LIKE', $page->title . '%')->count();
            return response()->json(['count' => $count]);
        })->name('api.pages.duplicate-count');

        // Navbar API endpoints
        Route::get('/navbars/load/{id}', [NavbarEditorController::class, 'load'])->name('api.navbars.load');
        Route::post('/navbars/store', [NavbarEditorController::class, 'store'])->name('api.navbars.store');

        // Footer API endpoints
        Route::get('/footers/load/{id}', [FooterEditorController::class, 'load'])->name('api.footers.load');
        Route::post('/footers/store', [FooterEditorController::class, 'store'])->name('api.footers.store');

        // Scripts API endpoints
        Route::get('/scripts/active', [ScriptController::class, 'getActiveScripts'])->name('api.scripts.active');
        Route::get('/custom-blocks/active', [CustomBlockController::class, 'getActiveBlocks'])->name('api.custom-blocks.active');

        // Promotion API endpoints
        Route::get('/promotions/active', [PromotionController::class, 'getActive'])->name('api.promotions.active');

        // Banner API endpoints
        Route::get('/banners/categories', [BannerController::class, 'getCategories'])->name('api.banners.categories');
        Route::get('/banners/active', [BannerController::class, 'getActive'])->name('api.banners.active');

        // Form API endpoints
        Route::get('/forms/active', [FormController::class, 'getActive'])->name('api.forms.active');
        Route::post('/forms/create-precalificador', [FormController::class, 'createPrecalificador'])->name('api.forms.create-precalificador');
        Route::post('/forms/{formId}/submit', [FormController::class, 'submitForm'])->name('api.forms.submit');
    });
});

// Public pages - accessible without authentication
Route::get('/p/{slug}', function ($slug) {
    $page = App\Models\Page::where('slug', $slug)
        ->where('status', 'published')
        ->firstOrFail();

    return view('pages.public', compact('page'));
})->name('pages.public');
