import Head from 'next/head';
import withAnimation from 'shared/HOC/withAnimation';
import useTranslation from 'next-translate/useTranslation';
import { getSession } from 'next-auth/react';
import { NextPageContext } from 'next';
import LoginCard from 'features/authorization/LoginCard';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

function LoginPage() {
  const { t } = useTranslation('login');

  return (
    <>
      <Head>
        <title>{t('login:title')}</title>
        <meta name="description" content={t('login:content')} />
      </Head>

      <LoginCard />
    </>
  );
}

export default withAnimation(LoginPage);
