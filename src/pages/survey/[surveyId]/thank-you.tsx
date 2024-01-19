import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import ThankYou from 'features/surveys/features/SurveyDisplay/components/ThankYou';
import ExternalPageWrapper from 'layout/ExternalRouteWrapper';

const ThankyouPage = () => {
  const { t } = useTranslation('thankyou');

  return (
    <ExternalPageWrapper>
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content={t('content')} />
      </Head>

      <ThankYou />
    </ExternalPageWrapper>
  );
};

export default ThankyouPage;
