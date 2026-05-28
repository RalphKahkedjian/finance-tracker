'use client'

import { useEffect, useState } from "react"
import { getCategories, getTransactions, createTransaction, deleteTransaction } from "@/services/financeService"
import { Category } from "@/types/category"
import { Transaction } from "@/types/transaction"
import TransactionForm from "@/components/TransactionForm"
import TransactionList from "@/components/TransactionList"
import { getCategoryAnalytics } from "@/services/dashboardService"
import CategoryChart from "@/components/CategoryChart"

function formatAmount(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function DashboardPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [categoryAnalytics, setCategoryAnalytics] = useState([])

  const fetchData = async () => {
    try {
      const [catRes, txRes, analyticsRes ] = await Promise.all([getCategories(), getTransactions(), getCategoryAnalytics()])
      setCategories(catRes.data[0] ?? catRes.data)
      setTransactions(txRes.data[0] ?? txRes.data)
      setCategoryAnalytics(analyticsRes.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleCreateTransaction = async (data: {
    category_id: number
    title: string
    amount: number
    type: string
    date: string
    note?: string
  }) => {
    await createTransaction(data)
    await fetchData()
  }

  const handleDeleteTransaction = async (
    id: number
  )=> {
    await deleteTransaction(id)

    fetchData()
  };

  // Stats
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + Number(t.amount), 0)

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + Number(t.amount), 0)

  const balance = totalIncome - totalExpense
  const isPositive = balance >= 0

  return (
    <>
      {/* Font imports */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,500;1,400;1,500&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        body { background: #080808 !important; }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.4); cursor: pointer; }
        select option { background: #111; color: #f5f0e8; }
        ::selection { background: #f5f0e822; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #222; border-radius: 2px; }
      `}</style>

      <main style={styles.page}>

        {/* ── Header ─────────────────────────────────── */}
        <header style={styles.header}>
          <div>
            <p style={styles.headerLabel}>Personal Finance</p>
            <h1 style={styles.headerTitle}>Finance Tracker</h1>
          </div>
          <div style={styles.headerRight}>
            <span style={styles.headerDate}>
              {new Date().toLocaleDateString("en-US", {
                weekday: "long", month: "long", day: "numeric", year: "numeric",
              })}
            </span>
          </div>
        </header>

        {/* ── Stats row ──────────────────────────────── */}
        <div style={styles.statsRow}>
          {/* Balance */}
          <div style={{ ...styles.statCard, ...styles.statCardBalance }}>
            <span style={styles.statLabel}>Net Balance</span>
            <span style={{
              ...styles.statValue,
              color: isPositive ? "#00d97e" : "#ff6b82",
              fontSize: 32,
            }}>
              {isPositive ? "+" : "−"}${formatAmount(Math.abs(balance))}
            </span>
            <span style={{
              ...styles.statBadge,
              background: isPositive ? "#0a2218" : "#1a0a0e",
              color: isPositive ? "#00d97e" : "#ff6b82",
            }}>
              {transactions.length} transactions
            </span>
          </div>

          {/* Income */}
          <div style={styles.statCard}>
            <span style={styles.statLabel}>Total Income</span>
            <span style={{ ...styles.statValue, color: "#00d97e" }}>
              +${formatAmount(totalIncome)}
            </span>
            <span style={{ ...styles.statSub }}>
              {transactions.filter((t) => t.type === "income").length} entries
            </span>
          </div>

          {/* Expenses */}
          <div style={styles.statCard}>
            <span style={styles.statLabel}>Total Expenses</span>
            <span style={{ ...styles.statValue, color: "#ff6b82" }}>
              −${formatAmount(totalExpense)}
            </span>
            <span style={styles.statSub}>
              {transactions.filter((t) => t.type === "expense").length} entries
            </span>
          </div>

          {/* Savings rate */}
          <div style={styles.statCard}>
            <span style={styles.statLabel}>Savings Rate</span>
            <span style={{ ...styles.statValue, color: "#f5f0e8" }}>
              {totalIncome > 0
                ? Math.round(((totalIncome - totalExpense) / totalIncome) * 100)
                : 0}%
            </span>
            <div style={styles.progressBar}>
              <div style={{
                ...styles.progressFill,
                width: `${Math.max(0, Math.min(100, totalIncome > 0
                  ? ((totalIncome - totalExpense) / totalIncome) * 100
                  : 0))}%`,
              }} />
            </div>
          </div>
        </div>

        {/* ── Main grid ──────────────────────────────── */}
        <div style={styles.grid}>
          <div style={styles.formCol}>
            <TransactionForm categories={categories} onSubmit={handleCreateTransaction} />
          </div>
          <div style={styles.listCol}>
            <TransactionList transactions={transactions} />
          </div>
        </div>
        <div style={{width:'100%', height:'auto'}}>
                      <CategoryChart
              data={categoryAnalytics}
            />
        </div>
      </main>
    </>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#080808",
    padding: "40px 40px 80px",
    fontFamily: "'DM Mono', 'Courier New', monospace",
    color: "#f5f0e8",
    maxWidth: 1280,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: 32,
  },

  // Header
  header: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingBottom: 24,
    borderBottom: "1px solid #1a1a1a",
  },
  headerLabel: {
    fontSize: 11,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: "#333",
    margin: "0 0 6px",
    fontFamily: "'DM Mono', monospace",
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: 500,
    fontStyle: "italic",
    fontFamily: "'Fraunces', Georgia, serif",
    color: "#f5f0e8",
    margin: 0,
    letterSpacing: "-0.02em",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  headerDate: {
    fontSize: 12,
    color: "#333",
    fontFamily: "'DM Mono', monospace",
  },

  // Stats
  statsRow: {
    display: "grid",
    gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
    gap: 12,
  },
  statCard: {
    background: "#111",
    border: "1px solid #1e1e1e",
    borderRadius: 14,
    padding: "20px 24px",
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  statCardBalance: {
    background: "#0e0e0e",
    border: "1px solid #252525",
  },
  statLabel: {
    fontSize: 11,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#444",
    fontFamily: "'DM Mono', monospace",
  },
  statValue: {
    fontSize: 26,
    fontWeight: 500,
    fontFamily: "'DM Mono', monospace",
    letterSpacing: "-0.03em",
    lineHeight: 1,
  },
  statBadge: {
    fontSize: 11,
    padding: "3px 8px",
    borderRadius: 20,
    display: "inline-block",
    width: "fit-content",
    fontFamily: "'DM Mono', monospace",
  },
  statSub: {
    fontSize: 12,
    color: "#333",
    fontFamily: "'DM Mono', monospace",
  },
  progressBar: {
    height: 3,
    background: "#1a1a1a",
    borderRadius: 2,
    overflow: "hidden",
    marginTop: 4,
  },
  progressFill: {
    height: "100%",
    background: "#00d97e",
    borderRadius: 2,
    transition: "width 0.5s ease",
  },

  // Grid
  grid: {
    display: "grid",
    gridTemplateColumns: "380px 1fr",
    gap: 16,
    alignItems: "start",
  },
  formCol: {
    position: "sticky" as const,
    top: 32,
  },
  listCol: {
    minWidth: 0,
  },
}