'use client'

import { Category } from "@/types/category"
import { useState } from "react"

interface Props {
  categories: Category[]
  onSubmit: (data: {
    category_id: number
    title: string
    amount: number
    type: string
    date: string
    note?: string
  }) => Promise<void>
}

export default function TransactionForm({ categories, onSubmit }: Props) {
  const [categoryId, setCategoryId] = useState("")
  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")
  const [type, setType] = useState("expense")
  const [date, setDate] = useState("")
  const [note, setNote] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!title || !amount || !date || !categoryId) return
    setLoading(true)
    try {
      await onSubmit({
        category_id: Number(categoryId),
        title,
        amount: Number(amount),
        type,
        date,
        note,
      })
      setCategoryId("")
      setTitle("")
      setAmount("")
      setType("expense")
      setDate("")
      setNote("")
    } finally {
      setLoading(false)
    }
  }

  const isIncome = type === "income"

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <span style={styles.cardLabel}>New entry</span>
        <h2 style={styles.cardTitle}>Add Transaction</h2>
      </div>

      {/* Type toggle */}
      <div style={styles.typeToggle}>
        <button
          onClick={() => { setType("expense"); setCategoryId("") }}
          style={{
            ...styles.typeBtn,
            ...(type === "expense" ? styles.typeBtnActiveExpense : styles.typeBtnInactive),
          }}
        >
          ↓ Expense
        </button>
        <button
          onClick={() => { setType("income"); setCategoryId("") }}
          style={{
            ...styles.typeBtn,
            ...(type === "income" ? styles.typeBtnActiveIncome : styles.typeBtnInactive),
          }}
        >
          ↑ Income
        </button>
      </div>

      <div style={styles.fields}>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Title</label>
          <input
            style={styles.input}
            placeholder="e.g. Grocery run"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={(e) => (e.target.style.borderColor = "#f5f0e8")}
            onBlur={(e) => (e.target.style.borderColor = "#2a2a2a")}
          />
        </div>

        <div style={styles.row}>
          <div style={{ ...styles.fieldGroup, flex: 1 }}>
            <label style={styles.label}>Amount (USD)</label>
            <input
              style={{ ...styles.input, ...styles.monoInput }}
              placeholder="0.00"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              onFocus={(e) => (e.target.style.borderColor = "#f5f0e8")}
              onBlur={(e) => (e.target.style.borderColor = "#2a2a2a")}
            />
          </div>
          <div style={{ ...styles.fieldGroup, flex: 1 }}>
            <label style={styles.label}>Date</label>
            <input
              style={{ ...styles.input, colorScheme: "dark" }}
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              onFocus={(e) => (e.target.style.borderColor = "#f5f0e8")}
              onBlur={(e) => (e.target.style.borderColor = "#2a2a2a")}
            />
          </div>
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Category</label>
          <select
            style={styles.input}
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            onFocus={(e) => (e.target.style.borderColor = "#f5f0e8")}
            onBlur={(e) => (e.target.style.borderColor = "#2a2a2a")}
          >
            <option value="">Select category</option>
            {categories
              .filter((c) => c.type === type)
              .map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
          </select>
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Note <span style={styles.optional}>(optional)</span></label>
          <textarea
            style={{ ...styles.input, ...styles.textarea }}
            placeholder="Add a note..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            onFocus={(e) => (e.target.style.borderColor = "#f5f0e8")}
            onBlur={(e) => (e.target.style.borderColor = "#2a2a2a")}
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          ...styles.submitBtn,
          ...(isIncome ? styles.submitIncome : styles.submitExpense),
          opacity: loading ? 0.6 : 1,
        }}
      >
        {loading ? "Adding..." : `Add ${isIncome ? "Income" : "Expense"}`}
      </button>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    background: "#111111",
    border: "1px solid #1e1e1e",
    borderRadius: 16,
    padding: 28,
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  cardHeader: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  cardLabel: {
    fontSize: 11,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#444",
    fontFamily: "'DM Mono', monospace",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 500,
    color: "#f5f0e8",
    margin: 0,
    fontFamily: "'Fraunces', Georgia, serif",
    fontStyle: "italic",
  },
  typeToggle: {
    display: "flex",
    gap: 8,
    background: "#0a0a0a",
    borderRadius: 10,
    padding: 4,
  },
  typeBtn: {
    flex: 1,
    padding: "8px 12px",
    border: "none",
    borderRadius: 7,
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.15s ease",
    fontFamily: "inherit",
  },
  typeBtnActiveExpense: {
    background: "#2a0f14",
    color: "#ff6b82",
    border: "1px solid #3d1520",
  },
  typeBtnActiveIncome: {
    background: "#0a2218",
    color: "#00d97e",
    border: "1px solid #0f3325",
  },
  typeBtnInactive: {
    background: "transparent",
    color: "#444",
    border: "1px solid transparent",
  },
  fields: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  row: {
    display: "flex",
    gap: 12,
  },
  label: {
    fontSize: 11,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#555",
    fontFamily: "'DM Mono', monospace",
  },
  optional: {
    textTransform: "none",
    letterSpacing: 0,
    color: "#333",
  },
  input: {
    background: "#0d0d0d",
    border: "1px solid #2a2a2a",
    borderRadius: 8,
    padding: "10px 14px",
    fontSize: 14,
    color: "#f5f0e8",
    outline: "none",
    transition: "border-color 0.15s",
    fontFamily: "inherit",
    width: "100%",
    boxSizing: "border-box" as const,
  },
  monoInput: {
    fontFamily: "'DM Mono', monospace",
    fontSize: 15,
  },
  textarea: {
    resize: "none",
    minHeight: 72,
    lineHeight: 1.5,
  },
  submitBtn: {
    padding: "13px 20px",
    border: "none",
    borderRadius: 10,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.15s ease",
    letterSpacing: "0.02em",
    fontFamily: "inherit",
  },
  submitExpense: {
    background: "#ff4d6a",
    color: "#fff",
  },
  submitIncome: {
    background: "#00d97e",
    color: "#001a0f",
  },
}