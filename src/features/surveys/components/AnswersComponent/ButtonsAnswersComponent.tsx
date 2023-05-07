import React from 'react';
import EmojiButton from 'features/surveys/components/AnswersComponent/EmojiButton/EmojiButton';
import useTranslation from 'next-translate/useTranslation';

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
  const { t } = useTranslation('surveyComponents');
  return (
    <>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {icons.map((icon, idx) => (
          <EmojiButton
            icon={icon}
            selected={selectedIcon === icon}
            key={idx}
            onClick={handleIconClick}
          />
        ))}
      </div>
      {showEmojiError && (
        <div className="mt-2 text-red-500">{t('choseEmojiBeforeSend')}</div>
      )}
      <div className="mt-8">
        <textarea
          className="h-52 w-full resize-none rounded-lg p-4 shadow focus:outline-none"
          placeholder={t('sendFeedbackTellUsMore')}
          value={answer}
          onChange={handleInputAnswer}
        ></textarea>
      </div>
    </>
  );
}
