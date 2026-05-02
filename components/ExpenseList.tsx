// Lista de gastos: items con diseño de fila moderna y colores por tipo
export default function ExpenseList({ expenses = [] }: any) {
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