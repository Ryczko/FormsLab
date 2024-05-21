import { useApplicationContext } from 'features/application/context';
import React from 'react';
import Button, { ButtonVariant } from 'shared/components/Button/Button';
import { MAX_QUESTIONS } from 'shared/constants/surveysConfig';
import { useSurveyCreatorContext } from 'features/surveys/features/SurveyCreator/managers/createSurveyManager/context';
import { AddQuestionButton } from 'features/surveys/features/SurveyCreator/components/AddQuestionButton/AddQuestionButton';
import useTranslation from 'next-translate/useTranslation';

export default function ActionButtons() {
  const { t } = useTranslation('surveyCreate');

  const { user } = useApplicationContext();

  const {
    createSurvey,
    isCreating,
    questions,
    addQuestion,
    signInToCreateSurvey,
    isEditMode,
    confirmEditSurvey,
    discardChanges,
  } = useSurveyCreatorContext();

  return (
    <div className="mt-2">
      {questions.length < MAX_QUESTIONS && !isEditMode && (
        <AddQuestionButton onClick={addQuestion} />
      )}

      <hr className="my-3" />
      {user ? (
        <div className="flex flex-col gap-2 sm:flex-row">
          {isEditMode && (
            <Button
              onClick={discardChanges}
              className="z-0 h-[50px] w-full"
              variant={ButtonVariant.OUTLINE}
              disabled={isCreating}
            >
              {t('discardChanges')}
            </Button>
          )}
          <Button
            name="create-survey"
            onClick={isEditMode ? confirmEditSurvey : createSurvey}
            className="z-0 h-[50px] w-full"
            variant={ButtonVariant.PRIMARY}
            isLoading={isCreating}
            disabled={questions.length === 0}
          >
            {isEditMode ? t('buttonSave') : t('buttonCreate')}
          </Button>
        </div>
      ) : (
        <Button
          onClick={signInToCreateSurvey}
          variant={ButtonVariant.PRIMARY}
          className="z-0 mt-2 h-[50px] w-full"
        >
          {t('signInToCreateSurvey')}
        </Button>
      )}
    </div>
  );
}
