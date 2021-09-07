import { useAtomValue } from 'jotai/utils'
import userAtom from '../atoms/user'
import Profile from './profile'
import SignIn from './sign-in'

export default function Account() {
  const user = useAtomValue(userAtom)

  return user ? <Profile user={user} /> : <SignIn />
}
