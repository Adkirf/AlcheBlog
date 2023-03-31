import React from 'react';
import { Layout } from '../components';
import '../styles/globals.css'
import 'tailwindcss/tailwind.css';
import { SessionProvider } from "next-auth/react"



export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session} >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

