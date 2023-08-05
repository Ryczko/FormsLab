import { PlusIcon, TrashIcon } from '@heroicons/react/outline';
import Button, { ButtonVariant } from 'shared/components/Button/Button';
import Input from 'shared/components/Input/Input';
import { MAX_OPTIONS, MIN_OPTIONS } from 'shared/constants/surveysConfig';
import useTranslation from 'next-translate/useTranslation';

interface ChoiceQuestionBlockProps {
  options: string[];
  handleOptionChange: (
    index: number,
    newOption: string,
    questionIndex: number,
    blockDuplicates?: boolean
  ) => void;
  handleOptionRemove: (index: number, questionIndex: number) => void;
  handleAddingNewOption: (
    newOption: string,
    questionIndex: number,
    blockDuplicates?: boolean
  ) => void;
  questionIndex: number;
  isSubmitted: boolean;
}

export default function ChoiceQuestionBlock({
  options,
  handleAddingNewOption,
  handleOptionChange,
  handleOptionRemove,
  questionIndex,
  isSubmitted,
}: ChoiceQuestionBlockProps) {
  const { t } = useTranslation('surveyCreate');

  const getAnswerError = (option: string) => {
    if (isSubmitted && option.length === 0) {
      return t('required');
    }

    return undefined;
  };

  return (
    <div className="mt-2">
      {options.map((option, index) => (
        <div className="flex w-full" key={index}>
          <div className="mr-4 block flex-grow">
            <Input
              type="text"
              value={option}
              placeholder="Answer..."
              error={getAnswerError(option)}
              onChange={(e) =>
                handleOptionChange(
                  index,
                  (e.target as HTMLInputElement).value,
                  questionIndex
                )
              }
            />
          </div>
          {options.length > MIN_OPTIONS && (
            <Button
              className="mt-[8px] h-[44px] w-[60px]"
              variant={ButtonVariant.DANGER}
              icon={<TrashIcon className="h-4 w-4" />}
              onClick={() => handleOptionRemove(index, questionIndex)}
            />
          )}
        </div>
      ))}
      {options.length < MAX_OPTIONS && (
        <div className="mt-2">
          <Button
            className="ml-auto"
            onClick={() => handleAddingNewOption('', questionIndex)}
          >
            Add New Option <PlusIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
