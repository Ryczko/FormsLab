import { TrashIcon } from '@heroicons/react/outline';
import { useRemoveSurvey } from 'features/surveys/hooks/useRemoveSurvey';
import React from 'react';
import Button, { ButtonVariant } from 'shared/components/Button/Button';
import StyledDialog from 'shared/components/StyledDialog/StyledDialog';
import useTranslation from 'next-translate/useTranslation';

type DeleteSurveyModalProps = {
  surveyId: string;
  isOpened: boolean;
  closeModal: () => void;
  onSuccess?: () => Promise<void>;
};

export default function DeleteSurveyModal({
  surveyId,
  isOpened,
  closeModal,
  onSuccess,
}: DeleteSurveyModalProps) {
  const { deleteSurvey, isRemoving } = useRemoveSurvey();
  const { t } = useTranslation('common');

  return (
    <StyledDialog
      isOpen={isOpened}
      onClose={closeModal}
      title={t('surveyRemoving.modalTitle')}
      content={
        <>
          <div className="mt-4">
            <p className="text-center text-sm text-red-500">
              {t('surveyRemoving.modalContentFirst')}&nbsp;
              <span className="font-bold">
                {t('surveyRemoving.modalContentSecond')}
              </span>{' '}
              {t('surveyRemoving.modalContentThird')}
            </p>
          </div>

          <div className="mt-5 flex flex-col-reverse justify-between gap-2 sm:flex-row">
            <Button
              variant={ButtonVariant.SECONDARY}
              onClick={closeModal}
              className="uppercase"
              disabled={isRemoving}
            >
              {t('surveyRemoving.modelCancelButton')}
            </Button>
            <Button
              variant={ButtonVariant.DANGER}
              onClick={() => deleteSurvey(surveyId, closeModal, onSuccess)}
              icon={<TrashIcon className="h-5 w-5" />}
              className="uppercase"
              isLoading={isRemoving}
            >
              {t('surveyRemoving.modalDeleteButton')}
            </Button>
          </div>
        </>
      }
    />
  );
}
