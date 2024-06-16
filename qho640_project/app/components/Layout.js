// components/Layout.js
import Navbar from './Navbar';
import Footer from './Footer';
import "../globals.css";

// Layout component to wrap the entire app
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
