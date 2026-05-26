<?php

namespace App\Http\Controllers\Category;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    // fetch all categories
    public function index() {
        return response()->json([
            Category::all()
        ]);
    }
}
