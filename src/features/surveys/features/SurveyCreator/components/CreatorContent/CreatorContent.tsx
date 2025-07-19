import React from 'react';
import ActionButtons from 'features/surveys/features/SurveyCreator/components/ActionButtons/ActionButtons';
import QuestionsSection from 'features/surveys/features/SurveyCreator/components/QuestionsSection/QuestionsSection';
import TitleAndConfigSection from 'features/surveys/features/SurveyCreator/components/TitleAndConfigSection/TitleAndConfigSection';
import withAnimation from 'shared/HOC/withAnimation';
import Templates from 'features/surveys/features/SurveyCreator/components/Templates/Templates';
import { useSurveyCreatorContext } from 'features/surveys/features/SurveyCreator/managers/createSurveyManager/context';

function CreatorContent() {
  const { isEditMode } = useSurveyCreatorContext();

  return (
    <>
      {!isEditMode && <Templates />}
      <TitleAndConfigSection />
      <QuestionsSection />
      <ActionButtons />
    </>
  );
}

export default withAnimation(CreatorContent);
