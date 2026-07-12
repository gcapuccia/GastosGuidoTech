'use client'

import { useRouter } from 'next/navigation'

// Botón que lleva a la página /resumen (totales históricos + mes a mes)
export default function BotonResumen({
  className,
}: {
  className?: string
}) {
  const router = useRouter()

  const defaultClass = 'mt-4 inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg shadow-sm'
  const classes = className ? `${className} inline-flex items-center gap-2` : defaultClass

  return (
    <button onClick={() => router.push('/resumen')} className={classes} aria-label="Ir al resumen total">
      {/* Icono billetera/total */}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="6" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M16 15h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </button>
  )
}
