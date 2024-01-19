import React from 'react';
import StyledDialog from 'shared/components/StyledDialog/StyledDialog';
import useTranslation from 'next-translate/useTranslation';
import Toggle from 'shared/components/Toggle/Toggle';
import { SurveyOptions } from 'features/surveys/features/SurveyCreator/managers/createSurveyManager/createSurveyManager';

type SurveyOptionsModalProps = {
  isOpened: boolean;
  closeModal: () => void;
  surveyOptions: SurveyOptions;
  updateOptions: (option: keyof SurveyOptions, value: boolean) => void;
};

export default function SurveyOptionsModalModal({
  isOpened,
  closeModal,
  surveyOptions,
  updateOptions,
}: SurveyOptionsModalProps) {
  const { t } = useTranslation('common');

  return (
    <StyledDialog
      isOpen={isOpened}
      onClose={closeModal}
      title={t('surveyOptionsModal.title')}
      content={
        <div className="mb-2 mt-4">
          <Toggle
            isEnabled={surveyOptions.oneQuestionPerStep}
            classNames="gap-2"
            testId="one-per-step-toggle"
            onToggle={() => {
              updateOptions(
                'oneQuestionPerStep',
                !surveyOptions.oneQuestionPerStep
              );
            }}
            label={t('surveyOptionsModal.OneQuestionPerStep')}
          />
          <Toggle
            isEnabled={surveyOptions.displayTitle}
            classNames="gap-2 mt-4"
            testId="display-title-toggle"
            onToggle={() => {
              updateOptions('displayTitle', !surveyOptions.displayTitle);
            }}
            label={t('surveyOptionsModal.DisplayTitle')}
          />
        </div>
      }
    />
  );
}
