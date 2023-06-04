import { PlusCircleIcon } from '@heroicons/react/outline';
import Button, {
  ButtonSize,
  ButtonVariant,
} from 'shared/components/Button/Button';
import NewQuestionModal from 'features/surveys/components/NewQuestionModal/NewQuestionModal';
import useModal from 'features/surveys/hooks/useModal';
import { Question } from 'features/surveys/managers/createSurveyManager';
import useTranslation from 'next-translate/useTranslation';

interface AddQuestionButtonProps {
  onClick: (newQuestion: Question) => void;
}

export const AddQuestionButton = ({ onClick }: AddQuestionButtonProps) => {
  const { closeModal, isModalOpen, openModal } = useModal();
  const { t } = useTranslation('surveyCreate');
  return (
    <>
      <Button
        onClick={openModal}
        variant={ButtonVariant.OUTLINE}
        sizeType={ButtonSize.FULL}
        icon={<PlusCircleIcon className="h-5 w-5" />}
      >
        {t('addQuestion')}
      </Button>

      <NewQuestionModal
        onSuccess={onClick}
        closeModal={closeModal}
        isOpened={isModalOpen}
      />
    </>
  );
};
