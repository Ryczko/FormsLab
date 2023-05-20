import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { Fragment, PropsWithChildren } from 'react';
import Background from 'layout/Background/Background';
import GlobalLoader from 'layout/GlobalLoader/GlobalLoader';
import Navigation from 'layout/Navigation/Navigation';
import { useApplicationContext } from 'features/application/context';
import { useGlobalProgressBar } from 'layout/hooks/useGlobalProgressBar';

function PageLayout({ children }: PropsWithChildren) {
  useGlobalProgressBar();
  const { loading } = useApplicationContext();
  const router = useRouter();

  return (
    <>
      <AnimatePresence>{loading && <GlobalLoader />}</AnimatePresence>
      <Navigation />
      <div className="m-auto mb-8 min-h-full max-w-2xl overflow-hidden px-6 pt-24 text-center sm:px-8 md:pt-32">
        <Background />
        <AnimatePresence exitBeforeEnter initial={false}>
          <Fragment key={router.asPath}>{children}</Fragment>
        </AnimatePresence>
      </div>
    </>
  );
}

export default PageLayout;
