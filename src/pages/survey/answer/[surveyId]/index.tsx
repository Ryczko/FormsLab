import {
  LinkIcon,
  RefreshIcon,
  TrashIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from '@heroicons/react/outline';

import Head from 'next/head';
import withAnimation from 'shared/HOC/withAnimation';
import withProtectedRoute from 'shared/HOC/withProtectedRoute';
import AnswerHeader from 'features/surveys/components/AnswerHeader/AnswerHeader';
import Header from 'shared/components/Header/Header';
import Loader from 'shared/components/Loader/Loader';
import AnswerTableRow from 'features/surveys/components/AnswerTableRow/AnswerTableRow';
import { useSurveyResultsManager } from 'features/surveys/managers/surveyResultsManager';
import Button, { ButtonVariant } from 'shared/components/Button/Button';
import useModal from 'features/surveys/hooks/useModal';
import DeleteSurveyModal from 'features/surveys/components/DeleteSurveyModal/DeleteSurveyModal';
import Toggle from 'shared/components/Toggle/Toggle';
import usePagination from 'features/surveys/hooks/usePagination';

function SurveyResultsPage() {
  const {
    isLoading,
    title,
    handleCopyLink,
    surveyId,
    getSurveyData,
    chartData,
    isSurveyActive,
    votes,
    createDate,
    showOnlyWithExtraFeedback,
    filteredAnswersData,
    answersData,
    setShowOnlyWithExtraFeedback,
    navigateToSurveys,
    updateSurveyStatus,
  } = useSurveyResultsManager();

  const { items, canGoNext, canGoPrev, goNext, goPrev, pageIndex, reset } =
    usePagination(filteredAnswersData);

  const {
    isModalOpen: isDeleteSurveyModalOpen,
    closeModal: closeDeleteSurveyModal,
    openModal: openDeleteSurveyModal,
  } = useModal();

  const handleRefresh = () => {
    getSurveyData(true);

    // reset the pagination
    reset();
  };

  const toggleShowOnlyWithExtraFeedback = (isChecked: boolean) => {
    setShowOnlyWithExtraFeedback(isChecked);
    
    // reset the pagination
    reset();
  };

  return (
    <>
      <Head>
        <title>Survey Answers</title>
        <meta name="description" content="Survey Answers - Employee Pulse" />
      </Head>
      <Loader isLoading={isLoading} />
      {!isLoading && (
        <div className="container mx-auto text-center">
          <Header>Answers for &quot;{title}&quot;</Header>
          <div className="mb-6 flex flex-col justify-center sm:flex-row md:mb-6">
            <Button
              title="Copy link to clipboard"
              onClick={handleCopyLink(surveyId)}
              variant={ButtonVariant.PRIMARY}
              className="mb-2 w-full justify-center sm:mr-2 sm:mb-0 sm:w-[260px]"
              icon={<LinkIcon className="h-5 w-5" />}
            >
              Copy link to survey
            </Button>
            <Button
              title="Refresh data"
              onClick={handleRefresh}
              variant={ButtonVariant.OUTLINE}
              className="mt-2 w-full justify-center sm:mt-0 sm:ml-2 sm:w-[170px]"
              icon={<RefreshIcon className="h-5 w-5" />}
            >
              Refresh
            </Button>
            <Button
              variant={ButtonVariant.DANGER}
              title="Delete survey"
              className="mt-2 justify-center px-3 sm:ml-4 sm:mt-0"
              onClick={openDeleteSurveyModal}
              icon={<TrashIcon className="h-5 w-5" />}
            />
          </div>

          <div className="mb-6 mt-3 flex justify-center md:mb-10">
            <Toggle
              isEnabled={isSurveyActive}
              onToggle={updateSurveyStatus}
              label="Is survey active"
            />
          </div>

          <hr className=" md:hidden" />
          <AnswerHeader
            chartData={chartData}
            totalVotes={votes}
            createDate={createDate}
          />

          {answersData.length > 0 && (
            <div className="mt-10 mb-4 flex justify-center">
              <Toggle
                isEnabled={showOnlyWithExtraFeedback}
                onToggle={toggleShowOnlyWithExtraFeedback}
                label="With extra feedback only"
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
            <div className="mt-4">No answers yet</div>
          )}
          <div className="flex justify-center">
            <div className="flex flex-row items-center">
              <Button
                variant={ButtonVariant.OUTLINE_PRIMARY}
                icon={<ArrowLeftIcon className="h-5 w-5" />}
                disabled={!canGoPrev}
                onClick={goPrev}
              />
              <div className="min-w-[100px]">
                <p className="text-center">{pageIndex + 1}</p>
              </div>
              <Button
                variant={ButtonVariant.OUTLINE_PRIMARY}
                icon={<ArrowRightIcon className="h-5 w-5" />}
                disabled={!canGoNext}
                onClick={goNext}
              />
            </div>
          </div>
        </div>
      )}
      <DeleteSurveyModal
        surveyId={surveyId}
        closeModal={closeDeleteSurveyModal}
        isOpened={isDeleteSurveyModalOpen}
        onSuccess={navigateToSurveys}
      />
    </>
  );
}

export default withProtectedRoute(withAnimation(SurveyResultsPage));
