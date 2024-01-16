import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import EmojiButton from 'features/surveys/features/SurveyDisplay/components/AnswersComponent/EmojiButton/EmojiButton';

interface ButtonAnswersComponentProps {
  icons: string[];
  selectedIcon: string;
  handleIconClick: (icon: string) => void;
  showEmojiError: boolean;
  answer: string;
  handleInputAnswer: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function ButtonsAnswersComponent({
  icons,
  answer,
  handleIconClick,
  handleInputAnswer,
  selectedIcon,
  showEmojiError,
}: ButtonAnswersComponentProps) {
  const { t } = useTranslation('survey');
  return (
    <>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {icons.map((icon) => (
          <EmojiButton
            icon={icon}
            selected={selectedIcon === icon}
            key={icon}
            onClick={handleIconClick}
          />
        ))}
      </div>
      {showEmojiError && (
        <div className="mt-2 text-red-500">{t('requiredField')}</div>
      )}
    </>
  );
}
