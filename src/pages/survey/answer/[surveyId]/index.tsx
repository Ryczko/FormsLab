// commented elements are not supported yet in the new version

import {
  LinkIcon,
  RefreshIcon,
  // TrashIcon,
  // ArrowLeftIcon,
  // ArrowRightIcon,
} from '@heroicons/react/outline';

import Head from 'next/head';
import withAnimation from 'shared/HOC/withAnimation';
import withProtectedRoute from 'shared/HOC/withProtectedRoute';
import AnswerHeader from 'features/surveys/components/AnswerHeader/AnswerHeader';
import Header from 'shared/components/Header/Header';
// import AnswerTableRow from 'features/surveys/components/AnswerTableRow/AnswerTableRow';
import { useSurveyResultsManager } from 'features/surveys/managers/surveyResultsManager';
import Button, { ButtonVariant } from 'shared/components/Button/Button';
// import useModal from 'features/surveys/hooks/useModal';
// import DeleteSurveyModal from 'features/surveys/components/DeleteSurveyModal/DeleteSurveyModal';
// import Toggle from 'shared/components/Toggle/Toggle';
// import usePagination from 'features/surveys/hooks/usePagination';
import useTranslation from 'next-translate/useTranslation';
import { InferGetServerSidePropsType, NextPageContext } from 'next';
import { getSession } from 'next-auth/react';

import { getSurveyWithAnswers } from 'pages/api/survey/[id]';
import { SurveyWithAnswers } from 'types/SurveyWithAnswers';

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
    title,
    handleCopyLink,
    surveyId,
    getSurveyData,
    chartData,
    // isSurveyActive,
    votes,
    createDate,
    // showOnlyWithExtraFeedback,
    // filteredAnswersData,
    // answersData,
    // setShowOnlyWithExtraFeedback,
    // navigateToSurveys,
    // updateSurveyStatus,
  } = useSurveyResultsManager(initialData);

  // const { items, canGoNext, canGoPrev, goNext, goPrev, pageIndex, reset } =
  //   usePagination(filteredAnswersData, { size: 10 });

  const { t } = useTranslation('surveyAnswer');

  // const {
  //   isModalOpen: isDeleteSurveyModalOpen,
  //   closeModal: closeDeleteSurveyModal,
  //    openModal: openDeleteSurveyModal,
  // } = useModal();

  const handleRefresh = () => {
    getSurveyData(true);

    // reset the pagination
    // reset();
  };

  // const toggleShowOnlyWithExtraFeedback = (isChecked: boolean) => {
  //   setShowOnlyWithExtraFeedback(isChecked);

  //   // reset the pagination
  //   reset();
  // };

  return (
    <>
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content={t('content')} />
      </Head>

      <>
        <Header>{title}</Header>
        <div className="mb-6 flex flex-col justify-center sm:flex-row md:mb-10">
          <Button
            title={t('buttonCopyLinkTitle')}
            onClick={handleCopyLink(surveyId)}
            variant={ButtonVariant.PRIMARY}
            className="mb-2 w-full justify-center sm:mb-0 sm:w-[260px]"
            icon={<LinkIcon className="h-5 w-5" />}
          >
            {t('buttonCopyLink')}
          </Button>
          {!process.env.NEXT_PUBLIC_LIVE_ANSWERS_UPDATE && (
            <Button
              title={t('buttonRefreshTitle')}
              onClick={handleRefresh}
              variant={ButtonVariant.OUTLINE}
              className="mt-2 justify-center px-3 sm:ml-2 sm:mt-0"
              icon={<RefreshIcon className="h-5 w-5" />}
            />
          )}

          {/* <Button
              variant={ButtonVariant.DANGER}
              title={t('buttonDeleteSurveyTitle')}
              className="mt-2 justify-center px-3 sm:ml-2 sm:mt-0"
              onClick={openDeleteSurveyModal}
              icon={<TrashIcon className="h-5 w-5" />}
            /> */}
        </div>

        {/* <div className="mb-6 mt-3 flex justify-center md:mb-10">
            <Toggle
              isEnabled={isSurveyActive}
              onToggle={updateSurveyStatus}
              label={t('toggleSureveyActive')}
            />
          </div> */}

        <hr className=" md:hidden" />
        <AnswerHeader
          chartData={chartData}
          totalVotes={votes}
          createDate={createDate}
        />

        {chartData.length === 0 && <div className="my-4">{t('noAnswers')}</div>}

        {/* <>
            {answersData.length > 0 && (
              <div className="mb-4 mt-10 flex justify-center">
                <Toggle
                  isEnabled={showOnlyWithExtraFeedback}
                  onToggle={toggleShowOnlyWithExtraFeedback}
                  label={t('toogleFeedback')}
                />
              </div>
            )}

            {items.length > 0 ? (
              <div className="mb-6">
                {items.map((answer) => (
                  <AnswerTableRow
                    key={answer.id}
                    time={answer.answerDate}
                    selectedIcon={answer.selectedIcon}
                    text={answer.answer}
                  />
                ))}
              </div>
            ) : (
              <div className="my-4">{t('noAnswers')}</div>
            )}
            {(canGoNext || canGoPrev) && (
              <div className="flex justify-center">
                <div className="flex flex-row items-center">
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
              </div>
            )}
          </> */}
      </>

      {/* <DeleteSurveyModal
        surveyId={surveyId}
        closeModal={closeDeleteSurveyModal}
        isOpened={isDeleteSurveyModalOpen}
        onSuccess={navigateToSurveys}
      /> */}
    </>
  );
}

export default withProtectedRoute(withAnimation(SurveyResultsPage));
