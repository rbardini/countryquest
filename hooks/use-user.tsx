import useSession from './use-session'

export default function useUser() {
  const session = useSession()

  return session?.user
}
