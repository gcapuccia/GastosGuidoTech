'use client'

import { useRouter } from 'next/navigation'

export default function BotonAnalisis({
  className,
  compact = false,
}: {
  className?: string
  compact?: boolean
}) {
  const router = useRouter()

  const defaultClass = 'mt-4 inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg shadow-sm'
  const classes = className ? `${className} inline-flex items-center gap-2` : defaultClass


  return (
    <button onClick={() => router.push('/analytics')} className={classes} aria-label="Ir a análisis" >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 20V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 20V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 20V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* base */}
        <path d="M3 20H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    </button>
  )
}