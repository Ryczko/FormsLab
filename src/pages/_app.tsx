import 'styles/index.scss';
import 'styles/github-corner.scss';
import 'styles/nprogress.scss';
import { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import PageLayout from 'layout/PageLayout';
import { ApplicationContext } from 'features/application/context';
import { useApplicationManager } from 'features/application/manager';

function MyApp({ Component, pageProps }: AppProps) {
  const manager = useApplicationManager();

  return (
    <ApplicationContext.Provider value={manager}>
      <Toaster position="bottom-center" />
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </ApplicationContext.Provider>
  );
}

export default MyApp;
