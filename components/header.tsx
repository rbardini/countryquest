import { Badge, Flex, Heading, useColorModeValue } from '@chakra-ui/react'
import Account from '../components/account'
import useIsClient from '../hooks/use-is-client'

export default function Header() {
  const isClient = useIsClient()

  return (
    <Flex
      alignItems="center"
      flexDirection="row"
      justifyContent="space-between"
      padding={8}
    >
      <Heading
        as="h1"
        bgClip="text"
        bgGradient={useColorModeValue(
          'linear(to-l, purple.500, pink.500)',
          'linear(to-l, pink.400, purple.400)',
        )}
      >
        Countryquest{' '}
        <Badge
          colorScheme={useColorModeValue('purple', 'pink')}
          variant="solid"
          verticalAlign="super"
        >
          beta
        </Badge>
      </Heading>
      {isClient && <Account />}
    </Flex>
  )
}
