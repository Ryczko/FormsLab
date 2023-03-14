import '../styles/index.scss';
import '../styles/datepicker.scss';
import { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import PageLayout from '../layout/PageLayout';
import Head from 'next/head';
import { ApplicationContext } from 'src/features/application/context';
import { useApplicationManager } from 'src/features/application/manager';

function MyApp({ Component, pageProps }: AppProps) {
  const manager = useApplicationManager();

  return (
    <>
      <Head>
        <title>Employee Pulse</title>
      </Head>
      <ApplicationContext.Provider value={manager}>
        <PageLayout>
          <Toaster position="bottom-center" />

          <Component {...pageProps} />
        </PageLayout>
      </ApplicationContext.Provider>
    </>
  );
}

export default MyApp;
