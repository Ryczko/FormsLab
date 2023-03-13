
import { AnimatePresence } from 'framer-motion';
import Background from '../components/Background/Background';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import GlobalLoader from './GlobalLoader/GlobalLoader';
import Navigation from 'src/components/Navigation/Navigation';

interface PageLayoutProps {
  children: React.ReactNode;
}

function PageLayout({ children }: PageLayoutProps) {
  const [, loading] = useAuthState(auth);
  return (
    <>
      <AnimatePresence>{loading && <GlobalLoader />}</AnimatePresence>
      <Navigation />
      <div className="overflow-hidden px-6 pt-32 m-auto min-h-screen sm:px-4">
        <Background />
        <AnimatePresence exitBeforeEnter initial={false}>
          {children}
        </AnimatePresence>
      </div>
    </>
  );
}

export default PageLayout;
