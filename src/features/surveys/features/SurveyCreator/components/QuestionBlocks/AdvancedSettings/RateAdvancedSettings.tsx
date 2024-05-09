import React from 'react';
import LogicalJump from 'features/surveys/features/SurveyCreator/components/LogicalJump/LogicalJump';
import { DraftQuestion } from 'features/surveys/features/SurveyCreator/managers/createSurveyManager/createSurveyManager';
import { useSurveyCreatorContext } from 'features/surveys/features/SurveyCreator/managers/createSurveyManager/context';
import { ComparisonType } from '@prisma/client';

import useTranslation from 'next-translate/useTranslation';

interface RateAdvancedSettingsProps {
  questionData: DraftQuestion;
  questionIndex: number;
}

export default function RateAdvancedSettings({
  questionData,
  questionIndex,
}: RateAdvancedSettingsProps) {
  const { questions } = useSurveyCreatorContext();

  const { t } = useTranslation('surveyCreate');

  const getAvailableJumps = () => {
    // TODO: handle in the future
    // const endOfSurveyStep = {
    //   title: 'End of survey',
    //   draftId: 'END_OF_SURVEY',
    // };

    const availableQuestions = questions.filter(
      (question) => question.draftId !== questionData.draftId
    );

    const allAvailableSteps = [...availableQuestions];

    const namesWithValues = allAvailableSteps.map((step) => ({
      name: step.title,
      value: step.draftId,
    }));

    return namesWithValues;
  };

  const getAvailableComparisons = () => {
    const availableComparisons = [
      ComparisonType.LESS_THAN,
      ComparisonType.EQUAL,
      ComparisonType.GREATER_THAN,
    ];

    const namesWithValues = availableComparisons.map((comparison) => ({
      name: t(comparison),
      value: comparison,
    }));

    return namesWithValues;
  };

  const getAvailableOptions = () => {
    const availableOptions = ['1', '2', '3', '4', '5'];

    const namesWithValues = availableOptions.map((option) => ({
      name: option,
      value: option,
    }));

    return namesWithValues;
  };

  return (
    <div>
      <LogicalJump
        questionIndex={questionIndex}
        conditions={
          questionData.logicPaths?.map(() => ({
            comparisons: getAvailableComparisons(),
            options: getAvailableOptions(),
            jumpQuestions: getAvailableJumps(),
          })) ?? []
        }
      />
    </div>
  );
}
