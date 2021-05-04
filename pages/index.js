import { Box, Divider } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Footer from "../components/footer";
import Header from "../components/header";

const Content = dynamic(() => import("../components/content"), {
  ssr: false,
});

export default function Home() {
  return (
    <Box minHeight="100vh">
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
