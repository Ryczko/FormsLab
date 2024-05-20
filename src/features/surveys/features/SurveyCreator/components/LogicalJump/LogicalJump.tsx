import React from 'react';
import Button, { ButtonSize } from 'shared/components/Button/Button';
import Condition from 'features/surveys/features/SurveyCreator/components/LogicalJump/Condition';
import { TerminalIcon } from '@heroicons/react/outline';
import { QuestionMarkCircleIcon } from '@heroicons/react/solid';
import { Tooltip } from 'react-tooltip';
import { useSurveyCreatorContext } from 'features/surveys/features/SurveyCreator/managers/createSurveyManager/context';
import { MAX_LOGIC_PATHS } from 'shared/constants/surveysConfig';

export interface ConditionSelect {
  name: string;
  value: string;
}

export interface ConditionOptions {
  comparisons: ConditionSelect[];
  options: ConditionSelect[];
  jumpQuestions: ConditionSelect[];
}

interface LogicalJumpProps {
  questionIndex: number;
  conditions: ConditionOptions[];
}

export default function LogicalJump({
  conditions,
  questionIndex,
}: LogicalJumpProps) {
  const { addLogicPath, isEditMode } = useSurveyCreatorContext();

  return (
    <div>
      <h3 className="mb-2 flex items-center font-semibold">
        Logic path
        <QuestionMarkCircleIcon
          data-tooltip-id="logic-path-info"
          className="ml-1 h-4 w-4"
        />
        <Tooltip id={'logic-path-info'} place="right" positionStrategy="fixed">
          Set logic path to jump to a specific question based on the answer
        </Tooltip>
      </h3>
      {conditions.map((condition, index) => (
        <Condition
          conditionOptions={condition}
          key={index}
          questionIndex={questionIndex}
          stepIndex={index}
        />
      ))}
      {conditions.length > 0 && (
        <Condition elseCondition questionIndex={questionIndex} stepIndex={-1} />
      )}

      {conditions.length === 0 && (
        <div className="mt-3 flex gap-4">
          There are no logic paths set for this question
        </div>
      )}

      {!isEditMode && conditions.length < MAX_LOGIC_PATHS && (
        <Button
          onClick={() => addLogicPath(questionIndex)}
          className="mt-4"
          sizeType={ButtonSize.SMALL}
          icon={<TerminalIcon className="mr-1 h-5 w-5" />}
        >
          Add path
        </Button>
      )}
    </div>
  );
}
