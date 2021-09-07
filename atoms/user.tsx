import { selectAtom } from 'jotai/utils'
import sessionAtom from './session'

const userAtom = selectAtom(sessionAtom, session => session?.user)

export default userAtom
