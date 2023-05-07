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
  onSuccess?: () => void;
};

export default function DeleteSurveyModal({
  surveyId,
  isOpened,
  closeModal,
  onSuccess,
}: DeleteSurveyModalProps) {
  const { deleteSurvey, isRemoving } = useRemoveSurvey();
  const { t } = useTranslation('surveyComponents');

  return (
    <StyledDialog
      isOpen={isOpened}
      onClose={closeModal}
      title={t('modalTitle')}
      content={
        <>
          <div className="mt-2">
            <p className="text-sm text-red-500">
              {t('modalContentFirst')}&nbsp;
              <span className="font-bold">{t('modalContentSecond')}</span>{' '}
              {t('modalContentThird')}
            </p>
          </div>

          <div className="mt-6 flex justify-between">
            <Button
              variant={ButtonVariant.SECONDARY}
              onClick={closeModal}
              className="uppercase"
              disabled={isRemoving}
            >
              {t('modelCancelButton')}
            </Button>
            <Button
              variant={ButtonVariant.DANGER}
              onClick={deleteSurvey(surveyId, closeModal, onSuccess)}
              icon={<TrashIcon className="h-5 w-5" />}
              className="uppercase"
              isLoading={isRemoving}
            >
              {t('modalDeleteButton')}
            </Button>
          </div>
        </>
      }
    />
  );
}
