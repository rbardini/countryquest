import { extendTheme } from '@chakra-ui/react'

export default extendTheme({
  config: {
    initialColorMode: 'system',
  },
  fonts: {
    heading: 'DosisVariable,sans-serif',
    body: 'DosisVariable,sans-serif',
  },
  styles: {
    global: {
      'div[role=progressbar]': {
        transitionProperty: 'var(--chakra-transition-property-common), width',
      },
    },
  },
})
