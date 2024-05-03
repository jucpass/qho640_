// pages/_app.js
import '../app/globals.css';
import { AuthContextProvider } from '../app/auth/AuthContext';
import Layout from '../app/components/Layout';
//import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  );
}

export default MyApp;