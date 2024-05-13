// pages/_app.js
import '../app/globals.css';
import { AuthContextProvider } from '../app/auth/AuthContext';
import Layout from '../app/components/Layout';
import { CartProvider } from '../app/checkout/cartContext';


function MyApp({ Component, pageProps, initialCart }) {
  return (
    <AuthContextProvider>
      <CartProvider initialCart={initialCart}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </CartProvider>
    </AuthContextProvider>
  );
}

export default MyApp;