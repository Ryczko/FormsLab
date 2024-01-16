import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import ThankYou from 'features/surveys/features/SurveyDisplay/components/ThankYou';

const ThankyouPage = () => {
  const { t } = useTranslation('thankyou');

  return (
    <>
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content={t('content')} />
      </Head>

      <ThankYou />
    </>
  );
};

export default ThankyouPage;
