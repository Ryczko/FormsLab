import {
  ArrowDownIcon,
  ArrowRightIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import React, { useEffect } from 'react';
import Select from 'shared/components/Select/Select';
import { useSurveyCreatorContext } from 'features/surveys/features/SurveyCreator/managers/createSurveyManager/context';
import { ConditionOptions } from 'features/surveys/features/SurveyCreator/components/LogicalJump/LogicalJump';
import { ComparisonType, QuestionType } from '@prisma/client';

interface ConditionProps {
  elseCondition?: boolean;
  stepIndex: number;
  questionIndex: number;
  conditionOptions?: ConditionOptions;
}

export default function Condition({
  elseCondition,
  questionIndex,
  stepIndex,
  conditionOptions,
}: ConditionProps) {
  const {
    removeLogicPath,
    updateLogicPath,
    questions,
    isEditMode,
    isSubmitted,
  } = useSurveyCreatorContext();

  const currentQuestion = questions[questionIndex];

  useEffect(() => {
    if (conditionOptions?.comparisons.length === 1) {
      updateLogicPath(questionIndex, stepIndex, {
        comparisonType: conditionOptions.comparisons[0].value as ComparisonType,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="mb-2 flex items-center justify-between gap-4">
        <div className="flex flex-grow items-center gap-4">
          {elseCondition ? (
            <div className="mt-1 flex items-center gap-4">
              <ArrowDownIcon className="h-4 w-4" />
              Else continue to the next question
            </div>
          ) : (
            <>
              <ArrowRightIcon className="h-4 w-4" />
              if this answer
              {conditionOptions?.comparisons.length === 1 ? (
                ' is'
              ) : (
                <Select
                  classNames="flex-grow"
                  required
                  submitted={isSubmitted}
                  disabled={isEditMode}
                  selectedValue={
                    currentQuestion.logicPaths?.[stepIndex].comparisonType
                  }
                  onChangeCallback={(option) =>
                    updateLogicPath(questionIndex, stepIndex, {
                      comparisonType: option.value as ComparisonType,
                    })
                  }
                  options={conditionOptions?.comparisons ?? []}
                />
              )}
              <Select
                classNames="flex-grow"
                disabled={isEditMode}
                required
                submitted={isSubmitted}
                emojiContent={currentQuestion.type === QuestionType.EMOJI}
                selectedValue={
                  currentQuestion.logicPaths?.[stepIndex].selectedOption
                }
                onChangeCallback={(option) =>
                  updateLogicPath(questionIndex, stepIndex, {
                    selectedOption: option.value,
                  })
                }
                options={conditionOptions?.options ?? []}
              />
              jump to
              <Select
                classNames="flex-grow"
                disabled={isEditMode}
                required
                submitted={isSubmitted}
                selectedValue={
                  currentQuestion.logicPaths?.[stepIndex].nextQuestionId ??
                  undefined
                }
                onChangeCallback={(option) =>
                  updateLogicPath(questionIndex, stepIndex, {
                    nextQuestionId: option.value,
                  })
                }
                options={conditionOptions?.jumpQuestions ?? []}
              />
            </>
          )}
        </div>

        {!elseCondition && !isEditMode && (
          <TrashIcon
            onClick={() => removeLogicPath(questionIndex, stepIndex)}
            className="h-4 w-4 cursor-pointer text-red-800"
          />
        )}
      </div>
    </>
  );
}
