import { QuestionType } from '@prisma/client';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import ChoiceQuestionBlock from 'features/surveys/features/SurveyCreator/components/QuestionBlocks/ChoiceQuestionBlock/ChoiceQuestionBlock';
import EmojiQuestionBlock from 'features/surveys/features/SurveyCreator/components/QuestionBlocks/EmojiQuestionBlock/EmojiQuestionBlock';
import InputQuestionBlock from 'features/surveys/features/SurveyCreator/components/QuestionBlocks/InputQuestionBlock/InputQuestionBlock';
import QuestionBlockWrapper from 'features/surveys/features/SurveyCreator/components/QuestionBlocks/QuestionBlockWrapper/QuestionBlockWrapper';
import RateQuestionBlock from 'features/surveys/features/SurveyCreator/components/QuestionBlocks/RateQuestionBlock/RateQuestionBlock';
import { DraftQuestion } from 'features/surveys/features/SurveyCreator/managers/createSurveyManager/createSurveyManager';
import RateAdvancedSettings from 'features/surveys/features/SurveyCreator/components/QuestionBlocks/AdvancedSettings/RateAdvancedSettings';
import ChoiceAdvancedSettings from 'features/surveys/features/SurveyCreator/components/QuestionBlocks/AdvancedSettings/ChoiceAdvancedSettings';
import EmojiAdvancedSettings from 'features/surveys/features/SurveyCreator/components/QuestionBlocks/AdvancedSettings/EmojiAdvancedSettings';
import InputAdvancedSettings from 'features/surveys/features/SurveyCreator/components/QuestionBlocks/AdvancedSettings/InputAdvancedSettings';

interface QuestionBlockFactoryProps {
  questionData: DraftQuestion;
  questionIndex: number;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}

export default function QuestionBlockFactory({
  questionIndex,
  dragHandleProps,
  questionData,
}: QuestionBlockFactoryProps) {
  const getAdvancedSettings = () => {
    if (questionData.type === QuestionType.EMOJI) {
      return (
        <EmojiAdvancedSettings
          questionData={questionData}
          questionIndex={questionIndex}
        />
      );
    }

    if (questionData.type === QuestionType.RATE) {
      return (
        <RateAdvancedSettings
          questionData={questionData}
          questionIndex={questionIndex}
        />
      );
    }

    if (questionData.type === QuestionType.CHOICE) {
      return (
        <ChoiceAdvancedSettings
          questionData={questionData}
          questionIndex={questionIndex}
        />
      );
    }

    if (questionData.type === QuestionType.INPUT) {
      return (
        <InputAdvancedSettings
          questionData={questionData}
          questionIndex={questionIndex}
        />
      );
    }

    return null;
  };

  return (
    <QuestionBlockWrapper
      dragHandleProps={dragHandleProps}
      index={questionIndex}
      questionData={questionData}
      advancedSettings={getAdvancedSettings()}
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
