import { useAuthState } from 'react-firebase-hooks/auth';
import Link from 'next/link';

import { ButtonSize, ButtonVariant } from '../Components/Button';
import { auth } from '../firebase';
import withAnimation from '../HOC/withAnimation';
import ButtonLink from '../Components/ButtonLink/ButtonLink';
import Head from 'next/head';

function IndexPage() {
  const [user, loading] = useAuthState(auth);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className="flex flex-col overflow-hidden">
        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              <div className="text-center pb-12 md:pb-16">
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4">
                  How are you&nbsp;
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-100">
                    feeling?
                  </span>
                </h1>
                <div className="max-w-3xl mx-auto">
                  <p className="text-xl text-zinc-600 mb-8">
                    There is no better way to find out than Employee Pulse
                  </p>
                  <div className="max-w-xs mx-auto sm:max-w-none flex flex-col sm:flex-row sm:space-y-0 space-y-2 sm:justify-center sm:space-x-4">
                    {!loading && !user && (
                      <Link href={'/login'} passHref>
                        <ButtonLink
                          variant={ButtonVariant.PRIMARY}
                          className="w-full sm:w-auto"
                        >
                          Sign In
                        </ButtonLink>
                      </Link>
                    )}

                    <Link href={'/survey/create'} passHref>
                      <ButtonLink
                        variant={ButtonVariant.OUTLINE_PRIMARY}
                        className="w-full sm:w-auto"
                      >
                        Create Survey
                      </ButtonLink>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default withAnimation(IndexPage);
