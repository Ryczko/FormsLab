import useTranslation from 'next-translate/useTranslation';

import React from 'react';
import Header from 'shared/components/Header/Header';
import { useSurveyCreatorContext } from 'features/surveys/features/SurveyCreator/context';
import TitleAndConfigSection from 'features/surveys/features/SurveyCreator/components/TitleAndConfigSection/TitleAndConfigSection';
import QuestionsSection from 'features/surveys/features/SurveyCreator/components/QuestionsSection/QuestionsSection';
import ActionButtons from 'features/surveys/features/SurveyCreator/components/ActionButtons/ActionButtons';

export default function SurveyCreator() {
  const { t } = useTranslation('surveyCreate');

  const { isEditMode } = useSurveyCreatorContext();

  return (
    <>
      <Header>{isEditMode ? t('editHeading') : t('heading')}</Header>

      <TitleAndConfigSection />
      <QuestionsSection />
      <ActionButtons />
    </>
  );
}
