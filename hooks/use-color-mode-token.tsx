import { useColorModeValue, useToken } from '@chakra-ui/react'

export default function useColorModeToken<T extends string | number>(
  scale: string,
  lightToken: T | T[],
  darkToken: T | T[],
  fallback?: T | T[],
) {
  const token = useColorModeValue(lightToken, darkToken)

  return useToken(scale, token, fallback)
}
