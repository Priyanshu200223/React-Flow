import App from 'next/app';
import React from 'react';
import "../styles/globals.css";
import "../styles/react-flow.css"

function MyApp({ Component, pageProps }) {
  // global styles, context providers, or other custom logic here

  return <Component {...pageProps} />;
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};

export default MyApp;
