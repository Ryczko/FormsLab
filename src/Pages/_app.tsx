import '../styles/index.scss';
import '../styles/datepicker.scss';
import { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import PageLayout from '../Layouts/PageLayout';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Employee Pulse</title>
      </Head>
      <PageLayout>
        <Toaster position="bottom-center" />

        <Component {...pageProps} />
      </PageLayout>
    </>
  );
}

export default MyApp;
