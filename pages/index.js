import dynamic from "next/dynamic";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const WorldMap = dynamic(() => import("../components/world-map"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Countryquest</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <WorldMap />
    </div>
  );
}
