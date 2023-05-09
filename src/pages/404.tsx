import Head from 'next/head';
import useRedirectWithTimeout from 'shared/hooks/useRedirectWithTimeout';
import useTranslation from 'next-translate/useTranslation';

export default function FourOhFour() {
  const { secondsRemaining } = useRedirectWithTimeout('/', 5);
  const { t } = useTranslation('404');
  return (
    <>
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content={t('content')} />
      </Head>
      <h1 className="text-center text-2xl font-bold">{t('Heading')}</h1>
      <h2 className="mt-4 text-center text-xl">
        {t('Description')}
        &nbsp;{secondsRemaining}&nbsp;
        {secondsRemaining > 1 ? t('RedirectSeconds') : t('RedirectSecond')}.
      </h2>
    </>
  );
}
