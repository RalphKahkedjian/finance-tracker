'use client'

import {
  PieChart,
  Pie,
  Tooltip,
  Cell
} from 'recharts'

interface Props {
  data: {
    category: string
    total: number
  }[]
}

const COLORS = ['#ff6b82', '#00d97e', '#5b8cff', '#f7b731', '#a55eea']

export default function CategoryChart({ data }: Props) {
  if (!data || data.length === 0) {
    return (
      <div style={styles.card}>
        <h2 style={styles.title}>Spending by Category</h2>
        <p style={{ color: '#555' }}>No chart data yet.</p>
      </div>
    )
  }

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Spending by Category</h2>

      <PieChart width={420} height={320}>
        <Pie
          data={data}
          dataKey="total"
          nameKey="category"
          outerRadius={100}
        >
          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

        <Tooltip />
      </PieChart>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    background: '#111',
    border: '1px solid #1e1e1e',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    overflow: 'hidden',
  },
  title: {
    color: '#f5f0e8',
    marginBottom: 20,
    fontSize: 20,
  },
}