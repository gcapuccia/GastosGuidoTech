'use client'

import React, { useState } from 'react'

// Formulario estilizado para agregar ingresos/gastos.
// Usa Tailwind para un aspecto moderno y minimalista.
export default function ExpenseForm({ onAdd }: any) {
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('expense')
  const [error, setError] = useState('')

  // Envío del formulario con validaciones simples
  const handleSubmit = (e?: any) => {
    if (e) e.preventDefault()
    setError('')
    const numericAmount = Number(amount)

    if (!amount || isNaN(numericAmount) || numericAmount <= 0) {
      setError('El monto debe ser mayor a 0')
      return
    }

    if (!category) {
      setError('La categoría es obligatoria')
      return
    }

    onAdd({
      amount: numericAmount,
      category,
      description,
      type,
    })

    // Reset campos
    setAmount('')
    setCategory('')
    setDescription('')
    setType('expense')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-slate-600 mb-1">Monto</label>
          <input
            type="number"
            step="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-300"
            placeholder="0"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-slate-600 mb-1">Tipo</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border rounded-lg p-2"
          >
            <option value="expense">Gasto</option>
            <option value="income">Ingreso</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-slate-600 mb-1">Categoría</label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Categoría"
            className="border rounded-lg p-2"
          />
        </div>
      </div>

      <div className="mt-3">
        <label className="text-sm font-medium text-slate-600 mb-1 block">Descripción</label>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción (opcional)"
          className="w-full border rounded-lg p-2"
        />
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          className="bg-slate-900 text-white px-4 py-2 rounded-lg shadow-sm"
        >
          Guardar
        </button>

        <button
          type="button"
          onClick={() => {
            setAmount('')
            setCategory('')
            setDescription('')
            setType('expense')
            setError('')
          }}
          className="bg-white border px-4 py-2 rounded-lg"
        >
          Limpiar
        </button>
      </div>
    </form>
  )
}