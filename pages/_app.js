import { Layout } from "../components";
import "../styles/globals.css";

import {StateProvider} from '../context/StateContext'
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <>
    <StateProvider>
    <Layout>
      <Toaster/>
      <Component {...pageProps} />
    </Layout>
    </StateProvider>
    </>
  );
}

export default MyApp;
