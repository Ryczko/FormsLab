import Head from 'next/head';
import useRedirectWithTimeout from 'src/shared/hooks/useRedirectWithTimeout';

export default function FourOhFour() {
  const { secondsRemaining } = useRedirectWithTimeout('/', 5);
  return (
    <>
      <Head>
        <title>Page not found</title>
        <meta
          name="description"
          content="Employee Pulse (404) - This page cannot be found."
        />
      </Head>
      <h1 className="text-center text-2xl font-bold">
        This page cannot be found.
      </h1>
      <h2 className="mt-4 text-center text-xl">
        Redirecting to Homepage in {secondsRemaining}
        {secondsRemaining > 1 ? ' seconds' : ' second'}.
      </h2>
    </>
  );
}
