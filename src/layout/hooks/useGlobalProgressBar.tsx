import { useEffect } from 'react';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';

export const useGlobalProgressBar = () => {
  const router = useRouter();

  useEffect(() => {
    NProgress.configure({ showSpinner: false, minimum: 0.15, speed: 400 });
    const handleRouteChangeStart = (url: string) => {
      if (url !== router.asPath) {
        NProgress.start();
      }
    };
    const handleRouteChangeComplete = () => NProgress.done();

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeComplete);
    };
  }, [router]);
};
