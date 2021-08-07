import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import {
  Badge,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  IconButton,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'

export default function Header() {
  const { toggleColorMode } = useColorMode()

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
      <ButtonGroup>
        <IconButton
          aria-label={`Switch to ${useColorModeValue('dark', 'light')} mode`}
          colorScheme={useColorModeValue('purple', 'yellow')}
          icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
          isRound
          onClick={toggleColorMode}
          variant="ghost"
        ></IconButton>
        {false && (
          <Button colorScheme="blue" variant="outline">
            Sign in
          </Button>
        )}
      </ButtonGroup>
    </Flex>
  )
}
