import React from 'react';
import Header from 'shared/components/Header/Header';
import Button, {
  ButtonSize,
  ButtonVariant,
} from 'shared/components/Button/Button';
import useTranslation from 'next-translate/useTranslation';
import { AnswersComponentFactory } from 'features/surveys/features/SurveyDisplay/components/AnswersComponent/AnswersComponentFactory';
import { useSurveyDisplayContext } from 'features/surveys/features/SurveyDisplay/context';
import { getFontColor } from 'features/surveys/features/SurveyDisplay/utils/getFontColor';

export default function AllQuestionView() {
  const { t } = useTranslation('survey');

  const { handleSave, isAnswering, formData } = useSurveyDisplayContext();

  return (
    <>
      {formData?.displayTitle && (
        <Header>{formData?.title.trim() || '-'}</Header>
      )}

      {formData?.questions.map((question, index) => {
        return (
          <AnswersComponentFactory key={question.id} questionIndex={index} />
        );
      })}

      {formData.questions.length > 0 && (
        <div className="flex justify-center">
          <Button
            onClick={() => handleSave()}
            variant={ButtonVariant.PRIMARY}
            sizeType={ButtonSize.FULL}
            isLoading={isAnswering}
            style={{
              backgroundColor: formData.accentColor ?? undefined,
              color: getFontColor(formData?.accentColor),
            }}
          >
            {t('sendButton')}
          </Button>
        </div>
      )}
    </>
  );
}
