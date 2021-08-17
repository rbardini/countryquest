import Profile from './profile'
import SignIn from './sign-in'

export default function Account({ session }) {
  return session ? <Profile user={session.user} /> : <SignIn />
}
