import { atom } from 'jotai'
import supabase from '../lib/supabase'

const sessionAtom = atom(supabase.auth.session())
sessionAtom.onMount = setSession => {
  const { data: subscription } = supabase.auth.onAuthStateChange(
    (_event, session) => setSession(session),
  )

  return subscription?.unsubscribe
}

export default sessionAtom
