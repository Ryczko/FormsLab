import Head from 'next/head';
import withProtectedRoute from 'shared/HOC/withProtectedRoute';
import { InferGetServerSidePropsType, NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import { getAllUserSurveys } from 'pages/api/survey';
import SurveyList from 'features/surveys/features/SurveyList/SurveyList';
import useTranslation from 'next-translate/useTranslation';
import StandardPageWrapper from 'layout/StandardPageWrapper';
import withAnimation from 'shared/HOC/withAnimation';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const surveys = await getAllUserSurveys(session.user.id);

  return {
    props: {
      surveys: JSON.parse(JSON.stringify(surveys)),
    },
  };
}

function SurveyListPage({
  surveys,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation('surveys');

  return (
    <StandardPageWrapper>
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content={t('content')} />
      </Head>

      <SurveyList initialData={surveys} />
    </StandardPageWrapper>
  );
}
export default withProtectedRoute(withAnimation(SurveyListPage));
