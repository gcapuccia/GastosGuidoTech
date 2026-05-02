'use client'

import LoginCard from '@/components/LoginCard'
import { register } from 'module'

/* export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession()

      if (data.session) {
        router.push('/dashboard')
      }
    }

    checkUser() */
/*     TODO: agregar un loader mientras se chequea la sesión
    TODO: ver que pueda logearme y redirigirme al dashboard
    TODO: AGgregar funcion register para crear usuarios nuevos */
        export default function Home() {
          return (
            <div className="min-h-screen bg-[#f1f5f9] flex items-center justify-center p-6">
              <div className="w-full max-w-md">
                <LoginCard />
              </div>
            </div>
          )
        }