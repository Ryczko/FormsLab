import useRedirect from 'src/shared/hooks/useRedirect';
import Head from 'next/head';

export default function FourOhFour() {
  const { secondsRemaining } = useRedirect('/', 5);
  return (
    <>
      <Head>
        <title>Page not found</title>
        <meta
          name="description"
          content="Employee Pulse (404) - This page cannot be found."
        />
      </Head>
      <h1 className="text-2xl font-bold text-center">
        This page cannot be found.
      </h1>
      <h2 className="mt-4 text-xl text-center">
        Redirecting to Homepage in {secondsRemaining}
        {secondsRemaining > 1 ? ' seconds' : ' second'}.
      </h2>
    </>
  );
}
