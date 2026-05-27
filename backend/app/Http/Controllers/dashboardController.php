<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;

class dashboardController extends Controller
{
    public function summary() {
        $total_income = Transaction::where('type', 'income')->sum('amount');
        $total_expense = Transaction::where('type', 'expenses')->sum('amount');

        $balance = $total_income - $total_expense;

        $transaction_count = Transaction::count();

        return response()->json([
            'total_income' => $total_income,
            'total_expense' => $total_expense,
            'balance' => $balance,
            'transaction_count' => $transaction_count
        ]);
    }
}
