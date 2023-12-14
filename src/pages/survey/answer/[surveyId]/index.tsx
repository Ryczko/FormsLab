import { RefreshIcon, ShareIcon, TrashIcon } from '@heroicons/react/outline';
import Toggle from 'shared/components/Toggle/Toggle';
import Head from 'next/head';
import withAnimation from 'shared/HOC/withAnimation';
import withProtectedRoute from 'shared/HOC/withProtectedRoute';
import AnswerHeader from 'features/surveys/components/AnswerHeader/AnswerHeader';
import { useSurveyResultsManager } from 'features/surveys/managers/surveyResultsManager';
import Button, { ButtonVariant } from 'shared/components/Button/Button';
import useTranslation from 'next-translate/useTranslation';
import { InferGetServerSidePropsType, NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import { getSurveyWithAnswers } from 'pages/api/survey/[id]';
import { getUsersById } from 'pages/api/survey/users/[id]';
import { SurveyWithAnswers } from 'types/SurveyWithAnswers';
import ResultComponent from 'features/surveys/components/ResultsComponents/ResultComponent';
import useModal from 'features/surveys/hooks/useModal';
import DeleteSurveyModal from 'features/surveys/components/DeleteSurveyModal/DeleteSurveyModal';
import ShareSurveyModal from 'features/surveys/components/ShareSurveryModal/ShareSurveyModal';
import DropDownMenu from 'features/surveys/components/DropDownMenu/DropDownMenu';

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
    session.user?.id,
    undefined
  )) as SurveyWithAnswers;

  if (!surveyData) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  const userList = await getUsersById(context.query.surveyId as string);
  return {
    props: {
      initialData: JSON.parse(JSON.stringify(surveyData)),
      userList,
    },
  };
}

function SurveyResultsPage({
  initialData,
  userList,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    surveyId,
    getUsersForDropDown,
    getSurveyData,
    surveyData,
    mappedAnswersData,
    isDataLoading,
    onRemoveSuccess,
    updateSurveyStatus,
    isStatusLoading,
  } = useSurveyResultsManager(initialData);

  const {
    isModalOpen: isDeleteSurveyModalOpen,
    closeModal: closeDeleteSurveyModal,
    openModal: openDeleteSurveyModal,
  } = useModal();

  const {
    isModalOpen: isShareSurveyModalOpen,
    closeModal: closeShareSurveyModal,
    openModal: openShareSurveyModal,
  } = useModal();

  const { t } = useTranslation('surveyAnswer');
  return (
    <>
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content={t('content')} />
      </Head>

      <>
        <div className="mb-6 flex flex-col items-center justify-between gap-x-8 sm:mb-4 sm:flex-row">
          <h1 className="flex min-h-[38px] items-center border-indigo-200 pb-4 text-xl font-semibold sm:border-l-4 sm:pb-0 sm:pl-4 sm:text-left">
            {surveyData?.title}
          </h1>
          <div className="flex w-full flex-wrap justify-center gap-2 sm:w-auto sm:flex-nowrap">
            <div className="flex w-full items-center justify-start">
              <Toggle
                classNames="mx-auto my-2 sm:my-0 sm:ml-0 sm:mr-2"
                isEnabled={!!surveyData?.isActive}
                onToggle={updateSurveyStatus}
                label={t('isActive')}
                isLoading={isStatusLoading}
              />
            </div>

            <Button
              title={t('buttonCopyLinkTitle')}
              onClick={openShareSurveyModal}
              className="grow sm:grow-0"
              variant={ButtonVariant.PRIMARY}
              icon={<ShareIcon className="h-5 w-5" />}
            />

            <Button
              title={t('buttonRefreshTitle')}
              onClick={() => getSurveyData(undefined)}
              isLoading={isDataLoading}
              className="grow sm:grow-0"
              variant={ButtonVariant.OUTLINE}
              icon={<RefreshIcon className="h-5 w-5" />}
            />

            <Button
              variant={ButtonVariant.DANGER}
              title={t('deleteSurveyButtonTitle')}
              onClick={openDeleteSurveyModal}
              className="grow sm:grow-0"
              icon={<TrashIcon className="h-5 w-5" />}
            />
          </div>
        </div>

        <hr />
        <AnswerHeader
          totalVotes={surveyData?.answers.length || 0}
          createDate={surveyData?.createdAt ?? ''}
        />

        {surveyData?.answers?.length === 0 && (
          <div className="mt-6">{t('noAnswers')}</div>
        )}

        <DropDownMenu surveyId={surveyId} 
          onChange={(value) => getSurveyData(value)}
          onOpen={getUsersForDropDown}
          userList={userList}
        />

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

        <ShareSurveyModal
          surveyId={surveyId}
          closeModal={closeShareSurveyModal}
          isOpened={isShareSurveyModalOpen}
        />
      </>
    </>
  );
}

export default withProtectedRoute(withAnimation(SurveyResultsPage));
