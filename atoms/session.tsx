import { Session } from '@supabase/supabase-js'
import { atom } from 'jotai'
import supabase from '../lib/supabase'

const sessionAtom = atom<Session | null>(
  (await supabase.auth.getSession()).data.session,
)
sessionAtom.onMount = setSession => {
  const { data } = supabase.auth.onAuthStateChange((_event, session) =>
    setSession(session),
  )

  return data.subscription.unsubscribe
}

export default sessionAtom
