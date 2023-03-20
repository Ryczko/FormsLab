import '../styles/index.scss';
import '../styles/datepicker.scss';
import '../styles/github-corner.scss';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import PageLayout from '../layout/PageLayout';
import { ApplicationContext } from 'src/features/application/context';
import { useApplicationManager } from 'src/features/application/manager';

function MyApp({ Component, pageProps }: AppProps) {
  const manager = useApplicationManager();

  return (
    <ApplicationContext.Provider value={manager}>
      <PageLayout>
        <Toaster position="bottom-center" />
        <Component {...pageProps} />
      </PageLayout>
    </ApplicationContext.Provider>
  );
}

export default MyApp;
