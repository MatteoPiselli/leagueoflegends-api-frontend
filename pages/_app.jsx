import "../styles/globals.css";
import Head from "next/head";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import summoner from "../reducers/summoner";

const store = configureStore({
  reducer: {
    summoner,
  },
});

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>SummonerFinder.gg</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
