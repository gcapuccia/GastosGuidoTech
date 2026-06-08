"use client"

import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

// Componente de login.
// - Maneja inicio de sesión y registro con Supabase
// - Muestra estados: loading, error y mensajes
// - Estilo moderno con Tailwind (card centrada, inputs con íconos)
export default function LoginCard() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  // Si ya hay sesión, redirigir al dashboard
  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const { data } = await supabase.auth.getSession()
        if (mounted && data?.session) router.push('/dashboard')
      } catch (e) {
        // no bloquear la UI por errores de check
      }
    })()
    return () => { mounted = false }
  }, [router])

  // Maneja login con validaciones simples
  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setError('')
    setMessage('')

    if (!email || !password) {
      setError('Email y contraseña son requeridos')
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setError(error.message)
        return
      }
      setMessage('Inicio de sesión correcto. Redirigiendo...')
      router.push('/dashboard')
    } catch (err) {
      console.error(err)
      setError('Error inesperado. Intentá nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  // Maneja registro (sign up). Informa al usuario que revise su mail.
  const handleRegister = async () => {
    setError('')
    setMessage('')
    if (!email || !password) {
      setError('Email y contraseña son requeridos')
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setError(error.message)
      else setMessage('Cuenta creada. Revisá tu email para confirmar.')
    } catch (err) {
      console.error(err)
      setError('Error inesperado al registrarse')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg dark:shadow-none dark:ring-1 dark:ring-slate-800 p-8 mx-4">
      {/* Título */}
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Bienvenido de nuevo</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Gestioná tus finanzas como freelancer</p>

      {/* Formulario */}
      <form onSubmit={handleLogin} className="mt-6 space-y-4">
        {/* Email */}
        <div className="relative">
          <label className="sr-only">Email</label>
          <div className="absolute left-3 top-3 text-slate-400">
            {/* Icono sobre el input */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 8.5V18a2 2 0 002 2h14a2 2 0 002-2V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M21 6.5L12 13 3 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@ejemplo.com"
            className="w-full pl-10 border border-slate-200 rounded-lg p-3 bg-white text-slate-900 placeholder:text-slate-400 transition focus:outline-none focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
          />
        </div>

        {/* Password */}
        <div className="relative">
          <label className="sr-only">Contraseña</label>
          <div className="absolute left-3 top-3 text-slate-400">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="w-full pl-10 border border-slate-200 rounded-lg p-3 bg-white text-slate-900 placeholder:text-slate-400 transition focus:outline-none focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
          />
        </div>

        {/* Mensajes de error / éxito */}
        {error && <div className="text-sm text-red-600 dark:text-red-400">{error}</div>}
        {message && <div className="text-sm text-emerald-700 dark:text-emerald-400">{message}</div>}

        {/* Botón principal */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] text-white rounded-lg px-4 py-3 disabled:opacity-60"
        >
          {loading && (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
          )}
          <span>Iniciar sesión</span>
        </button>

        {/* Link de registro */}
        <div className="text-center">
          <button
            type="button"
            onClick={handleRegister}
            disabled={loading}
            className="text-sm text-slate-700 dark:text-slate-300 underline hover:text-emerald-600 dark:hover:text-emerald-400 transition"
          >
            ¿No tenés cuenta? Registrate
          </button>
        </div>
      </form>

      {/* Footer / ayuda */}
      <div className="mt-6 text-xs text-slate-400 dark:text-slate-500">Usamos Supabase Auth para gestionar tu cuenta.</div>
    </div>
  )
}
