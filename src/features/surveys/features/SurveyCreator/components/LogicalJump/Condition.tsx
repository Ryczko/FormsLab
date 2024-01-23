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
  const { removeLogicPath, updateLogicPath, questions } =
    useSurveyCreatorContext();

  return (
    <>
      <div className="flex items-center justify-between gap-4 py-2">
        <div className="flex flex-grow items-center gap-4">
          {elseCondition ? (
            <>
              <ArrowDownIcon className="h-4 w-4" />
              Else continue to the next question
            </>
          ) : (
            <>
              <ArrowRightIcon className="h-4 w-4" />
              if this answer
              <Select
                classNames="flex-grow"
                selectedValue={
                  questions[questionIndex].logicPath?.[stepIndex].comparisonType
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
                selectedValue={
                  questions[questionIndex].logicPath?.[stepIndex].value
                }
                onChangeCallback={(option) =>
                  updateLogicPath(questionIndex, stepIndex, {
                    value: option.value,
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
                selectedValue={
                  questions[questionIndex].logicPath?.[stepIndex].nextQuestionId
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

        {!elseCondition && (
          <TrashIcon
            onClick={() => removeLogicPath(questionIndex, stepIndex)}
            className="h-4 w-4 cursor-pointer text-red-800"
          />
          // <Button
          //   //   variant={ButtonVariant.DANGER}
          //   className="aspect-square w-[10px]"
          //   icon={<TrashIcon className="h-3.5 w-3.5" />}
          // />
        )}
      </div>
    </>
  );
}
