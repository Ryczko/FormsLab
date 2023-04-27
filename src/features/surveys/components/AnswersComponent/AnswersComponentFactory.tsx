import ButtonsAnswersComponent from 'features/surveys/components/AnswersComponent/ButtonsAnswersComponent';
import ListAnswersComponent from 'features/surveys/components/AnswersComponent/ListAnswersComponent';

export enum AnswerType {
  BUTTONS = 'buttons',
  LIST = 'list',
}

interface AnswersComponentFactoryProps {
  type: AnswerType;
  icons: string[];
  selectedIcon: string;
  handleIconClick: (icon: string) => void;
  showEmojiError: boolean;
  answer: string;
  handleInputAnswer: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
export const AnswersComponentFactory = (
  props: AnswersComponentFactoryProps
) => {
  const { type } = props;

  switch (type) {
    case AnswerType.BUTTONS:
      return <ButtonsAnswersComponent {...props} />;
    case AnswerType.LIST:
      return <ListAnswersComponent {...props} />;
    default:
      return null;
  }
};
