import React from 'react';
import { Layout } from '../components';
import '../styles/globals.css'
import '../styles/globals.css';
import 'tailwindcss/tailwind.css';



function MyApp({ Component, pageProps }) {

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}



export default MyApp;