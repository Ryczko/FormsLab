import {
  ArrowDownIcon,
  ArrowRightIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import React from 'react';
import Select from 'shared/components/Select/Select';
import { useSurveyCreatorContext } from 'features/surveys/features/SurveyCreator/managers/createSurveyManager/context';
import { ConditionOptions } from 'features/surveys/features/SurveyCreator/components/LogicalJump/LogicalJump';
import { ComparisonType } from '@prisma/client';

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
  const { removeLogicPath, updateLogicPath, questions, isEditMode } =
    useSurveyCreatorContext();

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
              <Select
                classNames="flex-grow"
                disabled={isEditMode}
                selectedValue={
                  questions[questionIndex].logicPaths?.[stepIndex]
                    .comparisonType
                }
                onChangeCallback={(option) =>
                  updateLogicPath(questionIndex, stepIndex, {
                    comparisonType: option.value as ComparisonType,
                  })
                }
                options={
                  conditionOptions?.comparisons.map((comparison) => ({
                    name: comparison.name,
                    value: comparison.value,
                  })) ?? []
                }
              />
              <Select
                classNames="flex-grow"
                disabled={isEditMode}
                selectedValue={
                  questions[questionIndex].logicPaths?.[stepIndex]
                    .selectedOption
                }
                onChangeCallback={(option) =>
                  updateLogicPath(questionIndex, stepIndex, {
                    selectedOption: option.value,
                  })
                }
                options={
                  conditionOptions?.options.map((comparison) => ({
                    name: comparison.name,
                    value: comparison.value,
                  })) ?? []
                }
              />
              jump to
              <Select
                classNames="flex-grow"
                disabled={isEditMode}
                selectedValue={
                  questions[questionIndex].logicPaths?.[stepIndex]
                    .nextQuestionId ?? undefined
                }
                onChangeCallback={(option) =>
                  updateLogicPath(questionIndex, stepIndex, {
                    nextQuestionId: option.value,
                  })
                }
                options={
                  conditionOptions?.jumpQuestions.map((comparison) => ({
                    name: comparison.name,
                    value: comparison.value,
                  })) ?? []
                }
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
