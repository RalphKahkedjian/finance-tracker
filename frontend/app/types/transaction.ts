import { Category } from "./category"

export type Transaction = {
  id: number
  title: string
  amount: string
  type: "income" | "expense"
  date: string
  note?: string
  category: Category
}

export type CreateTransactionData = {
  category_id: number
  title: string
  amount: number
  type: string
  date: string
  note?: string
}