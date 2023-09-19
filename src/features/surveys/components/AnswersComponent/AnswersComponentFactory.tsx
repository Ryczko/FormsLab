import { QuestionType } from '@prisma/client';
import ListAnswersComponent from 'features/surveys/components/AnswersComponent/ListAnswersComponent';
import TextAnswersComponent from 'features/surveys/components/AnswersComponent/TextAnswersComponent';
import ChoiceComponent from 'features/surveys/components/AnswersComponent/ChoiceComponent/ChoiceComponent';
import Button, {
  ButtonSize,
  ButtonVariant,
} from 'shared/components/Button/Button';
import useTranslation from 'next-translate/useTranslation';
import RateAnswersComponent from 'features/surveys/components/AnswersComponent/RateComponent/RateComponent';

interface AnswersComponentFactoryProps {
  type: QuestionType;
  options: string[];
  handleAnswerChange: (answer: string, questionId: string) => void;
  answer?: string;
  questionId: string;
  question: string;
  isSubmitted: boolean;
  isRequired: boolean;
  goToNextQuestion?: () => void;
  handlePreviousQuestion?: () => void;
  activeQuestionIndex?: number;
  isLastQuestion?: boolean;
  isAnswering?: boolean;
}
export const AnswersComponentFactory = (
  props: AnswersComponentFactoryProps
) => {
  const { t } = useTranslation('survey');

  const { type } = props;

  const isBackButtonVisible =
    !!props.handlePreviousQuestion &&
    !!props.activeQuestionIndex &&
    props.activeQuestionIndex > 0;

  const isNextButtonVisible = !!props.goToNextQuestion;

  return (
    <div className="mb-3 rounded-md border bg-white/50 px-6 py-4 shadow">
      <h2 className="mb-4 text-lg font-semibold">{props.question}</h2>
      {type === QuestionType.EMOJI && <ListAnswersComponent {...props} />}
      {type === QuestionType.INPUT && <TextAnswersComponent {...props} />}
      {type === QuestionType.CHOICE && <ChoiceComponent {...props} />}
      {type === QuestionType.RATE && <RateAnswersComponent {...props} />}

      {(isNextButtonVisible || isBackButtonVisible) && (
        <div className="mt-6 flex flex-col gap-x-4 gap-y-2 sm:flex-row">
          {isBackButtonVisible && (
            <Button
              variant={ButtonVariant.OUTLINE}
              sizeType={ButtonSize.FULL}
              onClick={props.handlePreviousQuestion}
              disabled={props.isAnswering}
            >
              {t('back')}
            </Button>
          )}

          {isNextButtonVisible && (
            <Button
              variant={ButtonVariant.PRIMARY}
              sizeType={ButtonSize.FULL}
              onClick={props.goToNextQuestion}
              isLoading={props.isAnswering}
            >
              {props.isLastQuestion ? t('finish') : t('next')}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
