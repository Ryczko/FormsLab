import Head from 'next/head';
import withProtectedRoute from 'shared/HOC/withProtectedRoute';

import withFeatureToggles from 'shared/HOC/withFeatureToggles';
import useTranslation from 'next-translate/useTranslation';
import Account from 'features/account/Account';
import StandardPageWrapper from 'layout/StandardPageWrapper';
import withAnimation from 'shared/HOC/withAnimation';

function AccountPage() {
  const { t } = useTranslation('account');

  return (
    <StandardPageWrapper>
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content={t('content')} />
      </Head>

      <Account />
    </StandardPageWrapper>
  );
}

export default withFeatureToggles(
  withProtectedRoute(withAnimation(AccountPage)),
  [process.env.NEXT_PUBLIC_PROFILE_SETTINGS]
);
