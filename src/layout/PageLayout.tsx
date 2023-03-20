import { AnimatePresence } from 'framer-motion';
import Background from './Background/Background';

import GlobalLoader from './GlobalLoader/GlobalLoader';
import Navigation from 'src/layout/Navigation/Navigation';
import { useApplicationContext } from 'src/features/application/context';

interface PageLayoutProps {
  children: React.ReactNode;
}

function PageLayout({ children }: PageLayoutProps) {
  const { loading } = useApplicationContext();

  return (
    <>
      <AnimatePresence>{loading && <GlobalLoader />}</AnimatePresence>
      <Navigation />
      <div className="m-auto min-h-screen overflow-hidden px-6 pt-32 sm:px-4">
        <Background />
        <AnimatePresence exitBeforeEnter initial={false}>
          {children}
        </AnimatePresence>
      </div>
    </>
  );
}

export default PageLayout;
