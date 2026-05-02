import { supabase } from '@/lib/supabaseClient'

/* export const getExpenses = async () => {
  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
} */

  export const getExpensesByMonth = async (month: number, year: number) => {
  const start = new Date(Date.UTC(year, month - 1, 1))
  const end = new Date(Date.UTC(year, month, 0, 23, 59, 59))

  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .gte('created_at', start.toISOString())
    .lte('created_at', end.toISOString())
    .order('created_at', { ascending: false })

    console.log('RANGO:', {
  start: start.toISOString(),
  end: end.toISOString(),
})

  if (error) throw error
  return data
}

export const addExpense = async (expense: any) => {
  const { error } = await supabase.from('expenses').insert([expense])

  if (error) throw error
}