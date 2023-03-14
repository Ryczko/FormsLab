import Link from 'next/link';

import withAnimation from '../shared/HOC/withAnimation';
import ButtonLink from '../shared/components/ButtonLink/ButtonLink';
import Head from 'next/head';
import { ButtonVariant } from 'src/shared/components/Button/Button';
import { useApplicationContext } from 'src/features/application/context';

function IndexPage() {
  const { user, loading } = useApplicationContext();

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className="flex overflow-hidden flex-col">
        <section className="relative">
          <div className="px-4 mx-auto max-w-6xl sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              <div className="pb-12 text-center md:pb-16">
                <h1 className="mb-4 text-4xl font-extrabold tracking-tighter md:text-6xl leading-tighter">
                  How are you&nbsp;
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-100">
                    feeling?
                  </span>
                </h1>
                <div className="mx-auto max-w-3xl">
                  <p className="mb-8 text-xl text-zinc-600">
                    There is no better way to find out than Employee Pulse
                  </p>
                  <div className="flex flex-col mx-auto space-y-2 max-w-xs sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4 sm:max-w-none">
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
