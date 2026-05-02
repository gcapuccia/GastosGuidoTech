'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import {  PieChart, Pie, Cell, Tooltip, ResponsiveContainer} from 'recharts'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [expenses, setExpenses] = useState<any[]>([])
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [message, setMessage] = useState('')
  const [type, setType] = useState('expense')
  const router = useRouter()



  // 📊 Traer gastos
  const fetchExpenses = async () => {
  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) {
    console.error(error)
  } else {
    setExpenses(data)
  }
}

  // 🔐 Verificar usuario logueado
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()

      if (!data.user) {
        router.push('/')
      } else {
        setUser(data.user)
        await fetchExpenses()
      }
    }
    getUser()
  }, [])

  // 💾 Guardar gasto
  const handleAddExpense = async () => {
    setMessage('')

    const { data: userData } = await supabase.auth.getUser()
    const user = userData.user
    
    if (!user) {
      setMessage('Usuario no autenticado')
      return
    }

    const { error } = await supabase.from('expenses').insert([
      {
        user_id: user.id,
        amount: Number(amount),
        type,
        category,
        description,
      },
    ])

    if (error) {
      setMessage('Error al guardar 😢')
      console.error(error)
    } else {
      setMessage('Gasto guardado ✅')
      setAmount('')
      setCategory('')
      setDescription('')
      await fetchExpenses()
    }
  }

  // 🚪 Logout
  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

// 🧾 Cálculos
  const totalExpenses = expenses
  .filter(e => e.type === 'expense')
  .reduce((acc, e) => acc + e.amount, 0)
const totalIncome = expenses
  .filter(e => e.type === 'income')
  .reduce((acc, e) => acc + e.amount, 0)
const savings = totalIncome - totalExpenses

const categoryData = Object.values(
  expenses
    .filter(e => e.type === 'expense')
    .reduce((acc: any, curr) => {
      if (!acc[curr.category]) {
        acc[curr.category] = { name: curr.category, value: 0 }
      }
      acc[curr.category].value += curr.amount
      return acc
    }, {})
)

  
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <p className="mt-2">Bienvenido: {user?.email}</p>

      <button
        onClick={handleLogout}
        className="mt-4 bg-red-500 text-white p-2"
      >
        Logout
      </button>
        {/* // 📊 Resumen */}
        <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-green-100 p-4 rounded-2xl shadow">
            <p className="text-sm">Ingresos</p>
            <p className="text-xl font-bold text-green-700">${totalIncome}</p>
        </div>

        <div className="bg-red-100 p-4 rounded-2xl shadow">
            <p className="text-sm">Gastos</p>
            <p className="text-xl font-bold text-red-700">${totalExpenses}</p>
        </div>

        <div className="bg-blue-100 p-4 rounded-2xl shadow">
            <p className="text-sm">Ahorro</p>
            <p className="text-xl font-bold text-blue-700">${savings}</p>
        </div>
        </div>

       {/* 📊 Gráfico de categorías */}
        <div className="mt-10 max-w-md">
  <h2 className="text-xl font-semibold">Gastos por categoría</h2>

  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={categoryData}
        dataKey="value"
        nameKey="name"
        outerRadius={100}
        label
      >
        {categoryData.map((entry, index) => (
          <Cell key={`cell-${index}`} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
</div>

      {/* 🧾 FORMULARIO */}
      <div className="mt-8 flex flex-col gap-3 max-w-md">
        <h2 className="text-xl font-semibold">Agregar gasto</h2>

        <input
          className="border p-2"
          placeholder="Monto"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          className="border p-2"
          placeholder="Categoría"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <select
        className="border p-2"
        value={type}
        onChange={(e) => setType(e.target.value)}
        >
        <option value="expense">Gasto</option>
        <option value="income">Ingreso</option>
        </select>

        <input
          className="border p-2"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          onClick={handleAddExpense}
          className="bg-green-600 text-white p-2"
        >
          Guardar gasto
        </button>

        {message && (
          <p className="text-sm text-gray-700">{message}</p>
        )}
      </div>
   

    {/* 📊 LISTADO DE GASTOS */}
<div className="mt-10 max-w-md">
  <h2 className="text-xl font-semibold">Tus gastos</h2>
  
  <p className="mt-2 font-bold">Total de gastos: ${totalExpenses}</p>
  <p className="mt-2 font-bold">Total de ingresos: ${totalIncome}</p>
  <p className="mt-2 font-bold">Ahorro: ${savings}</p>

  <ul className="mt-4 flex flex-col gap-2">
    {expenses.map((exp) => (
      <li key={exp.id} className="border p-2 rounded">
          <p className="text-xs text-gray-500">
        {new Date(exp.created_at).toLocaleDateString('es-AR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        })}
        </p>
        <p>
  <strong className={exp.type === 'expense' ? 'text-red-500' : 'text-green-600'}>
    ${exp.amount}
  </strong> - {exp.category}
</p>
        <p className="text-sm text-gray-600">{exp.description}</p>
      </li>
    ))}
  </ul>
</div>
      

      
    </div>
  )
}