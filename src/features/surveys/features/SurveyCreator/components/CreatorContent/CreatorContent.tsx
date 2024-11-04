import React from 'react';
import ActionButtons from 'features/surveys/features/SurveyCreator/components/ActionButtons/ActionButtons';
import QuestionsSection from 'features/surveys/features/SurveyCreator/components/QuestionsSection/QuestionsSection';
import TitleAndConfigSection from 'features/surveys/features/SurveyCreator/components/TitleAndConfigSection/TitleAndConfigSection';
import withAnimation from 'shared/HOC/withAnimation';

function CreatorContent() {
  return (
    <>
      <TitleAndConfigSection />
      <QuestionsSection />
      <ActionButtons />
    </>
  );
}

export default withAnimation(CreatorContent);
