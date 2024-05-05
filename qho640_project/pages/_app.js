// pages/_app.js
import '../app/globals.css';
import { AuthContextProvider } from '../app/auth/AuthContext';
import Layout from '../app/components/Layout';
import { CartProvider } from '../app/checkout/cartContext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <CartProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </CartProvider>
    </AuthContextProvider>
  );
}

export default MyApp;