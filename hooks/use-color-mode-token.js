import { useColorModeValue, useToken } from '@chakra-ui/react'

export default function useColorModeToken(
  scale,
  lightToken,
  darkToken,
  fallback,
) {
  const token = useColorModeValue(lightToken, darkToken)

  return useToken(scale, token, fallback)
}
