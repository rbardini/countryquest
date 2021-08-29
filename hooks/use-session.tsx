import { useContext } from 'react'
import { AuthContext } from '../components/auth-provider'

export default function useSession() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error(`useSession must be used within an AuthProvider.`)
  }

  return context
}
