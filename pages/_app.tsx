import { ChakraProvider } from '@chakra-ui/react'
import '@fontsource/dosis/variable.css'
import type { AppProps } from 'next/app'
import theme from '../theme'

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default App
