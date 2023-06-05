import { LinkIcon, RefreshIcon, TrashIcon } from '@heroicons/react/outline';

import Head from 'next/head';
import withAnimation from 'shared/HOC/withAnimation';
import withProtectedRoute from 'shared/HOC/withProtectedRoute';
import AnswerHeader from 'features/surveys/components/AnswerHeader/AnswerHeader';
import Header from 'shared/components/Header/Header';
import { useSurveyResultsManager } from 'features/surveys/managers/surveyResultsManager';
import Button, { ButtonVariant } from 'shared/components/Button/Button';

import useTranslation from 'next-translate/useTranslation';
import { InferGetServerSidePropsType, NextPageContext } from 'next';
import { getSession } from 'next-auth/react';

import { getSurveyWithAnswers } from 'pages/api/survey/[id]';
import { SurveyWithAnswers } from 'types/SurveyWithAnswers';
import ResultComponent from 'features/surveys/components/ResultsComponents/ResultComponent';
import useModal from 'features/surveys/hooks/useModal';
import DeleteSurveyModal from 'features/surveys/components/DeleteSurveyModal/DeleteSurveyModal';

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

  const surveyData = (await getSurveyWithAnswers(
    context.query.surveyId as string,
    session.user.id
  )) as SurveyWithAnswers;

  if (!surveyData) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  return {
    props: {
      initialData: JSON.parse(JSON.stringify(surveyData)),
    },
  };
}

function SurveyResultsPage({
  initialData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    handleCopyLink,
    surveyId,
    getSurveyData,
    surveyData,
    mappedAnswersData,
    isDataLoading,
    onRemoveSuccess,
  } = useSurveyResultsManager(initialData);

  const {
    isModalOpen: isDeleteSurveyModalOpen,
    closeModal: closeDeleteSurveyModal,
    openModal: openDeleteSurveyModal,
  } = useModal();

  const { t } = useTranslation('surveyAnswer');

  return (
    <>
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content={t('content')} />
      </Head>

      <>
        <Header>{surveyData?.title}</Header>
        <div className="mb-6 flex flex-col justify-center sm:flex-row">
          <Button
            title={t('buttonCopyLinkTitle')}
            onClick={handleCopyLink(surveyId)}
            variant={ButtonVariant.PRIMARY}
            className="w-full justify-center sm:mb-0 sm:w-[260px]"
            icon={<LinkIcon className="h-5 w-5" />}
          >
            {t('buttonCopyLink')}
          </Button>
          {!process.env.NEXT_PUBLIC_LIVE_ANSWERS_UPDATE && (
            <Button
              title={t('buttonRefreshTitle')}
              onClick={getSurveyData}
              isLoading={isDataLoading}
              variant={ButtonVariant.OUTLINE}
              className="mt-2 justify-center px-3 sm:ml-2 sm:mt-0"
              icon={<RefreshIcon className="h-5 w-5" />}
            />
          )}
          <Button
            variant={ButtonVariant.DANGER}
            title={t('deleteSurveyButtonTitle')}
            className="mt-2 justify-center px-3 sm:ml-2 sm:mt-0"
            onClick={openDeleteSurveyModal}
            icon={<TrashIcon className="h-5 w-5" />}
          />
        </div>

        <hr />
        <AnswerHeader
          totalVotes={surveyData?.answers.length || 0}
          createDate={surveyData?.createdAt ?? ''}
        />

        {surveyData?.answers.length === 0 && (
          <div className="mt-6">{t('noAnswers')}</div>
        )}

        {Object.keys(mappedAnswersData).map((key) => (
          <ResultComponent
            key={key}
            question={mappedAnswersData[key].question}
            type={mappedAnswersData[key].questionType}
            answers={mappedAnswersData[key].answers}
          />
        ))}

        <DeleteSurveyModal
          surveyId={surveyId}
          closeModal={closeDeleteSurveyModal}
          isOpened={isDeleteSurveyModalOpen}
          onSuccess={onRemoveSuccess}
        />
      </>
    </>
  );
}

export default withProtectedRoute(withAnimation(SurveyResultsPage));
