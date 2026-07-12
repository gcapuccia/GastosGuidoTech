'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAllExpenses } from '@/services/expenseService'
import { supabase } from '@/lib/supabaseClient'

// Página: Resumen histórico
// Muestra los totales de todos los movimientos (ingresos, gastos y ahorro)
// y un desglose mes a mes.
export default function Resumen() {
  const router = useRouter()
  const [expenses, setExpenses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fmt = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 2, maximumFractionDigits: 2 })

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
  ]

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data.user) {
        router.push('/') // redirige al login si no está logueado
        return
      }
      try {
        const all = await getAllExpenses()
        setExpenses(all)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [router])

  // Totales históricos
  const totalIncome = expenses
    .filter((e: any) => e.type === 'income')
    .reduce((acc: number, e: any) => acc + e.amount, 0)

  const totalExpenses = expenses
    .filter((e: any) => e.type === 'expense')
    .reduce((acc: number, e: any) => acc + e.amount, 0)

  const savings = totalIncome - totalExpenses

  // Desglose mes a mes (ordenado del más reciente al más antiguo)
  const byMonth = useMemo(() => {
    const map = new Map<string, { year: number; month: number; income: number; expense: number }>()
    for (const e of expenses) {
      if (!e.created_at) continue
      const d = new Date(e.created_at)
      const key = `${d.getFullYear()}-${d.getMonth()}`
      if (!map.has(key)) {
        map.set(key, { year: d.getFullYear(), month: d.getMonth(), income: 0, expense: 0 })
      }
      const row = map.get(key)!
      if (e.type === 'income') row.income += e.amount
      else if (e.type === 'expense') row.expense += e.amount
    }
    return Array.from(map.values()).sort((a, b) => b.year - a.year || b.month - a.month)
  }, [expenses])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="p-10 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">💰 Resumen total</h1>

          <button
            onClick={() => router.push('/dashboard')}
            className="bg-slate-900 text-white px-4 py-2 rounded-lg transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-50 dark:bg-slate-700 dark:hover:bg-slate-600 dark:focus:ring-offset-slate-950"
          >
            Volver
          </button>
        </div>

        {loading ? (
          <div className="text-slate-500 dark:text-slate-400">Cargando…</div>
        ) : (
          <div className="space-y-8">
            {/* Tarjetas con totales históricos */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md dark:shadow-none dark:ring-1 dark:ring-slate-800 p-5">
                <div className="text-sm text-slate-500 dark:text-slate-400">Ingresos totales</div>
                <div className="text-2xl font-semibold text-green-600 dark:text-green-400 mt-1">{fmt.format(totalIncome)}</div>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md dark:shadow-none dark:ring-1 dark:ring-slate-800 p-5">
                <div className="text-sm text-slate-500 dark:text-slate-400">Gastos totales</div>
                <div className="text-2xl font-semibold text-red-600 dark:text-red-400 mt-1">{fmt.format(totalExpenses)}</div>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md dark:shadow-none dark:ring-1 dark:ring-slate-800 p-5">
                <div className="text-sm text-slate-500 dark:text-slate-400">Ahorro total</div>
                <div className={`text-2xl font-semibold mt-1 ${savings < 0 ? 'text-red-600 dark:text-red-400' : 'text-slate-900 dark:text-slate-100'}`}>{fmt.format(savings)}</div>
              </div>
            </div>

            {/* Desglose mes a mes */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md dark:shadow-none dark:ring-1 dark:ring-slate-800 p-6">
              <h2 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">Mes a mes</h2>

              {byMonth.length === 0 ? (
                <div className="text-slate-500 dark:text-slate-400 text-sm">Todavía no hay movimientos cargados.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                        <th className="py-2 pr-4 font-medium">Mes</th>
                        <th className="py-2 pr-4 font-medium text-right">Ingresos</th>
                        <th className="py-2 pr-4 font-medium text-right">Gastos</th>
                        <th className="py-2 font-medium text-right">Ahorro</th>
                      </tr>
                    </thead>
                    <tbody>
                      {byMonth.map((row) => {
                        const monthSavings = row.income - row.expense
                        return (
                          <tr key={`${row.year}-${row.month}`} className="border-b border-slate-100 dark:border-slate-800 last:border-0">
                            <td className="py-2 pr-4 text-slate-900 dark:text-slate-100">{monthNames[row.month]} {row.year}</td>
                            <td className="py-2 pr-4 text-right text-green-600 dark:text-green-400">{fmt.format(row.income)}</td>
                            <td className="py-2 pr-4 text-right text-red-600 dark:text-red-400">{fmt.format(row.expense)}</td>
                            <td className={`py-2 text-right font-medium ${monthSavings < 0 ? 'text-red-600 dark:text-red-400' : 'text-slate-900 dark:text-slate-100'}`}>{fmt.format(monthSavings)}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
