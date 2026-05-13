// Lista de gastos: items con diseño de fila moderna y colores por tipo
export default function ExpenseList({ expenses = [], onDelete }: any) {
  const fmt = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })
  const dateFmt = (dStr: any) => {
    if (!dStr) return ''
    const d = new Date(dStr)
    return new Intl.DateTimeFormat('es-AR', { day: '2-digit', month: 'short', year: 'numeric' }).format(d)
  }

  return (
    <ul className="space-y-3">
      {expenses.map((e: any) => (
        <li key={e.id} className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${e.type === 'income' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
              <span className="font-semibold">{e.type === 'income' ? '+' : '-'}</span>
            </div>

            <div>
              <div className="text-sm text-slate-800 font-medium">{e.category}</div>
              <div className="text-xs text-slate-400">{dateFmt(e.created_at)}</div>
              <div className="text-xs text-slate-500">{e.description}</div>
              <button onClick={() => {
                if (confirm('¿Eliminar movimiento?')) {
                   onDelete(e.id)
              }   
            }}
              className="text-red-500 hover:text-red-700 transition" aria-label="Eliminar gasto"> 
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M8 6V4H16V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M19 6L18 20H6L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg></button>
            </div>
          </div>

          <div className={`text-lg font-semibold ${e.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
            {fmt.format(e.amount)}
          </div>
        </li>
      ))}
    </ul>
  )
}