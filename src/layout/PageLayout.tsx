import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import Background from './Background/Background';
import GlobalLoader from './GlobalLoader/GlobalLoader';
import Navigation from 'src/layout/Navigation/Navigation';
import { useApplicationContext } from 'src/features/application/context';

interface PageLayoutProps {
  children: React.ReactNode;
}

function PageLayout({ children }: PageLayoutProps) {
  const { loading } = useApplicationContext();
  const router = useRouter();

  return (
    <>
      <AnimatePresence>{loading && <GlobalLoader />}</AnimatePresence>
      <Navigation />
      <div className="overflow-hidden px-6 pt-24 m-auto mb-8 min-h-full sm:px-4 md:pt-32">
        <Background />
        <AnimatePresence exitBeforeEnter initial={false}>
          <Fragment key={router.asPath}>{children}</Fragment>
        </AnimatePresence>
      </div>
    </>
  );
}

export default PageLayout;
