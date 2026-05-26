<?php

use App\Http\Controllers\Transaction\TransactionController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Category\CategoryController;

Route::get('/categories', [CategoryController::class, 'index']);

Route::get('/transactions', [TransactionController::class, 'index']);
Route::post('/transactions', [TransactionController::class, 'store']);
