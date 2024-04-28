import "@/styles/global.scss";
import Head from "next/head";

export default function App({ Component, pageProps: { ...pageProps } }) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="noopener noreferrer stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
