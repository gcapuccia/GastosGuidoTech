'use client'

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

// Paleta restringida y consistente para las categorías
const COLORS = ['#10b981', '#6366f1', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899', '#8b5cf6', '#84cc16']

const fmt = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 2, maximumFractionDigits: 2 })

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
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow dark:shadow-none dark:ring-1 dark:ring-slate-800">
      <h2 className="mb-4 font-semibold text-slate-900 dark:text-slate-100">Gastos por categoría</h2>

      {data.length === 0 ? (
        <div className="h-[300px] flex items-center justify-center text-sm text-slate-500 dark:text-slate-400">
          No hay gastos para el período seleccionado.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" outerRadius={100}>
              {data.map((_: any, index: number) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: any) => fmt.format(Number(value))} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}