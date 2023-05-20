import React from 'react';
import EmojiListItem from 'features/surveys/components/AnswersComponent/EmojiListItem/EmojiListItem';
import useTranslation from 'next-translate/useTranslation';

interface ListAnswersComponentProps {
  icons: string[];
  selectedIcon: string;
  handleIconClick: (icon: string) => void;
  showEmojiError: boolean;
  answer: string;
  handleInputAnswer: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function ListAnswersComponent({
  icons,
  answer,
  handleIconClick,
  handleInputAnswer,
  selectedIcon,
  showEmojiError,
}: ListAnswersComponentProps) {
  const { t } = useTranslation('survey');
  return (
    <div className="rounded-xl border bg-white/50 px-6 py-4 shadow">
      <div className="mt-2 flex flex-wrap justify-center gap-y-2">
        {icons.map((icon, idx) => (
          <EmojiListItem
            icon={icon}
            selected={selectedIcon === icon}
            isAnySelected={selectedIcon !== ''}
            key={idx}
            onClick={handleIconClick}
          />
        ))}
      </div>
      {showEmojiError && (
        <div className="mt-5 text-red-500">{t('choseEmojiBeforeSend')}</div>
      )}
      <div className="mt-6">
        <textarea
          className="h-40 w-full resize-none rounded-lg bg-zinc-100 p-4 shadow focus:outline-none"
          placeholder={t('sendFeedbackTellUsMore')}
          value={answer}
          onChange={handleInputAnswer}
        ></textarea>
      </div>
    </div>
  );
}
