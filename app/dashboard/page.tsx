  'use client'

  import { useExpenses } from '@/hooks/useExpenses'
  import ExpenseForm from '@/components/ExpenseForm'
  import ExpenseList from '@/components/ExpenseList'
  import DashboardCards from '@/components/DashboardCards'
  import WelcomeDashboard from '@/components/welcomedashboard'
  import BotonGasto from '@/components/BotonGasto'
  import { useState } from 'react'

  // Página principal del dashboard con layout centrado y max-width
  export default function Dashboard() {
    const [month, setMonth] = useState(new Date().getMonth() + 1)
    const [year, setYear] = useState(new Date().getFullYear())
    const { expenses, createExpense } = useExpenses(month, year)

    return (
      <div className="min-h-screen bg-slate-50 py-10">
        <main className="max-w-5xl mx-auto px-6 space-y-8">
        {/* Componente que muestra bienvenida y logout */}
        <WelcomeDashboard expenses={expenses} />
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="w-full md:w-3/3">
              {/* Tarjetas resumen + filtros */}
              <DashboardCards expenses={expenses} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              {/* Formulario para agregar gastos/ingresos */}
              <ExpenseForm onAdd={createExpense} />
            </div>

            <div className="md:col-span-1">
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Movimientos</h2>
                <ExpenseList expenses={expenses} />
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }