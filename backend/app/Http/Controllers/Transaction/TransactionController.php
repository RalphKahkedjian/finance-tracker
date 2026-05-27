<?php

namespace App\Http\Controllers\Transaction;

use App\Http\Controllers\Controller;
use App\Http\Requests\Transaction\StoreTransactionRequest;
use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    // fetch all transactions by descending order
    public function index() {
        return response()->json([
            Transaction::with('Category')
            ->latest()
            ->get()
        ]);
    }

    public function store(StoreTransactionRequest $request) {

        $transaction = Transaction::create([
            'category_id' => $request->category_id,
            'title' => $request->title,
            'amount' => $request->amount,
            'type' => $request->type,
            'date' => $request->date,
            'note' => $request->note,
        ]);

        return response()->json([
            'message' => 'Transaction created successfully',
            'transaction' => $transaction
        ]);
    }

    public function destroy($id) {
        $transaction = Transaction::find($id);
        if(! $transaction) {
            return response()->json([
                'message' => `Transaction with id {$id} not found`
            ]);          
        }

        $transaction->delete();

        return response()->json([
            'status' => true,
            'message' => `Transaction with {$id} deleted successfully`
        ]);
    }
}
