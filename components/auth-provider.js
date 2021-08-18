import { createContext, useEffect, useState } from 'react'
import supabase from '../lib/supabase'

export const AuthContext = createContext()

export default function AuthProvider(props) {
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => setSession(session),
    )

    return () => authListener?.unsubscribe()
  }, [])

  return <AuthContext.Provider value={session} {...props} />
}
