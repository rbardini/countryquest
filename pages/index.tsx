import { Box, Divider } from '@chakra-ui/react'
import Head from 'next/head'
import Content from '../components/content'
import Footer from '../components/footer'
import Header from '../components/header'

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
