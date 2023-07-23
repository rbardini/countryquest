import { extendTheme } from '@chakra-ui/react'

export default extendTheme({
  config: {
    initialColorMode: 'system',
  },
  fonts: {
    heading: '"Dosis Variable",sans-serif',
    body: '"Dosis Variable",sans-serif',
  },
  styles: {
    global: {
      'div[role=progressbar]': {
        transitionProperty: 'var(--chakra-transition-property-common), width',
      },
    },
  },
})
