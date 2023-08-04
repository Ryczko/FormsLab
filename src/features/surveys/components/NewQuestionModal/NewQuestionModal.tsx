import React from 'react';
import Button from 'shared/components/Button/Button';
import StyledDialog from 'shared/components/StyledDialog/StyledDialog';
import { Question } from 'features/surveys/managers/createSurveyManager';
import { QuestionType } from '@prisma/client';
import { v4 } from 'uuid';
import { EmojiHappyIcon } from '@heroicons/react/outline';

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
    });
  };

  const addInputQuestion = () => {
    closeModal();
    onSuccess?.({
      id: v4(),
      type: QuestionType.INPUT,
      title: '',
      isRequired: false,
    });
  };

  const addChoiceQuestion = () => {
    closeModal();
    onSuccess?.({
      id: v4(),
      type: QuestionType.CHOICE,
      title: '',
      isRequired: false,
      options: ['', '', ''],
    });
  };

  return (
    <StyledDialog
      centerTitle
      isOpen={isOpened}
      onClose={closeModal}
      title={'Choose question type'}
      content={
        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <Button onClick={addEmojiQuestion} className="p-6 sm:w-[120px]">
            Emoji
          </Button>

          <Button onClick={addInputQuestion} className="p-6 sm:w-[120px]">
            Text
          </Button>

          <Button onClick={addChoiceQuestion} className="p-6 sm:w-[120px]">
            Choice
          </Button>
        </div>
      }
    />
  );
}
