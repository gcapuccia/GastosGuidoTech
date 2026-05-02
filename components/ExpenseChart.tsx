'use client'

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export default function ExpenseChart({ expenses }: any) {
  const data = Object.values(
    expenses
      .filter((e: any) => e.type === 'expense')
      .reduce((acc: any, curr: any) => {
        if (!acc[curr.category]) {
          acc[curr.category] = { name: curr.category, value: 0 }
        }
        acc[curr.category].value += curr.amount
        return acc
      }, {})
  )

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="mb-4 font-semibold">Gastos por categoría</h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={100}>
            {data.map((_: any, index: number) => (
              <Cell key={index} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}