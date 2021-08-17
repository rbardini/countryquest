import { useToken } from '@chakra-ui/react'
import BoringAvatar from 'boring-avatars'
import useColorModeToken from '../hooks/use-color-mode-token'

export default function Avatar({ size: sizeToken = 10, user: { email } }) {
  const size = useToken('sizes', sizeToken)
  const colors = useColorModeToken(
    'colors',
    ['red.200', 'orange.200', 'yellow.200', 'green.200'],
    ['pink.700', 'purple.700', 'cyan.700', 'teal.700'],
  )

  return (
    <BoringAvatar colors={colors} name={email} size={size} variant="beam" />
  )
}
