import { Box, Center, Divider, Spinner } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Footer from '../components/footer'
import Header from '../components/header'

const Content = dynamic(() => import('../components/content'), {
  ssr: false,
  // eslint-disable-next-line react/display-name
  loading: () => (
    <Center blockSize="80vh">
      <Spinner color="gray.300" size="xl" />
    </Center>
  ),
})

export default function Home() {
  return (
    <Box>
      <Head>
        <title>Countryquest</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🗺️</text></svg>"
        ></link>
      </Head>
      <Header />
      <Divider />
      <Content />
      <Divider />
      <Footer />
    </Box>
  )
}
