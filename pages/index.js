import dynamic from "next/dynamic";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const Content = dynamic(() => import("../components/content"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Countryquest</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Content />
    </div>
  );
}
