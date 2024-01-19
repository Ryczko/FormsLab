import { QuestionType } from '@prisma/client';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import ChoiceQuestionBlock from 'features/surveys/features/SurveyCreator/components/QuestionBlocks/ChoiceQuestionBlock/ChoiceQuestionBlock';
import EmojiQuestionBlock from 'features/surveys/features/SurveyCreator/components/QuestionBlocks/EmojiQuestionBlock/EmojiQuestionBlock';
import InputQuestionBlock from 'features/surveys/features/SurveyCreator/components/QuestionBlocks/InputQuestionBlock/InputQuestionBlock';
import QuestionBlockWrapper from 'features/surveys/features/SurveyCreator/components/QuestionBlocks/QuestionBlockWrapper/QuestionBlockWrapper';
import RateQuestionBlock from 'features/surveys/features/SurveyCreator/components/QuestionBlocks/RateQuestionBlock/RateQuestionBlock';
import { Question } from 'features/surveys/features/SurveyCreator/managers/createSurveyManager/createSurveyManager';

interface QuestionBlockFactoryProps {
  questionData: Question;
  questionIndex: number;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}

export default function QuestionBlockFactory({
  questionIndex,
  dragHandleProps,
  questionData,
}: QuestionBlockFactoryProps) {
  return (
    <QuestionBlockWrapper
      dragHandleProps={dragHandleProps}
      index={questionIndex}
      questionData={questionData}
    >
      {questionData.type === QuestionType.RATE && <RateQuestionBlock />}
      {questionData.type === QuestionType.INPUT && <InputQuestionBlock />}
      {questionData.type === QuestionType.CHOICE && (
        <ChoiceQuestionBlock
          options={questionData.options ?? []}
          questionIndex={questionIndex}
        />
      )}
      {questionData.type === QuestionType.EMOJI && (
        <EmojiQuestionBlock
          pack={questionData.options ?? []}
          questionIndex={questionIndex}
        />
      )}
    </QuestionBlockWrapper>
  );
}
