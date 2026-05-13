import { useEffect, useState } from 'react'
import { getExpensesByMonth, addExpense, destroyExpense } from '@/services/expenseService'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export const useExpenses = (month: number, year: number) => {
  const [expenses, setExpenses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const fetchExpenses = async (month: number, year: number) => {
    try {
      const data = await getExpensesByMonth(month, year)
      //const data = await getExpenses()
      setExpenses(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  //que hace esta función createExpense? crea un nuevo gasto y luego vuelve a cargar la lista de gastos para mostrar el nuevo gasto agregado.
  const createExpense = async (expense: any) => {
    try {
      const { data: userData } = await supabase.auth.getUser()
      const user = userData.user
      if (!user) return
      await addExpense({
        ...expense,
        user_id: user.id,
      })
      await fetchExpenses(month, year)
    } catch (error) {
      console.error(error)
    }
  }

  const deleteExpense = async (id: string) => {
    try {

      await destroyExpense(id)
      await fetchExpenses(month, year)
    } catch (error) {
      console.error(error)
    }
  }


    useEffect(() => {
      
      const checkUser = async () => {
      const { data } = await supabase.auth.getUser()

      if (!data.user) {
        router.push('/') // 👈 redirige al login en caso de que no este logueado
      } else {
        setLoading(false)
      }
    }
    checkUser()


    fetchExpenses(month, year)
               }, [month, year])
      console.log('fetch con:', month, year)
      return { expenses, loading, createExpense, deleteExpense }
          }