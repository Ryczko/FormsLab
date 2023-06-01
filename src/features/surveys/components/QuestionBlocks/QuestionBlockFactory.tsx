import { QuestionType } from '@prisma/client';
import EmojiQuestionBlock from 'features/surveys/components/QuestionBlocks/EmojiQuestionBlock/EmojiQuestionBlock';
import QuestionBlockWrapper from 'features/surveys/components/QuestionBlocks/QuestionBlockWrapper/QuestionBlockWrapper';

interface QuestionBlockFactoryProps {
  type: QuestionType;
  pack: string[];
  handleEmotePick: (
    index: number,
    newEmote: string,
    questionIndex: number
  ) => void;
  handleEmoteRemove: (index: number, questionIndex: number) => void;
  handleAddingNewEmote: (newEmote: string, questionIndex: number) => void;
  onQuestionRemove: (index: number) => void;
  questionIndex: number;
  updateQuestion: (newQuestion: string, questionIndex: number) => void;
  questionTitle: string;
  isSubmitted: boolean;
  isRemovingPossible: boolean;
}

export default function QuestionBlockFactory({
  handleEmotePick,
  handleEmoteRemove,
  handleAddingNewEmote,
  questionIndex,
  questionTitle,
  onQuestionRemove,
  type,
  updateQuestion,
  pack,
  isSubmitted,
  isRemovingPossible,
}: QuestionBlockFactoryProps) {
  return (
    <QuestionBlockWrapper
      index={questionIndex}
      onQuestionRemove={onQuestionRemove}
      updateQuestion={updateQuestion}
      questionTitle={questionTitle}
      isSubmitted={isSubmitted}
      isRemovingPossible={isRemovingPossible}
    >
      {type === QuestionType.INPUT && null}
      {type === QuestionType.EMOJI && (
        <EmojiQuestionBlock
          handleAddingNewEmote={handleAddingNewEmote}
          handleEmotePick={handleEmotePick}
          pack={pack}
          handleEmoteRemove={handleEmoteRemove}
          questionIndex={questionIndex}
        />
      )}
    </QuestionBlockWrapper>
  );
}
