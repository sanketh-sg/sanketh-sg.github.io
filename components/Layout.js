import Navbar from "./core/Navbar";
import { home } from "../data";

const Layout = ({ children }) => (
  <div>
    <Navbar />
    {children}
  </div>
);
export default Layout;
