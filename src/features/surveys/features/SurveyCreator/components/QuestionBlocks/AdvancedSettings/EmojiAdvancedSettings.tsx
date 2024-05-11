import React from 'react';
import LogicalJump from 'features/surveys/features/SurveyCreator/components/LogicalJump/LogicalJump';
import { DraftQuestion } from 'features/surveys/features/SurveyCreator/managers/createSurveyManager/createSurveyManager';
import { useSurveyCreatorContext } from 'features/surveys/features/SurveyCreator/managers/createSurveyManager/context';
import { ComparisonType } from '@prisma/client';

import useTranslation from 'next-translate/useTranslation';
import { getAvailableOptions } from 'features/surveys/features/SurveyCreator/components/QuestionBlocks/AdvancedSettings/utils/getAvailableOptions';
import { getAvailableComparisons } from 'features/surveys/features/SurveyCreator/components/QuestionBlocks/AdvancedSettings/utils/getAvailableComparisons';
import { getAvailableJumps } from 'features/surveys/features/SurveyCreator/components/QuestionBlocks/AdvancedSettings/utils/getAvailableJumps';

interface EmojiAdvancedSettingsProps {
  questionData: DraftQuestion;
  questionIndex: number;
}

export default function EmojiAdvancedSettings({
  questionData,
  questionIndex,
}: EmojiAdvancedSettingsProps) {
  const { questions } = useSurveyCreatorContext();

  const { t } = useTranslation('surveyCreate');

  return (
    <div>
      <LogicalJump
        questionIndex={questionIndex}
        conditions={
          questionData.logicPaths?.map(() => ({
            comparisons: getAvailableComparisons([ComparisonType.EQUAL], t),
            options: getAvailableOptions(questionData.options ?? []),
            jumpQuestions: getAvailableJumps(questions, questionData),
          })) ?? []
        }
      />
    </div>
  );
}
