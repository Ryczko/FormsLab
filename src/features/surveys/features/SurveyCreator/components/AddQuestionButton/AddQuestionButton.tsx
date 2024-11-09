import { PlusCircleIcon } from '@heroicons/react/outline';
import Button, { ButtonSize } from 'shared/components/Button/Button';
import NewQuestionModal from 'features/surveys/features/SurveyCreator/components/NewQuestionModal/NewQuestionModal';
import useModal from 'features/surveys/hooks/useModal';
import { DraftQuestion } from 'features/surveys/features/SurveyCreator/managers/createSurveyManager/createSurveyManager';

interface AddQuestionButtonProps {
  onClick: (newQuestion: DraftQuestion) => void;
}

export const AddQuestionButton = ({ onClick }: AddQuestionButtonProps) => {
  const { closeModal, isModalOpen, openModal } = useModal();
  return (
    <div className="mb-2 rounded-md shadow-sm">
      <Button
        onClick={openModal}
        sizeType={ButtonSize.FULL}
        className="h-[50px]"
        data-test-id="add-question-button"
        icon={<PlusCircleIcon className="h-5  w-5" />}
      >
        Add new block
      </Button>

      <NewQuestionModal
        onSuccess={onClick}
        closeModal={closeModal}
        isOpened={isModalOpen}
      />
    </div>
  );
};
