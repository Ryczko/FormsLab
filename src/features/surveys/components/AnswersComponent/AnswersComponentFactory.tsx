import { QuestionType } from '@prisma/client';
import ListAnswersComponent from 'features/surveys/components/AnswersComponent/ListAnswersComponent';
import TextAnswersComponent from 'features/surveys/components/AnswersComponent/TextAnswersComponent';

interface AnswersComponentFactoryProps {
  type: QuestionType;
  options: string[];
  handleAnswerChange: (answer: string, questionId: string) => void;
  answer?: string;
  questionId: string;
  question: string;
  isSubmitted: boolean;
}
export const AnswersComponentFactory = (
  props: AnswersComponentFactoryProps
) => {
  const { type } = props;

  return (
    <div className="mb-3 rounded-md border bg-white/50 px-6 py-4 shadow">
      <h2 className="mb-5 text-lg font-semibold">{props.question}</h2>
      {type === QuestionType.EMOJI && <ListAnswersComponent {...props} />}
      {type === QuestionType.INPUT && <TextAnswersComponent {...props} />}
    </div>
  );
};
