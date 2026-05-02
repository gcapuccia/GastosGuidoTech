import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

export const exportExpensesToExcel = (data: any[]) => {
  const formatted = data.map((e) => ({
    Fecha: new Date(e.created_at).toLocaleDateString('es-AR'),
    Tipo: e.type === 'income' ? 'Ingreso' : 'Gasto',
    Monto: e.amount,
    Categoría: e.category,
    Descripción: e.description,
  }))

  const worksheet = XLSX.utils.json_to_sheet(formatted)
  const workbook = XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Gastos')

  const excelBuffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array',
  })

  const file = new Blob([excelBuffer], {
    type: 'application/octet-stream',
  })

  saveAs(file, 'gastos.xlsx')
}