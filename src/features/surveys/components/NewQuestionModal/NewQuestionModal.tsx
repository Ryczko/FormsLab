import React from 'react';
import Button from 'shared/components/Button/Button';
import StyledDialog from 'shared/components/StyledDialog/StyledDialog';
import { Question } from 'features/surveys/managers/createSurveyManager';
import { QuestionType } from '@prisma/client';
import { v4 } from 'uuid';

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

  return (
    <StyledDialog
      centerTitle
      isOpen={isOpened}
      onClose={closeModal}
      title={'Choose question type'}
      content={
        <div className="mt-6 flex gap-2">
          <Button onClick={addEmojiQuestion} className="w-[120px] p-6">
            Emoji
          </Button>

          <Button onClick={addInputQuestion} className="w-[120px] p-6">
            Text
          </Button>
        </div>
      }
    />
  );
}
