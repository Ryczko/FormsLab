import React from 'react';
import StyledDialog from 'shared/components/StyledDialog/StyledDialog';
import useTranslation from 'next-translate/useTranslation';
import Toggle from 'shared/components/Toggle/Toggle';
import { SurveyOptions } from 'features/surveys/features/SurveyCreator/managers/createSurveyManager/createSurveyManager';

type SurveyOptionsModalProps = {
  isOpened: boolean;
  closeModal: () => void;
  surveyOptions: SurveyOptions;
  updateOptions: (option: keyof SurveyOptions, value: boolean | string) => void;
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
            isEnabled={surveyOptions.displayTitle}
            classNames="gap-2 mb-4"
            testId="display-title-toggle"
            onToggle={() => {
              updateOptions('displayTitle', !surveyOptions.displayTitle);
            }}
            label={t('surveyOptionsModal.DisplayTitle')}
          />

          <hr className="my-4" />

          <Toggle
            isEnabled={surveyOptions.oneQuestionPerStep}
            classNames="gap-2"
            testId="one-per-step-toggle"
            onToggle={() => {
              updateOptions(
                'oneQuestionPerStep',
                !surveyOptions.oneQuestionPerStep
              );

              updateOptions('hideProgressBar', false);
            }}
            label={t('surveyOptionsModal.OneQuestionPerStep')}
          />

          {surveyOptions.oneQuestionPerStep ? (
            <Toggle
              isEnabled={surveyOptions.hideProgressBar}
              classNames="gap-2 mt-4"
              testId="display-title-toggle"
              onToggle={() => {
                updateOptions(
                  'hideProgressBar',
                  !surveyOptions.hideProgressBar
                );
              }}
              label={t('surveyOptionsModal.HideProgressBar')}
            />
          ) : (
            <></>
          )}

          <hr className="my-4" />
          <div className="flex items-center gap-3 text-sm">
            <div>Accent color</div>
            <input
              type="color"
              className="block h-8 w-10 cursor-pointer rounded-md border border-gray-200 bg-white p-0.5 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900"
              id="hs-color-input"
              value={surveyOptions.accentColor}
              onChange={(e) => {
                updateOptions('accentColor', e.target.value);
              }}
              title="Choose your color"
            />
          </div>
        </div>
      }
    />
  );
}
