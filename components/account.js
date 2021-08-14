import Profile from './profile'
import SignIn from './sign-in'

export default function Account({ session }) {
  return session ? <Profile session={session} /> : <SignIn session={session} />
}
