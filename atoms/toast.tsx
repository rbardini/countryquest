import { createStandaloneToast } from '@chakra-ui/react'
import { atom } from 'jotai'
import theme from '../theme'

const toastAtom = atom(createStandaloneToast({ theme }))

export default toastAtom
