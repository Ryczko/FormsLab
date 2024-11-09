import React from 'react';
import StyledDialog from 'shared/components/StyledDialog/StyledDialog';
import { DraftQuestion } from 'features/surveys/features/SurveyCreator/managers/createSurveyManager/createSurveyManager';
import { QuestionType } from '@prisma/client';
import { v4 } from 'uuid';
import NewQuestionModalButton from 'features/surveys/features/SurveyCreator/components/NewQuestionModal/components/NewQuestionModalButton';
import EmojiIcon from 'shared/components/QuestionTypeIcons/EmojiIcon';
import InputIcon from 'shared/components/QuestionTypeIcons/InputIcon';
import ChoiceIcon from 'shared/components/QuestionTypeIcons/ChoiceIcon';
import RateIcon from 'shared/components/QuestionTypeIcons/RateIcon';

type NewQuestionModalProps = {
  isOpened: boolean;
  closeModal: () => void;
  onSuccess?: (newQuestion: DraftQuestion) => void;
};

export default function NewQuestionModal({
  isOpened,
  closeModal,
  onSuccess,
}: NewQuestionModalProps) {
  const addEmojiQuestion = () => {
    closeModal();
    onSuccess?.({
      draftId: v4(),
      type: QuestionType.EMOJI,
      title: 'How are you feeling today?',
      isRequired: true,
      options: [
        ':rage:',
        ':slightly_frowning_face:',
        ':slightly_smiling_face:',
        ':smiley:',
      ],
      expanded: true,
      advancedSettingsExpanded: false,
    });
  };

  const addInputQuestion = () => {
    closeModal();
    onSuccess?.({
      draftId: v4(),
      type: QuestionType.INPUT,
      title: 'Tell us more',
      isRequired: true,
      expanded: true,
      advancedSettingsExpanded: false,
    });
  };

  const addChoiceQuestion = () => {
    closeModal();
    onSuccess?.({
      draftId: v4(),
      type: QuestionType.CHOICE,
      title: 'What came first?',
      isRequired: true,
      options: ['Chicken 🐔', 'Egg 🥚'],
      expanded: true,
      advancedSettingsExpanded: false,
    });
  };

  const addRateQuestion = () => {
    closeModal();
    onSuccess?.({
      draftId: v4(),
      type: QuestionType.RATE,
      title: 'How do you rate the process?',
      isRequired: true,
      expanded: true,
      advancedSettingsExpanded: false,
    });
  };

  return (
    <StyledDialog
      isOpen={isOpened}
      onClose={closeModal}
      title={'Choose block type'}
      content={
        <div className="mt-6 flex flex-col gap-2 sm:mt-4 sm:flex-row">
          <NewQuestionModalButton
            onClick={addEmojiQuestion}
            icon={<EmojiIcon />}
            text="Emoji"
            testSelector="emoji-question-button"
          />
          <NewQuestionModalButton
            onClick={addInputQuestion}
            icon={<InputIcon />}
            text="Text"
            testSelector="input-question-button"
          />
          <NewQuestionModalButton
            onClick={addChoiceQuestion}
            icon={<ChoiceIcon />}
            text="Choice"
            test-selector="choice-question-button"
          />
          <NewQuestionModalButton
            onClick={addRateQuestion}
            icon={<RateIcon />}
            text="Rate"
            test-selector="rate-question-button"
          />
        </div>
      }
    />
  );
}
