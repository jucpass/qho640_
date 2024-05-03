// components/Layout.js
import Navbar from './Navbar';
import Footer from './Footer';
import "../globals.css";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
