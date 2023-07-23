import { useToken } from '@chakra-ui/react'
import type { User } from '@supabase/supabase-js'
import BoringAvatar from 'boring-avatars'
import useColorModeToken from '../hooks/use-color-mode-token'

type Props = {
  size?: string | number
  user: User
}

export default function Avatar({
  size: sizeToken = 10,
  user: { email },
}: Props) {
  const size = useToken('sizes', sizeToken, sizeToken)
  const colors = useColorModeToken(
    'colors',
    ['red.200', 'orange.200', 'yellow.200', 'green.200'],
    ['pink.700', 'purple.700', 'cyan.700', 'teal.700'],
  ) as string[]

  return (
    <BoringAvatar colors={colors} name={email} size={size} variant="beam" />
  )
}
