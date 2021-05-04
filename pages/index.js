import { Box, Center, Divider, Spinner } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Footer from "../components/footer";
import Header from "../components/header";

const Content = dynamic(() => import("../components/content"), {
  ssr: false,
  loading: () => (
    <Center blockSize="80vh">
      <Spinner color="gray.300" size="xl" />
    </Center>
  ),
});

export default function Home() {
  return (
    <Box>
      <Head>
        <title>Countryquest</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Divider />
      <Content />
      <Divider />
      <Footer />
    </Box>
  );
}
