<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        /*
        |--------------------------------------------------------------------------
        | Expense Categories
        |--------------------------------------------------------------------------
        */

        Category::create([
            'name' => 'Food',
            'type' => 'expense'
        ]);

        Category::create([
            'name' => 'Transport',
            'type' => 'expense'
        ]);

        Category::create([
            'name' => 'Shopping',
            'type' => 'expense'
        ]);

        Category::create([
            'name' => 'Bills',
            'type' => 'expense'
        ]);

        Category::create([
            'name' => 'Entertainment',
            'type' => 'expense'
        ]);

        /*
        |--------------------------------------------------------------------------
        | Income Categories
        |--------------------------------------------------------------------------
        */

        Category::create([
            'name' => 'Salary',
            'type' => 'income'
        ]);

        Category::create([
            'name' => 'Freelance',
            'type' => 'income'
        ]);

        Category::create([
            'name' => 'Investments',
            'type' => 'income'
        ]);
    }
}