import React from 'react';
import LogicalJump from 'features/surveys/features/SurveyCreator/components/LogicalJump/LogicalJump';
import { DraftQuestion } from 'features/surveys/features/SurveyCreator/managers/createSurveyManager/createSurveyManager';
import { useSurveyCreatorContext } from 'features/surveys/features/SurveyCreator/managers/createSurveyManager/context';
import { ComparisonType } from '@prisma/client';

interface RateAdvancedSettingsProps {
  questionData: DraftQuestion;
  questionIndex: number;
}

export default function RateAdvancedSettings({
  questionData,
  questionIndex,
}: RateAdvancedSettingsProps) {
  const { questions } = useSurveyCreatorContext();

  const getAvailableJumps = () => {
    const availableSteps = ['End of survey'];

    const availableQuestions = questions
      .filter((question) => question.id !== questionData.id)
      .map((question) => question.title);

    const allAvailableSteps = [...availableQuestions, ...availableSteps];

    const namesWithValues = allAvailableSteps.map((step) => ({
      name: step,
      value: step,
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
      name: comparison,
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
          questionData.logicPath?.map((condition) => ({
            comparisons: getAvailableComparisons(),
            options: getAvailableOptions(),
            jumpQuestions: getAvailableJumps(),
          })) ?? []
        }
      />
    </div>
  );
}
