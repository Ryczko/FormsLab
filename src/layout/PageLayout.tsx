import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { Fragment, PropsWithChildren } from 'react';
import Background from 'layout/Background/Background';
import GlobalLoader from 'layout/GlobalLoader/GlobalLoader';
import Navigation from 'layout/Navigation/Navigation';
import { useApplicationContext } from 'features/application/context';
import { useGlobalProgressBar } from 'layout/hooks/useGlobalProgressBar';
import Footer from 'layout/Footer/Footer';
import { HIDDEN_ELEMENTS_ROUTES } from 'shared/constants/routesConfig';
import clsx from 'clsx';

function PageLayout({ children }: PropsWithChildren) {
  useGlobalProgressBar();
  const { loading } = useApplicationContext();
  const router = useRouter();

  return (
    <>
      <AnimatePresence>{loading && <GlobalLoader />}</AnimatePresence>
      <div className="max-h-screen-dvh relative flex h-screen flex-col justify-between">
        {!HIDDEN_ELEMENTS_ROUTES.includes(router.pathname) && <Navigation />}
        <div
          className={clsx(
            'mx-auto w-full overflow-auto px-6 py-8 text-center',
            HIDDEN_ELEMENTS_ROUTES.includes(router.pathname)
              ? 'my-auto'
              : 'flex-grow'
          )}
        >
          {!HIDDEN_ELEMENTS_ROUTES.includes(router.pathname) && <Background />}
          <AnimatePresence exitBeforeEnter initial={false}>
            <Fragment key={router.asPath}>
              <div className={clsx('mx-auto max-w-[54rem]')}>{children}</div>
            </Fragment>
          </AnimatePresence>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default PageLayout;
