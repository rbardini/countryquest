import { ChakraProvider } from '@chakra-ui/react'
import '@fontsource/dosis/variable.css'
import theme from '../theme'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
