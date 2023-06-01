import Image from 'next/image';
import Head from 'next/head';
import { formatDateDistance } from 'shared/utilities/convertTime';
import withAnimation from 'shared/HOC/withAnimation';
import withProtectedRoute from 'shared/HOC/withProtectedRoute';
import Header from 'shared/components/Header/Header';
import SurveyRow from 'features/surveys/components/SurveyRow/SurveyRow';
import NoSurveys from '../../../public/images/no-surveys.svg';
import Button, { ButtonVariant } from 'shared/components/Button/Button';
import ButtonLink from 'shared/components/ButtonLink/ButtonLink';
import usePagination from 'features/surveys/hooks/usePagination';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/outline';
import useTranslation from 'next-translate/useTranslation';
import { InferGetServerSidePropsType, NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import { getAllUserSurveys } from 'pages/api/survey';
import { Survey } from '@prisma/client';

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
  const { items, canGoNext, canGoPrev, goNext, goPrev, pageIndex } =
    usePagination<Survey>(surveys ?? [], { size: 8 });
  const { t } = useTranslation('surveys');

  return (
    <>
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content={t('content')} />
      </Head>

      <Header>{t('heading')}</Header>

      <div className="flex flex-col items-center justify-center">
        {surveys &&
          (items?.length > 0 ? (
            items.map((item) => {
              return (
                <SurveyRow
                  key={item.id}
                  id={item.id}
                  question={item.title}
                  createDate={formatDateDistance(item.createdAt)}
                ></SurveyRow>
              );
            })
          ) : (
            <>
              <Image
                className="mt-2 w-[160px] -translate-x-3"
                src={NoSurveys}
                alt="no surveys"
              />
              <p className="my-8">{t('noSurveys')}</p>
              <ButtonLink
                href={'/survey/create'}
                variant={ButtonVariant.OUTLINE_PRIMARY}
                className="w-full sm:w-auto"
              >
                {t('buttonCreateSurvey')}
              </ButtonLink>
            </>
          ))}
      </div>
      {(canGoNext || canGoPrev) && (
        <div className="mt-2 flex flex-row items-center justify-center">
          <Button
            variant={ButtonVariant.OUTLINE_PRIMARY}
            className="px-4"
            icon={<ArrowLeftIcon className="h-5 w-5" />}
            disabled={!canGoPrev}
            onClick={goPrev}
          />
          <div className="min-w-[100px]">
            <p className="text-center">{pageIndex + 1}</p>
          </div>
          <Button
            variant={ButtonVariant.OUTLINE_PRIMARY}
            className="px-4"
            icon={<ArrowRightIcon className="h-5 w-5" />}
            disabled={!canGoNext}
            onClick={goNext}
          />
        </div>
      )}
    </>
  );
}
export default withProtectedRoute(withAnimation(SurveyListPage));
