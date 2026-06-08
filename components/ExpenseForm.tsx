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

  // Clases compartidas para mantener un vocabulario de controles consistente
  const labelClass = 'text-sm font-medium text-slate-600 dark:text-slate-300 mb-1'
  const inputClass =
    'rounded-lg border border-slate-200 bg-white p-2 text-slate-900 placeholder:text-slate-400 transition focus:outline-none focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500'

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-slate-900 rounded-2xl shadow-md dark:shadow-none dark:ring-1 dark:ring-slate-800 p-6"
    >
      <h2 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">Nuevo movimiento</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="flex flex-col">
          <label htmlFor="amount" className={labelClass}>Monto</label>
          <input
            id="amount"
            type="number"
            inputMode="decimal"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={inputClass}
            placeholder="0,00"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="type" className={labelClass}>Tipo</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className={inputClass}
          >
            <option value="expense">Gasto</option>
            <option value="income">Ingreso</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="category" className={labelClass}>Categoría</label>
          <input
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Categoría"
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-3">
        <label htmlFor="description" className={`${labelClass} block`}>Descripción</label>
        <input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción (opcional)"
          className={`${inputClass} w-full`}
        />
      </div>

      {error && <p className="text-red-600 dark:text-red-400 text-sm mt-2">{error}</p>}

      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          className="bg-slate-900 text-white px-4 py-2 rounded-lg shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-white dark:bg-emerald-600 dark:hover:bg-emerald-500 dark:focus:ring-offset-slate-900"
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
          className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg transition hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700"
        >
          Limpiar
        </button>
      </div>
    </form>
  )
}