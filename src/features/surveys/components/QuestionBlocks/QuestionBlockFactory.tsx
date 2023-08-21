import { QuestionType } from '@prisma/client';
import EmojiQuestionBlock from 'features/surveys/components/QuestionBlocks/EmojiQuestionBlock/EmojiQuestionBlock';
import QuestionBlockWrapper from 'features/surveys/components/QuestionBlocks/QuestionBlockWrapper/QuestionBlockWrapper';
import InputQuestionBlock from 'features/surveys/components/QuestionBlocks/InputQuestionBlock/InputQuestionBlock';
import ChoiceQuestionBlock from 'features/surveys/components/QuestionBlocks/ChoiceQuestionBlock/ChoiceQuestionBlock';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';

interface QuestionBlockFactoryProps {
  type: QuestionType;
  options: string[];
  handleOptionChange: (
    index: number,
    newEmote: string,
    questionIndex: number,
    blockDuplicates?: boolean
  ) => void;
  handleOptionRemove: (index: number, questionIndex: number) => void;
  handleAddingNewOption: (
    newEmote: string,
    questionIndex: number,
    blockDuplicates?: boolean
  ) => void;
  onQuestionRemove: (index: number) => void;
  questionIndex: number;
  updateQuestion: (newQuestion: string, questionIndex: number) => void;
  questionTitle: string;
  isSubmitted: boolean;
  isRemovingPossible: boolean;
  isDraggingPossible: boolean;
  updateQuestionRequired: (questionIndex: number) => void;
  isRequired: boolean;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
  expanded: boolean;
  expandQuestion: (questionIndex: number) => void;
}

export default function QuestionBlockFactory({
  handleOptionChange,
  handleOptionRemove,
  handleAddingNewOption,
  questionIndex,
  questionTitle,
  onQuestionRemove,
  type,
  updateQuestion,
  options,
  isSubmitted,
  isRemovingPossible,
  isRequired,
  updateQuestionRequired,
  isDraggingPossible,
  dragHandleProps,
  expanded,
  expandQuestion,
}: QuestionBlockFactoryProps) {
  return (
    <QuestionBlockWrapper
      dragHandleProps={dragHandleProps}
      index={questionIndex}
      onQuestionRemove={onQuestionRemove}
      updateQuestion={updateQuestion}
      questionTitle={questionTitle}
      isSubmitted={isSubmitted}
      isRemovingPossible={isRemovingPossible}
      isDraggingPossible={isDraggingPossible}
      isRequired={isRequired}
      updateQuestionRequired={updateQuestionRequired}
      expanded={expanded}
      expandQuestion={expandQuestion}
    >
      {type === QuestionType.INPUT && <InputQuestionBlock />}
      {type === QuestionType.CHOICE && (
        <ChoiceQuestionBlock
          handleAddingNewOption={handleAddingNewOption}
          handleOptionChange={handleOptionChange}
          handleOptionRemove={handleOptionRemove}
          options={options}
          questionIndex={questionIndex}
          isSubmitted={isSubmitted}
        />
      )}
      {type === QuestionType.EMOJI && (
        <EmojiQuestionBlock
          handleAddingNewEmote={handleAddingNewOption}
          handleEmotePick={handleOptionChange}
          pack={options}
          handleEmoteRemove={handleOptionRemove}
          questionIndex={questionIndex}
        />
      )}
    </QuestionBlockWrapper>
  );
}
