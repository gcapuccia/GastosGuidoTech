  'use client'

  import { useExpenses } from '@/hooks/useExpenses'
  import ExpenseForm from '@/components/ExpenseForm'
  import ExpenseList from '@/components/ExpenseList'
  import DashboardCards from '@/components/DashboardCards'
  import WelcomeDashboard from '@/components/welcomedashboard'
  import BotonGasto from '@/components/BotonGasto'
  import { useEffect, useState } from 'react'
  import { useRouter } from 'next/navigation'
  import { supabase } from '@/lib/supabaseClient'



  // Página principal del dashboard con layout centrado y max-width
  export default function Dashboard() {
    const [month, setMonth] = useState(new Date().getMonth() + 1)
    const [year, setYear] = useState(new Date().getFullYear())
    const { expenses, createExpense, deleteExpense } = useExpenses(month, year)
    const [loading, setLoading] = useState(true)
    const router = useRouter()



    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
        <WelcomeDashboard expenses={expenses} />
        <main className="max-w-5xl mx-auto px-6 py-10 space-y-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="w-full">
              {/* Tarjetas resumen + filtros */}
              <DashboardCards
                expenses={expenses}
                month={month}
                year={year}
                onMonthChange={setMonth}
                onYearChange={setYear}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              {/* Formulario para agregar gastos/ingresos */}
              <ExpenseForm onAdd={createExpense} />
            </div>

            <div className="md:col-span-1">
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md dark:shadow-none dark:ring-1 dark:ring-slate-800 p-6">
                <h2 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">Movimientos</h2>
                <ExpenseList expenses={expenses} onDelete={deleteExpense} />
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }