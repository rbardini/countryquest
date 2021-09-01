import type { Session } from '@supabase/supabase-js'
import type { PropsWithChildren } from 'react'
import { createContext, useEffect, useState } from 'react'
import supabase from '../lib/supabase'

export const AuthContext = createContext<Session | null>(null)

export default function AuthProvider(props: PropsWithChildren<{}>) {
  const [session, setSession] = useState<Session | null>(
    supabase.auth.session(),
  )

  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => setSession(session),
    )

    return () => subscription?.unsubscribe()
  }, [])

  return <AuthContext.Provider value={session} {...props} />
}
