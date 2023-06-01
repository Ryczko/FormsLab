import Head from 'next/head';
import withAnimation from 'shared/HOC/withAnimation';
import ButtonLink from 'shared/components/ButtonLink/ButtonLink';
import { ButtonVariant } from 'shared/components/Button/Button';
import { useApplicationContext } from 'features/application/context';
import useTranslation from 'next-translate/useTranslation';

function IndexPage() {
  const { user, loading } = useApplicationContext();
  const { t } = useTranslation('home');

  return (
    <>
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content={t('content')} />
      </Head>
      <div className="mb-16 pt-28 md:pt-48">
        <h1 className="leading-tighter mb-4 text-4xl font-extrabold tracking-tighter md:text-6xl">
          {t('firstPartHeading')}&nbsp;
          <span className="bg-gradient-to-r from-indigo-600 to-indigo-100 bg-clip-text text-transparent">
            {t('secondPartHeading')}
          </span>
        </h1>
        <p className="mb-8 text-xl text-zinc-600">{t('Description')}</p>
        <div className="flex flex-col space-y-2 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
          {!loading && !user && (
            <ButtonLink
              href={'/login'}
              variant={ButtonVariant.PRIMARY}
              className="w-full sm:w-auto"
            >
              {t('buttonSignIn')}
            </ButtonLink>
          )}

          <ButtonLink
            href={'/survey/create'}
            data-test-id="create-survey"
            variant={ButtonVariant.OUTLINE_PRIMARY}
            className="w-full sm:w-auto"
          >
            {t('buttonCreateSurvey')}
          </ButtonLink>
        </div>
      </div>
    </>
  );
}

export default withAnimation(IndexPage);
