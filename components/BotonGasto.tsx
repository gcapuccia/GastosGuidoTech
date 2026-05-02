import { exportExpensesToExcel } from '@/lib/exportToExcel'

// Botón con icono para descargar los gastos en Excel
// Acepta `className` para adaptar su estilo y `compact` para mostrar solo el ícono.
export default function BotonGasto({
  expenses,
  className,
  compact = false,
}: {
  expenses: any[]
  className?: string
  compact?: boolean
}) {
  const defaultClass = 'mt-4 inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg shadow-sm'
  const classes = className ? `${className} inline-flex items-center gap-2` : defaultClass

  return (
    <button
      onClick={() => exportExpensesToExcel(expenses)}
      className={classes}
      aria-label="Descargar gastos en Excel"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 11l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 21H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {!compact && <span>Descargar Excel</span>}
    </button>
  )
}