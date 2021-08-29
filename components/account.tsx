import useUser from '../hooks/use-user'
import Profile from './profile'
import SignIn from './sign-in'

export default function Account() {
  const user = useUser()

  return user ? <Profile user={user} /> : <SignIn />
}
