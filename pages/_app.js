import { ChakraProvider } from '@chakra-ui/react'
import '@fontsource/dosis/variable.css'
import AuthProvider from '../components/auth-provider'
import theme from '../theme'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
