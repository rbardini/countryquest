import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react'

export default function ColorModeToggle() {
  const { toggleColorMode } = useColorMode()

  return (
    <IconButton
      aria-label={`Switch to ${useColorModeValue('dark', 'light')} mode`}
      colorScheme={useColorModeValue('purple', 'yellow')}
      icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
      isRound
      onClick={toggleColorMode}
      variant="ghost"
    ></IconButton>
  )
}
