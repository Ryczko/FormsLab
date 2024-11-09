import Toggle from 'shared/components/Toggle/Toggle';
import {
  PencilIcon,
  RefreshIcon,
  ShareIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import NoAnswers from '/public/images/no-answers.svg';
import Image from 'next/image';

import AnswerHeader from 'features/surveys/features/SurveyResults/components/AnswerHeader/AnswerHeader';
import Button, { ButtonVariant } from 'shared/components/Button/Button';
import useTranslation from 'next-translate/useTranslation';

import useModal from 'features/surveys/hooks/useModal';
import DeleteSurveyModal from 'features/surveys/components/DeleteSurveyModal/DeleteSurveyModal';
import ShareSurveyModal from 'features/surveys/components/ShareSurveryModal/ShareSurveyModal';
import { useRouter } from 'next/router';
import Tabs from 'shared/components/Tabs/Tabs';
import { useSurveyResultsContext } from 'features/surveys/features/SurveyResults/managers/context';
import SummaryResults from 'features/surveys/features/SurveyResults/components/SummaryResults/SummaryResults';
import IndividualResults from 'features/surveys/features/SurveyResults/components/IndividualResults/IndividualResults';

export default function SurveyResults() {
  const { t } = useTranslation('surveyAnswer');

  const {
    surveyId,
    getSurveyData,
    surveyData,
    isDataLoading,
    onRemoveSuccess,
    updateSurveyStatus,
    isStatusLoading,
  } = useSurveyResultsContext();

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

  const router = useRouter();

  const handleEditSurvey = () => {
    router.push(`/survey/edit/${surveyId}`);
  };

  return (
    <>
      <div className="mb-6 flex flex-col items-center justify-between gap-x-8 sm:mb-4 sm:flex-row">
        <h1 className="flex min-h-[38px] items-center border-indigo-200 pb-2 text-xl font-semibold sm:border-l-4 sm:pb-0 sm:pl-4 sm:text-left">
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
            title={'Edit survey'}
            onClick={handleEditSurvey}
            className="grow sm:grow-0"
            variant={ButtonVariant.PRIMARY}
            icon={<PencilIcon className="h-5 w-5" />}
          />
          <Button
            title={t('shareSurvey')}
            onClick={openShareSurveyModal}
            className="grow sm:grow-0"
            variant={ButtonVariant.PRIMARY}
            icon={<ShareIcon className="h-5 w-5" />}
          />

          <Button
            title={t('buttonRefreshTitle')}
            onClick={getSurveyData}
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

      <Tabs
        categories={{
          Summary: <SummaryResults />,
          Individual: <IndividualResults />,
        }}
      />

      {surveyData?.answers?.length === 0 && (
        <>
          <Image
            className="mx-auto mt-12 w-[140px]"
            src={NoAnswers}
            height={160}
            alt="no answers"
          />
          <div className="my-6">{t('noAnswers')}</div>
          <Button
            title={t('shareSurvey')}
            onClick={openShareSurveyModal}
            className="mx-auto w-full sm:w-[200px]"
            variant={ButtonVariant.PRIMARY}
            icon={<ShareIcon className="h-5 w-5" />}
          >
            <span className="ml-2">{t('shareSurvey')}</span>
          </Button>
        </>
      )}

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
  );
}
