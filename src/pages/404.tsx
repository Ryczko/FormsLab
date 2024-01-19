import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import ButtonLink from 'shared/components/ButtonLink/ButtonLink';
import { ButtonVariant } from 'shared/components/Button/Button';
import StandardPageWrapper from 'layout/StandardPageWrapper';

export default function FourOhFour() {
  const { t } = useTranslation('404');
  return (
    <StandardPageWrapper>
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content={t('content')} />
      </Head>
      <section>
        <div className="mt-12 px-4 py-8 lg:px-6 lg:py-16">
          <h1 className="text-primary-300 mb-2 text-7xl font-extrabold tracking-tight text-indigo-300 lg:text-8xl">
            404
          </h1>

          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            {t('header')}
          </p>
          <ButtonLink href="/" variant={ButtonVariant.PRIMARY}>
            {t('backToHome')}
          </ButtonLink>
        </div>
      </section>
    </StandardPageWrapper>
  );
}
