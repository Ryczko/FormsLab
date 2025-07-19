import { CogIcon, EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import SurveyOptionsModalModal from 'features/surveys/components/SurveyOptionsModal/SurveyOptionsModal';
import useModal from 'features/surveys/hooks/useModal';
import useTranslation from 'next-translate/useTranslation';

import React from 'react';
import Button, {
  ButtonSize,
  ButtonVariant,
} from 'shared/components/Button/Button';
import Input, { InputSize } from 'shared/components/Input/Input';
import { MAX_TITLE_LENGTH } from 'shared/constants/surveysConfig';
import { useSurveyCreatorContext } from 'features/surveys/features/SurveyCreator/managers/createSurveyManager/context';
import { usePreviewPanelContext } from 'features/surveys/features/SurveyCreator/managers/previewPanelManager/context';

export default function TitleAndConfigSection() {
  const { t } = useTranslation('surveyCreate');

  const {
    title,
    error,
    handleChangeTitle,
    surveyOptions,
    updateSurveyOptions,
  } = useSurveyCreatorContext();

  const { togglePanel, isPanelOpened } = usePreviewPanelContext();

  const {
    isModalOpen: isOptionsModalOpen,
    closeModal: closeOptionsSurveyModal,
    openModal: openOptionsSurveyModal,
  } = useModal();
  return (
    <>
      <div className="flex flex-col gap-x-2 sm:flex-row">
        <div className="w-full">
          <Input
            className="mt-0"
            name="survey-title"
            placeholder={t('surveyTitlePlaceholder')}
            value={title}
            error={error}
            maxLength={MAX_TITLE_LENGTH}
            onChange={handleChangeTitle}
            inputSize={InputSize.SMALL}
          />
        </div>

        <div className="flex gap-2">
          <Button
            className="flex-grow whitespace-nowrap"
            variant={ButtonVariant.PRIMARY}
            onClick={openOptionsSurveyModal}
            icon={<CogIcon className="h-5 w-5" />}
            data-test-id="options-button"
            sizeType={ButtonSize.SMALL}
          >
            <span className="ms-1">{t('options')}</span>
          </Button>
          <Button
            onClick={togglePanel}
            variant={ButtonVariant.PRIMARY}
            sizeType={ButtonSize.SMALL}
            icon={
              isPanelOpened ? (
                <EyeOffIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )
            }
            data-test-id="preview-button"
          />
        </div>
      </div>

      <SurveyOptionsModalModal
        isOpened={isOptionsModalOpen}
        closeModal={closeOptionsSurveyModal}
        surveyOptions={surveyOptions}
        updateOptions={updateSurveyOptions}
      />
    </>
  );
}
