import React from 'react';
import Button from 'shared/components/Button/Button';
import StyledDialog from 'shared/components/StyledDialog/StyledDialog';
import { Question } from 'features/surveys/managers/createSurveyManager';
import { QuestionType } from '@prisma/client';

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
      type: QuestionType.EMOJI,
      title: '',
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
      type: QuestionType.INPUT,
      title: '',
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
