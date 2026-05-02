"use client"

import { useMemo, useState } from 'react'

// Componente: DashboardCards
// Muestra tres tarjetas con Ingresos, Gastos y Ahorro.
// Incluye filtros por mes/año (select) y es responsivo.
export default function DashboardCards({ expenses = [] }: any) {
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1)
  const [year, setYear] = useState<number>(new Date().getFullYear())

  // Formateador de moneda para consistencia visual
  const fmt = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })

  // Filtrar gastos por mes/año seleccionados
  const filtered = useMemo(() => {
    return expenses.filter((e: any) => {
      if (!e.created_at) return true
      const d = new Date(e.created_at)
      return d.getMonth() + 1 === month && d.getFullYear() === year
    })
  }, [expenses, month, year])

  const totalIncome = filtered
    .filter((e: any) => e.type === 'income')
    .reduce((acc: number, e: any) => acc + e.amount, 0)

  const totalExpenses = filtered
    .filter((e: any) => e.type === 'expense')
    .reduce((acc: number, e: any) => acc + e.amount, 0)

  const savings = totalIncome - totalExpenses

  // Generar años para el select (últimos 5 años + actual)
  const years = Array.from({ length: 6 }).map((_, i) => new Date().getFullYear() - i)

  const months = [
    'Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'
  ]

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
          <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-500">Ingresos</div>
                <div className="text-xl font-semibold text-slate-900 mt-1">{fmt.format(totalIncome)}</div>
              </div>
              <div className="text-green-500 bg-green-50 p-2 rounded-xl">
                {/* Icono simple - ingreso */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2v20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M5 9l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-500">Gastos</div>
                <div className="text-xl font-semibold text-slate-900 mt-1">{fmt.format(totalExpenses)}</div>
              </div>
              <div className="text-red-500 bg-red-50 p-2 rounded-xl">
                {/* Icono simple - gasto */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22V2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M19 15l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-500">Ahorro</div>
                <div className="text-xl font-semibold text-slate-900 mt-1">{fmt.format(savings)}</div>
              </div>
              <div className="text-indigo-600 bg-indigo-50 p-2 rounded-xl">
                {/* Icono simple - ahorro */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-64 bg-slate-50 rounded-xl p-4 shadow-sm">
          <div className="text-xs text-slate-500 mb-2">Filtrar</div>
          <div className="flex gap-2">
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="w-1/2 rounded-lg border border-slate-200 bg-white p-2 text-sm"
              aria-label="Mes"
            >
              {months.map((m, i) => (
                <option key={i} value={i + 1}>{m}</option>
              ))}
            </select>

            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="w-1/2 rounded-lg border border-slate-200 bg-white p-2 text-sm"
              aria-label="Año"
            >
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}