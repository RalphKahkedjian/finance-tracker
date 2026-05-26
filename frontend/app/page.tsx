'use client'

import { useEffect, useState } from "react"
import {
  getCategories,
  getTransactions,
  createTransaction
} from "@/app/services/financeService"

type Category = {
  id: number
  name: string
  type: "income" | "expense"
}

type Transaction = {
  id: number
  title: string
  amount: string
  type: "income" | "expense"
  date: string
  note?: string
  category: Category
}

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const [categoryId, setCategoryId] = useState("")
  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")
  const [type, setType] = useState("expense")
  const [date, setDate] = useState("")
  const [note, setNote] = useState("")

  const fetchData = async () => {
    const categoriesResponse = await getCategories()
    const transactionsResponse = await getTransactions()

    setCategories(categoriesResponse.data)
    setTransactions(transactionsResponse.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = async () => {
    await createTransaction({
      category_id: Number(categoryId),
      title,
      amount: Number(amount),
      type,
      date,
      note
    })

    setCategoryId("")
    setTitle("")
    setAmount("")
    setType("expense")
    setDate("")
    setNote("")

    fetchData()
  }

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-6">
        Finance Tracker
      </h1>

      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Add Transaction
        </h2>

        <div className="grid gap-4 max-w-md">
          <input
            className="border p-2 rounded"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="border p-2 rounded"
            placeholder="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <select
            className="border p-2 rounded"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <select
            className="border p-2 rounded"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Select Category</option>

            {categories
              .filter((category) => category.type === type)
              .map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </select>

          <input
            className="border p-2 rounded"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <textarea
            className="border p-2 rounded"
            placeholder="Note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            className="bg-black text-white p-2 rounded"
          >
            Add Transaction
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">
          Transactions
        </h2>

        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="border-b py-3"
          >
            <p className="font-semibold">{transaction.title}</p>
            <p>{transaction.category?.name}</p>
            <p>{transaction.amount} USD</p>
            <p>{transaction.type}</p>
            <p>{transaction.date}</p>
          </div>
        ))}
      </div>
    </main>
  )
}