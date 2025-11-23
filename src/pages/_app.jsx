import "../styles/globals.css";
import Head from "next/head";
import { ChampionProvider } from "../../contexts/ChampionContext";

function App({ Component, pageProps }) {
  return (
    <ChampionProvider>
      <Head>
        <title>SummonerFinder.gg</title>
      </Head>
      <Component {...pageProps} />
    </ChampionProvider>
  );
}

export default App;
