<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Models\CustomBlock;
use App\Models\Footer;
use App\Models\Form;
use App\Models\Navbar;
use App\Models\Page;
use App\Models\MediaFile;
use App\Models\NewsArticle;
use App\Models\NewsCategory;
use Spatie\Permission\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Create a new controller instance with dashboard view permission required
     */
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('permission:view_dashboard');
    }

    /**
     * Display dashboard with content statistics
     */
    public function index()
    {
        $usersCount = User::count();
        $pagesCount = Page::count();
        $rolesCount = Role::count();
        $navbarsCount = Navbar::count();
        $footersCount = Footer::count();
        $blocksCount = CustomBlock::count();
        $mediaCount = MediaFile::count();
        $newsCount = NewsArticle::count();
        $newsCategoriesCount = NewsCategory::count();
        $pendingNewsCount = NewsArticle::where('status', 'pending')->count();
        $bannersCount = Banner::count();
        $formsCount = Form::count();

        return view('dashboard.index', compact(
            'usersCount',
            'pagesCount',
            'rolesCount',
            'navbarsCount',
            'footersCount',
            'blocksCount',
            'mediaCount',
            'newsCount',
            'newsCategoriesCount',
            'pendingNewsCount',
            'bannersCount',
            'formsCount'
        ));
    }
}
