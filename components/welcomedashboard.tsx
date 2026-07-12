"use client"

import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import BotonGasto from '@/components/BotonGasto'
import BotonAnalisis from '@/components/BotonAnalisis'
import BotonResumen from '@/components/BotonResumen'

// Navbar responsivo que muestra el nombre de la app, el email
// del usuario, un botón de logout (a la izquierda del email)
// y un toggle para modo oscuro. En móviles colapsa a un menú.
export default function WelcomeDashboard({ expenses }: any) {
  const [user, setUser] = useState<any>(null)
  const [open, setOpen] = useState(false) // estado del menú móvil
  const [isDark, setIsDark] = useState(false) // modo oscuro
  const router = useRouter()

  // Obtener usuario, sincronizar preferencia de tema (metadata del usuario) y
  // escuchar cambios de auth. Prioridad para el tema: metadata del usuario -> localStorage -> preferencia del sistema.
  useEffect(() => {
    let mounted = true
    let listener: any = null

    ;(async () => {
      try {
        const { data, error } = await supabase.auth.getUser()
        if (error) console.error('Error fetching user:', error)
        const currentUser = data?.user ?? null
        if (mounted) setUser(currentUser)

        // Determinar tema: metadata del usuario tiene prioridad
        let theme: string | null = null
        try {
          theme = currentUser?.user_metadata?.theme ?? null
        } catch (e) {
          theme = null
        }

        if (!theme) {
          try {
            theme = localStorage.getItem('theme')
          } catch (e) {
            theme = null
          }
        }

        if (!theme) {
          const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
          theme = prefersDark ? 'dark' : 'light'
        }

        if (mounted) {
          if (theme === 'dark') {
            document.documentElement.classList.add('dark')
            setIsDark(true)
          } else {
            document.documentElement.classList.remove('dark')
            setIsDark(false)
          }
          try {
            localStorage.setItem('theme', theme)
          } catch (e) {
            // ignore
          }
        }
      } catch (err) {
        console.error('Error init user/theme:', err)
      }
    })()

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null
      setUser(u)
      const userTheme = session?.user?.user_metadata?.theme ?? null
      if (userTheme) {
        if (userTheme === 'dark') {
          document.documentElement.classList.add('dark')
          setIsDark(true)
        } else {
          document.documentElement.classList.remove('dark')
          setIsDark(false)
        }
        try {
          localStorage.setItem('theme', userTheme)
        } catch (e) {
          // ignore
        }
      }
    })
    listener = data

    return () => {
      mounted = false
      try {
        listener?.subscription?.unsubscribe()
      } catch (e) {
        // ignore
      }
    }
  }, [])

  // Alternar modo oscuro, guardarlo en localStorage y en metadata del usuario (Supabase)
  const toggleDark = useCallback(async () => {
    const next = !isDark
    setIsDark(next)
    if (next) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')

    try {
      localStorage.setItem('theme', next ? 'dark' : 'light')
    } catch (e) {
      // ignore
    }

    // Intentar guardar la preferencia en la metadata del usuario para persistir entre dispositivos
    try {
      const { error } = await supabase.auth.updateUser({ data: { theme: next ? 'dark' : 'light' } })
      if (error) console.error('Error updating theme in Supabase:', error)
    } catch (e) {
      console.error('Error updating theme in Supabase:', e)
    }
  }, [isDark])

  // Logout mediante Supabase y redirección
  const handleLogout = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) console.error('Logout error:', error)
    } finally {
      setUser(null)
      router.push('/')
    }
  }, [router])

  return (
    <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Izquierda: nombre de la app */}
          <div className="flex items-center gap-3">
            <div className="text-lg font-bold text-slate-900 dark:text-white">App Gastos</div>
            <div className="text-xs text-slate-500 hidden sm:block">Freelancer · Finanzas</div>
          </div>

          {/* Desktop: acciones */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Logout a la izquierda del email (según requerimiento) */}
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 hover:text-white hover:bg-red-600 px-3 py-1 rounded-md transition"
            >
              Logout
            </button>

            <div className="text-sm text-slate-800 dark:text-slate-200">{user?.email ?? 'Invitado'}</div>

            {/* Botón de descarga (compacto, estilo similar al toggle) */}
            <BotonGasto
              expenses={expenses}
              compact
              className="ml-2 p-2 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
            />

            <BotonAnalisis className="ml-2 p-2 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 "/>

            <BotonResumen className="ml-2 p-2 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200" />

            {/* Toggle de modo oscuro */}
            <button
              onClick={toggleDark}
              aria-label="Toggle dark mode"
              className="ml-2 p-2 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
            >
              {isDark ? (
                // Icono luna (modo oscuro)
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                // Icono sol (modo claro)
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 3v2M12 19v2M3 12h2M19 12h2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile: botón de menú */}
          <div className="sm:hidden">
            <button
              onClick={() => setOpen(!open)}
              aria-label="Abrir menú"
              className="p-2 rounded-md text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800"
            >
              {open ? (
                // Icono cerrar
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                // Icono hamburguesa
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu desplegable */}
      {open && (
        <div className="sm:hidden border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <div className="px-4 pt-3 pb-4 space-y-2">
            <button
              onClick={handleLogout}
              className="w-full text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-slate-800 px-3 py-2 rounded-md"
            >
              Logout
            </button>

            <BotonGasto
              expenses={expenses}
              className="w-full justify-start px-3 py-2 rounded-md text-sm bg-slate-100 dark:bg-slate-800"
            />

            <BotonResumen className="w-full justify-start px-3 py-2 rounded-md text-sm bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200" />

            <div className="px-3 py-2 text-sm text-slate-800 dark:text-slate-200">{user?.email ?? 'Invitado'}</div>

            <button
              onClick={toggleDark}
              className="w-full text-left px-3 py-2 rounded-md text-sm bg-slate-100 dark:bg-slate-800"
            >
              {isDark ? 'Modo claro' : 'Modo oscuro'}
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}