import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { Fragment, PropsWithChildren } from 'react';
import Background from 'layout/Background/Background';
import GlobalLoader from 'layout/GlobalLoader/GlobalLoader';
import Navigation from 'layout/Navigation/Navigation';
import { useApplicationContext } from 'features/application/context';
import { useGlobalProgressBar } from 'layout/hooks/useGlobalProgressBar';
import Footer from 'layout/Footer/Footer';

function PageLayout({ children }: PropsWithChildren) {
  useGlobalProgressBar();
  const { loading } = useApplicationContext();
  const router = useRouter();

  return (
    <>
      <AnimatePresence>{loading && <GlobalLoader />}</AnimatePresence>
      <Navigation />
      <div className="relative min-h-screen">
        <div className="m-auto max-w-[54rem] overflow-hidden px-6 pb-[90px] pt-24 text-center">
          <Background />
          <AnimatePresence exitBeforeEnter initial={false}>
            <Fragment key={router.asPath}>{children}</Fragment>
          </AnimatePresence>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default PageLayout;
