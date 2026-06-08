'use client'

import { useState } from 'react'
import { useExpenses } from '@/hooks/useExpenses'
import ExpenseChart from '@/components/ExpenseChart'
import { useRouter } from 'next/navigation'

export default function Analytics() {
  const router = useRouter()

  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [year, setYear] = useState(new Date().getFullYear())

  const { expenses } = useExpenses(month, year)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="p-10 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">📊 Análisis</h1>

          <button
            onClick={() => router.push('/dashboard')}
            className="bg-slate-900 text-white px-4 py-2 rounded-lg transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-50 dark:bg-slate-700 dark:hover:bg-slate-600 dark:focus:ring-offset-slate-950"
          >
            Volver
          </button>
        </div>

        {/* Filtros */}
        <div className="flex gap-2 mb-6">
          <input type="number" value={month} onChange={(e) => setMonth(Number(e.target.value))} min="1" max="12" aria-label="Mes" className="border border-slate-200 bg-white text-slate-900 p-2 w-20 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-emerald-500/60 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"/>
          <input type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} aria-label="Año" className="border border-slate-200 bg-white text-slate-900 p-2 w-24 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-emerald-500/60 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"/>
        </div>

        {/* Gráfico */}
        <ExpenseChart expenses={expenses} />
      </div>
    </div>
  )
}