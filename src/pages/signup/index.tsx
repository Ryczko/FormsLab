import Head from 'next/head';
import withAnimation from 'shared/HOC/withAnimation';
import useTranslation from 'next-translate/useTranslation';
import { getSession } from 'next-auth/react';
import { NextPageContext } from 'next';
import SignUpCard from 'features/authorization/SignUpCard';

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

function SignupPage() {
  const { t } = useTranslation('signup');

  return (
    <>
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content={t('content')} />
      </Head>

      <SignUpCard />
    </>
  );
}

export default withAnimation(SignupPage);
