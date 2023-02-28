import { useAuthState } from 'react-firebase-hooks/auth';
import Link from 'next/link';

import { auth } from '../firebase';
import withAnimation from '../HOC/withAnimation';
import ButtonLink from '../components/ButtonLink/ButtonLink';
import Head from 'next/head';
import { ButtonVariant } from 'src/components/Button/Button';

function IndexPage() {
  const [user, loading] = useAuthState(auth);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className="flex flex-col overflow-hidden">
        <section className="relative">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              <div className="pb-12 text-center md:pb-16">
                <h1 className="leading-tighter mb-4 text-4xl font-extrabold tracking-tighter md:text-6xl">
                  How are you&nbsp;
                  <span className="bg-gradient-to-r from-indigo-600 to-indigo-100 bg-clip-text text-transparent">
                    feeling?
                  </span>
                </h1>
                <div className="mx-auto max-w-3xl">
                  <p className="mb-8 text-xl text-zinc-600">
                    There is no better way to find out than Employee Pulse
                  </p>
                  <div className="mx-auto flex max-w-xs flex-col space-y-2 sm:max-w-none sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
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
