import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { Fragment, PropsWithChildren } from 'react';
import Background from 'layout/Background/Background';
import GlobalLoader from 'layout/GlobalLoader/GlobalLoader';
import Navigation from 'layout/Navigation/Navigation';
import { useApplicationContext } from 'features/application/context';
import { useGlobalProgressBar } from 'layout/hooks/useGlobalProgressBar';
import Footer from 'layout/Footer/Footer';
import {
  EXTERNAL_ROUTES,
  FULL_PAGE_ROUTES,
} from 'shared/constants/routesConfig';
import clsx from 'clsx';

function PageLayout({ children }: PropsWithChildren) {
  useGlobalProgressBar();
  const { loading } = useApplicationContext();
  const router = useRouter();

  const isExternalRoute = EXTERNAL_ROUTES.includes(router.pathname);
  const isFullPageRoute = FULL_PAGE_ROUTES.includes(router.pathname);

  return (
    <>
      <Background />
      <AnimatePresence>{loading && <GlobalLoader />}</AnimatePresence>
      <div className="min-h-screen-dvh flex flex-col justify-between overflow-x-hidden">
        {!isExternalRoute && <Navigation />}
        <div className={clsx('contents text-center', loading && 'hidden')}>
          <AnimatePresence exitBeforeEnter initial={false}>
            <Fragment key={router.asPath}>{children}</Fragment>
          </AnimatePresence>
        </div>
        {!isFullPageRoute && <Footer />}
      </div>
    </>
  );
}

export default PageLayout;
