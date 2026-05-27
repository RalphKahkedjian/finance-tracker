'use client'

import { Transaction } from "@/types/transaction"

interface Props {
  transactions: Transaction[]
}

function formatAmount(amount: string | number) {
  return Number(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

const categoryIcons: Record<string, string> = {
  Food: "🍽",
  Transport: "🚌",
  Shopping: "🛍",
  Bills: "📄",
  Entertainment: "🎬",
  Salary: "💼",
  Freelance: "💻",
  Investments: "📈",
}

export default function TransactionList({ transactions }: Props) {
  if (transactions.length === 0) {
    return (
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <span style={styles.cardLabel}>History</span>
          <h2 style={styles.cardTitle}>Transactions</h2>
        </div>
        <div style={styles.empty}>
          <span style={styles.emptyIcon}>◌</span>
          <p style={styles.emptyText}>No transactions yet</p>
          <p style={styles.emptySubtext}>Add your first entry to get started</p>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <span style={styles.cardLabel}>History</span>
        <div style={styles.cardHeaderRow}>
          <h2 style={styles.cardTitle}>Transactions</h2>
          <span style={styles.countBadge}>{transactions.length}</span>
        </div>
      </div>

      <div style={styles.list}>
        {transactions.map((tx, index) => {
          const isIncome = tx.type === "income"
          const icon = categoryIcons[tx.category?.name ?? ""] ?? "•"

          return (
            <div
              key={`${tx.id}-${index}`}
              style={styles.item}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLDivElement).style.background = "#161616"
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLDivElement).style.background = "transparent"
              }}
            >
              {/* Icon */}
              <div
                style={{
                  ...styles.iconBox,
                  background: isIncome ? "#0a2218" : "#1a0a0e",
                }}
              >
                <span style={{ fontSize: 16 }}>{icon}</span>
              </div>

              {/* Info */}
              <div style={styles.info}>
                <p style={styles.txTitle}>{tx.title}</p>
                <div style={styles.meta}>
                  {tx.category?.name && (
                    <span style={styles.metaTag}>{tx.category.name}</span>
                  )}
                  <span style={styles.metaDate}>{formatDate(tx.date)}</span>
                </div>
                {tx.note && <p style={styles.note}>{tx.note}</p>}
              </div>

              {/* Amount */}
              <div style={styles.amountCol}>
                <span
                  style={{
                    ...styles.amount,
                    color: isIncome ? "#00d97e" : "#ff6b82",
                  }}
                >
                  {isIncome ? "+" : "−"}${formatAmount(tx.amount)}
                </span>
                <span
                  style={{
                    ...styles.typePill,
                    background: isIncome ? "#0a2218" : "#1a0a0e",
                    color: isIncome ? "#00d97e" : "#ff6b82",
                    border: `1px solid ${isIncome ? "#0f3325" : "#3d1520"}`,
                  }}
                >
                  {tx.type}
                </span>
              </div>
            </div>
          )
        })}
      </div>
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
    gap: 20,
    minHeight: 400,
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
  cardHeaderRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 500,
    color: "#f5f0e8",
    margin: 0,
    fontFamily: "'Fraunces', Georgia, serif",
    fontStyle: "italic",
  },
  countBadge: {
    fontSize: 11,
    fontFamily: "'DM Mono', monospace",
    color: "#444",
    background: "#1a1a1a",
    border: "1px solid #222",
    borderRadius: 20,
    padding: "2px 8px",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 0,
  },
  item: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: "14px 12px",
    borderRadius: 10,
    transition: "background 0.1s ease",
    cursor: "default",
    borderBottom: "1px solid #181818",
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  info: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 4,
    minWidth: 0,
  },
  txTitle: {
    fontSize: 14,
    fontWeight: 500,
    color: "#e8e3dc",
    margin: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  meta: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  metaTag: {
    fontSize: 11,
    color: "#555",
    fontFamily: "'DM Mono', monospace",
  },
  metaDate: {
    fontSize: 11,
    color: "#333",
    fontFamily: "'DM Mono', monospace",
  },
  note: {
    fontSize: 12,
    color: "#444",
    margin: 0,
    fontStyle: "italic",
  },
  amountCol: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 4,
    flexShrink: 0,
  },
  amount: {
    fontSize: 15,
    fontWeight: 600,
    fontFamily: "'DM Mono', monospace",
    letterSpacing: "-0.02em",
  },
  typePill: {
    fontSize: 10,
    fontFamily: "'DM Mono', monospace",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    padding: "2px 7px",
    borderRadius: 20,
  },
  empty: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "60px 0",
  },
  emptyIcon: {
    fontSize: 32,
    color: "#2a2a2a",
  },
  emptyText: {
    fontSize: 15,
    color: "#444",
    margin: 0,
    fontFamily: "'Fraunces', Georgia, serif",
    fontStyle: "italic",
  },
  emptySubtext: {
    fontSize: 12,
    color: "#2a2a2a",
    margin: 0,
    fontFamily: "'DM Mono', monospace",
  },
}