import { Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import Head from "next/head";

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
      <Content />
    </Box>
  );
}
