import { Flex, Link, Text, useColorModeValue } from '@chakra-ui/react'
import pkg from '../package.json'

export default function Footer() {
  const linkColor = useColorModeValue('blue.500', 'blue.200')

  return (
    <Flex fontSize="sm" gap={4} justifyContent="center" padding={8} wrap="wrap">
      <Text as="span">
        Made with ❤️ by{' '}
        <Link color={linkColor} href="https://rbardini.com/">
          Rafael Bardini
        </Link>
      </Text>
      <Text as="span">
        Data by{' '}
        <Link color={linkColor} href="https://restcountries.com/">
          REST Countries
        </Link>
      </Text>
      <Text as="span">
        <Link color={linkColor} href={pkg.repository.url.replace(/\.git$/, '')}>
          GitHub
        </Link>
      </Text>
    </Flex>
  )
}
