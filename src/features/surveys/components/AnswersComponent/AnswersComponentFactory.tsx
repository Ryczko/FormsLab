import { QuestionType } from '@prisma/client';
import ListAnswersComponent from 'features/surveys/components/AnswersComponent/ListAnswersComponent';
import TextAnswersComponent from 'features/surveys/components/AnswersComponent/TextAnswersComponent';
import ChoiceComponent from 'features/surveys/components/AnswersComponent/ChoiceComponent/ChoiceComponent';

interface AnswersComponentFactoryProps {
  type: QuestionType;
  options: string[];
  handleAnswerChange: (answer: string, questionId: string) => void;
  answer?: string;
  questionId: string;
  question: string;
  isSubmitted: boolean;
  isRequired: boolean;
}
export const AnswersComponentFactory = (
  props: AnswersComponentFactoryProps
) => {
  const { type } = props;

  return (
    <div className="mb-3 rounded-md border bg-white/50 px-6 py-4 shadow">
      <h2 className="mb-4 text-lg font-semibold">{props.question}</h2>
      {type === QuestionType.EMOJI && <ListAnswersComponent {...props} />}
      {type === QuestionType.INPUT && <TextAnswersComponent {...props} />}
      {type === QuestionType.CHOICE && <ChoiceComponent {...props} />}
    </div>
  );
};
