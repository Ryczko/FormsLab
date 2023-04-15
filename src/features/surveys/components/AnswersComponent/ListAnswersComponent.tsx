import React from 'react';
import EmojiListItem from 'features/surveys/components/AnswersComponent/EmojiListItem/EmojiListItem';

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
  return (
    <div className="rounded-xl border bg-white/50 py-4 px-6 shadow">
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
        <div className="mt-5 text-red-500">
          Please select an emoji before sending.
        </div>
      )}
      <div className="mt-6">
        <textarea
          className="h-40 w-full resize-none rounded-lg bg-zinc-100 p-4 shadow focus:outline-none"
          placeholder="Tell Us More"
          value={answer}
          onChange={handleInputAnswer}
        ></textarea>
      </div>
    </div>
  );
}
