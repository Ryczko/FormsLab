import { PlusCircleIcon } from '@heroicons/react/outline';
import Button, {
  ButtonSize,
  ButtonVariant,
} from 'shared/components/Button/Button';
import NewQuestionModal from 'features/surveys/features/SurveyCreator/components/NewQuestionModal/NewQuestionModal';
import useModal from 'features/surveys/hooks/useModal';
import { Question } from 'features/surveys/features/SurveyCreator/managers/createSurveyManager/createSurveyManager';

interface AddQuestionButtonProps {
  onClick: (newQuestion: Question) => void;
}

export const AddQuestionButton = ({ onClick }: AddQuestionButtonProps) => {
  const { closeModal, isModalOpen, openModal } = useModal();
  return (
    <div className="mb-2">
      <Button
        onClick={openModal}
        variant={ButtonVariant.OUTLINE}
        sizeType={ButtonSize.FULL}
        icon={<PlusCircleIcon className="h-5 w-5" />}
      >
        Add Question
      </Button>

      <NewQuestionModal
        onSuccess={onClick}
        closeModal={closeModal}
        isOpened={isModalOpen}
      />
    </div>
  );
};
