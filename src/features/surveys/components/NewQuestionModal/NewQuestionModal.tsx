import React from 'react';
import StyledDialog from 'shared/components/StyledDialog/StyledDialog';
import { Question } from 'features/surveys/managers/createSurveyManager';
import { QuestionType } from '@prisma/client';
import { v4 } from 'uuid';
import NewQuestionModalButton from 'features/surveys/components/NewQuestionModal/components/NewQuestionModalButton';
import EmojiIcon from 'shared/components/QuestionTypeIcons/EmojiIcon';
import InputIcon from 'shared/components/QuestionTypeIcons/InputIcon';
import ChoiceIcon from 'shared/components/QuestionTypeIcons/ChoiceIcon';
import RateIcon from 'shared/components/QuestionTypeIcons/RateIcon';

type NewQuestionModalProps = {
  isOpened: boolean;
  closeModal: () => void;
  onSuccess?: (newQuestion: Question) => void;
};

export default function NewQuestionModal({
  isOpened,
  closeModal,
  onSuccess,
}: NewQuestionModalProps) {
  const addEmojiQuestion = () => {
    closeModal();
    onSuccess?.({
      id: v4(),
      type: QuestionType.EMOJI,
      title: '',
      isRequired: true,
      options: [
        ':smiley:',
        ':slightly_smiling_face:',
        ':slightly_frowning_face:',
        ':rage:',
      ],
      expanded: true,
    });
  };

  const addInputQuestion = () => {
    closeModal();
    onSuccess?.({
      id: v4(),
      type: QuestionType.INPUT,
      title: '',
      isRequired: true,
      expanded: true,
    });
  };

  const addChoiceQuestion = () => {
    closeModal();
    onSuccess?.({
      id: v4(),
      type: QuestionType.CHOICE,
      title: '',
      isRequired: true,
      options: ['', '', ''],
      expanded: true,
    });
  };

  const addRateQuestion = () => {
    closeModal();
    onSuccess?.({
      id: v4(),
      type: QuestionType.RATE,
      title: '',
      isRequired: true,
      expanded: true,
    });
  };

  return (
    <StyledDialog
      isOpen={isOpened}
      onClose={closeModal}
      title={'Choose question type'}
      content={
        <div className="mt-6 flex flex-col gap-2 sm:mt-4 sm:flex-row">
          <NewQuestionModalButton
            onClick={addEmojiQuestion}
            icon={<EmojiIcon />}
            text="Emoji"
          />
          <NewQuestionModalButton
            onClick={addInputQuestion}
            icon={<InputIcon />}
            text="Text"
          />
          <NewQuestionModalButton
            onClick={addChoiceQuestion}
            icon={<ChoiceIcon />}
            text="Choice"
          />
          <NewQuestionModalButton
            onClick={addRateQuestion}
            icon={<RateIcon />}
            text="Rate"
          />
        </div>
      }
    />
  );
}
