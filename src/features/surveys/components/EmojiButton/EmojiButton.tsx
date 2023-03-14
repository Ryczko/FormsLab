import React from 'react';
import Emoji from '../Emoji/Emoji';

interface EmojiButtonProps {
  icon: string;
  selected?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function EmojiButton({
  icon,
  onClick,
  selected = false,
}: EmojiButtonProps & React.HTMLProps<HTMLButtonElement>) {
  return (
    <button
      className={`rounded-lg border-4 border-transparent bg-white p-3 text-3xl shadow  duration-100 ${
        selected ? 'scale-90 border-slate-300' : ''
      }`}
      onClick={onClick}
    >
      <Emoji symbol={icon} />
    </button>
  );
}

export default EmojiButton;
