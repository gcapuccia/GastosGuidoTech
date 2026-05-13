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
    <div className="p-10 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📊 Análisis</h1>

        <button
          onClick={() => router.push('/dashboard')}
          className="bg-gray-800 text-white px-4 py-2 rounded"
        >
          Volver
        </button>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 mb-6">
        <input type="number" value={month} onChange={(e) => setMonth(Number(e.target.value))} min="1" max="12" className="border p-2 w-20 rounded"/>
        <input type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} className="border p-2 w-24 rounded"/>
      </div>

      {/* Gráfico */}
      <ExpenseChart expenses={expenses} />
    </div>
  )
}