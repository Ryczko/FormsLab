import 'styles/index.scss';
import 'styles/github-corner.scss';
import 'styles/nprogress.scss';
import { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import PageLayout from 'layout/PageLayout';
import { ApplicationContext } from 'features/application/context';
import { useApplicationManager } from 'features/application/manager';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const manager = useApplicationManager();

  return (
    <SessionProvider session={session}>
      <ApplicationContext.Provider value={manager}>
        <Toaster position="bottom-center" />
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </ApplicationContext.Provider>
    </SessionProvider>
  );
}

export default MyApp;
