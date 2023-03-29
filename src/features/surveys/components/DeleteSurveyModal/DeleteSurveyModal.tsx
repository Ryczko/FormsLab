import { TrashIcon } from '@heroicons/react/outline';
import { useRemoveSurvey } from 'features/surveys/hooks/useRemoveSurvey';
import React from 'react';
import Button, { ButtonVariant } from 'shared/components/Button/Button';
import StyledDialog from 'shared/components/StyledDialog/StyledDialog';

type DeleteSurveyModalProps = {
  surveyId: string;
  isOpened: boolean;
  closeModal: () => void;
  cb?: () => void;
};

export default function DeleteSurveyModal({
  surveyId,
  isOpened,
  closeModal,
  cb,
}: DeleteSurveyModalProps) {
  const { deleteSurvey, isRemoving } = useRemoveSurvey();

  return (
    <StyledDialog
      isOpen={isOpened}
      onClose={closeModal}
      title="Delete survey"
      content={
        <>
          <div className="mt-2">
            <p className="text-sm text-red-500">
              Are you sure you want to&nbsp;
              <span className="font-bold">delete</span> this survey?
            </p>
          </div>

          <div className="mt-6 flex justify-between">
            <Button
              variant={ButtonVariant.SECONDARY}
              onClick={closeModal}
              className="uppercase"
              disabled={isRemoving}
            >
              Cancel
            </Button>
            <Button
              variant={ButtonVariant.DANGER}
              onClick={deleteSurvey(surveyId, closeModal, cb)}
              icon={<TrashIcon className="h-5 w-5" />}
              className="uppercase"
              isLoading={isRemoving}
            >
              Delete
            </Button>
          </div>
        </>
      }
    />
  );
}
