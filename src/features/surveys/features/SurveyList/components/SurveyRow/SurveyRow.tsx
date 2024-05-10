import { ShareIcon, TrashIcon } from '@heroicons/react/outline';

import { useRouter } from 'next/router';
import Button, { ButtonVariant } from 'shared/components/Button/Button';

import DeleteSurveyModal from 'features/surveys/components/DeleteSurveyModal/DeleteSurveyModal';
import useModal from 'features/surveys/hooks/useModal';
import useTranslation from 'next-translate/useTranslation';
import ShareSurveyModal from 'features/surveys/components/ShareSurveryModal/ShareSurveyModal';

interface SurveyRowProps {
  question: string;
  createDate: string;
  id: string;
  refreshSurveys: () => Promise<void>;
}

export default function SurveyRow({
  question,
  createDate,
  id,
  refreshSurveys,
}: SurveyRowProps) {
  const navigate = useRouter();
  const {
    isModalOpen: isDeleteSurveyModalOpen,
    closeModal: closeDeleteSurveyModal,
    openModal: openDeleteSurveyModal,
  } = useModal();
  const { t } = useTranslation('surveys');

  const {
    isModalOpen: isShareSurveyModalOpen,
    closeModal: closeShareSurveyModal,
    openModal: openShareSurveyModal,
  } = useModal();

  const handleShare = () => {
    openShareSurveyModal();
  };

  const handleOnMoreButton = () => {
    navigate.push(`/survey/answer/${id}`, undefined, { scroll: false });
  };

  return (
    <div className="mb-4 flex w-full flex-col md:mb-3 md:flex-row">
      <div className="flex w-full items-center justify-between rounded-md border bg-white px-4 py-3 shadow-sm">
        <div title={question} className="w-40 truncate text-left md:w-60">
          {question}
        </div>
        <div className="hidden items-center space-x-2 text-sm xsm:flex">
          <div>{createDate}</div>
        </div>
      </div>
      <div className="flex w-full md:ml-2 md:w-auto">
        <Button
          variant={ButtonVariant.OUTLINE}
          className="mr-2 mt-2 w-full px-4 md:mt-0 md:w-auto"
          onClick={handleOnMoreButton}
        >
          {t('moreButton')}
        </Button>

        <Button
          variant={ButtonVariant.PRIMARY}
          className={
            'mt-2 w-full justify-center px-3 text-center md:mt-0 md:w-auto'
          }
          title={t('copyLinkButtonTitle')}
          icon={<ShareIcon className="h-5 w-5" />}
          onClick={handleShare}
        />
        <Button
          variant={ButtonVariant.DANGER}
          title={t('deleteSurveyButtonTitle')}
          className="ml-2 mt-2 w-full justify-center px-3 md:mt-0 md:w-auto"
          onClick={openDeleteSurveyModal}
          icon={<TrashIcon className="h-5 w-5" />}
        />
      </div>
      <DeleteSurveyModal
        surveyId={id}
        closeModal={closeDeleteSurveyModal}
        onSuccess={refreshSurveys}
        isOpened={isDeleteSurveyModalOpen}
      />
      <ShareSurveyModal
        surveyId={id}
        closeModal={closeShareSurveyModal}
        isOpened={isShareSurveyModalOpen}
      />
    </div>
  );
}
