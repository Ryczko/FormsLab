import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { Fragment, PropsWithChildren } from 'react';
import Background from './Background/Background';
import GlobalLoader from './GlobalLoader/GlobalLoader';
import Navigation from 'src/layout/Navigation/Navigation';
import { useApplicationContext } from 'src/features/application/context';

function PageLayout({ children }: PropsWithChildren) {
  const { loading } = useApplicationContext();
  const router = useRouter();

  return (
    <>
      <AnimatePresence>{loading && <GlobalLoader />}</AnimatePresence>
      <Navigation />
      <div className="m-auto mb-8 min-h-full overflow-hidden px-6 pt-24 sm:px-4 md:pt-32">
        <Background />
        <AnimatePresence exitBeforeEnter initial={false}>
          <Fragment key={router.asPath}>{children}</Fragment>
        </AnimatePresence>
      </div>
    </>
  );
}

export default PageLayout;
