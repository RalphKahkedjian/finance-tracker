import { CreateTransactionData } from "../types/transaction"
import api from "./api"

export const getCategories = async ()=> {
  return await api.get('/categories')
}

export const getTransactions = async ()=> {
  return await api.get('/transactions')
}

export const createTransaction = async (
  data: CreateTransactionData
) => {
  return await api.post("/transactions", data)
}

export const deleteTransaction = async (
  id: number
)=> {
  return await api.delete(`/transactions/${id}`)
}