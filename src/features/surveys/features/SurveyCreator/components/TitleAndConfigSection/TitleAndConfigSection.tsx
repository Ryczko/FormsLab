import { CogIcon } from '@heroicons/react/outline';
import SurveyOptionsModalModal from 'features/surveys/components/SurveyOptionsModal/SurveyOptionsModal';
import useModal from 'features/surveys/hooks/useModal';
import useTranslation from 'next-translate/useTranslation';

import React from 'react';
import Button, { ButtonVariant } from 'shared/components/Button/Button';
import Input from 'shared/components/Input/Input';
import { MAX_TITLE_LENGTH } from 'shared/constants/surveysConfig';
import { useSurveyCreatorContext } from 'features/surveys/features/SurveyCreator/context';

export default function TitleAndConfigSection() {
  const { t } = useTranslation('surveyCreate');

  const {
    title,
    error,
    handleChangeTitle,
    surveyOptions,
    updateSurveyOptions,
  } = useSurveyCreatorContext();

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
            name="survey-title"
            placeholder={t('surveyTitlePlaceholder')}
            value={title}
            error={error}
            maxLength={MAX_TITLE_LENGTH}
            onChange={handleChangeTitle}
          />
        </div>

        <Button
          className="h-[42px] whitespace-nowrap border border-transparent sm:mt-2"
          variant={ButtonVariant.PRIMARY}
          onClick={openOptionsSurveyModal}
          icon={<CogIcon className="h-5 w-5" />}
          data-test-id="options-button"
        >
          <span className="ms-1">{t('options')}</span>
        </Button>
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
