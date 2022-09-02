import Navbar from "./core/Navbar";
import { home } from "../data";
import Head from "next/head";

const Layout = ({ children }) => (
  <div>
    <Head>
      <title>Pavan Hegde</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Navbar />
    {children}
  </div>
);
export default Layout;
