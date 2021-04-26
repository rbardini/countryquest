import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "@fontsource/dosis/variable.css";

const theme = extendTheme({
  fonts: {
    heading: "DosisVariable, sans-serif",
    body: "DosisVariable, sans-serif",
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
