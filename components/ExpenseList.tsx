// Lista de gastos: items con diseño de fila moderna y colores por tipo
export default function ExpenseList({ expenses = [], onDelete }: any) {
  const fmt = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 2, maximumFractionDigits: 2 })
  const dateFmt = (dStr: any) => {
    if (!dStr) return ''
    const d = new Date(dStr)
    return new Intl.DateTimeFormat('es-AR', { day: '2-digit', month: 'short', year: 'numeric' }).format(d)
  }

  // Empty state: enseña qué hacer en lugar de mostrar una lista vacía
  if (!expenses || expenses.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 dark:border-slate-700 p-8 text-center">
        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Todavía no hay movimientos</p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Cargá tu primer ingreso o gasto con el formulario.</p>
      </div>
    )
  }

  return (
    <ul className="space-y-3">
      {expenses.map((e: any) => (
        <li key={e.id} className="bg-white dark:bg-slate-800/60 rounded-xl shadow-sm dark:shadow-none dark:ring-1 dark:ring-slate-700/60 p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <div className={`w-12 h-12 shrink-0 rounded-lg flex items-center justify-center ${e.type === 'income' ? 'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400' : 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400'}`}>
              <span className="font-semibold">{e.type === 'income' ? '+' : '-'}</span>
            </div>

            <div className="min-w-0">
              <div className="text-sm text-slate-800 dark:text-slate-100 font-medium truncate">{e.category}</div>
              <div className="text-xs text-slate-400 dark:text-slate-500">{dateFmt(e.created_at)}</div>
              {e.description && <div className="text-xs text-slate-500 dark:text-slate-400 truncate">{e.description}</div>}
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className={`text-lg font-semibold ${e.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {fmt.format(e.amount)}
            </div>
            <button
              type="button"
              onClick={() => {
                if (confirm('¿Eliminar movimiento?')) {
                  onDelete(e.id)
                }
              }}
              className="text-slate-400 hover:text-red-600 dark:text-slate-500 dark:hover:text-red-400 transition p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500/50"
              aria-label="Eliminar movimiento"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M8 6V4H16V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M19 6L18 20H6L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}