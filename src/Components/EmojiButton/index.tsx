import React from 'react';

interface EmojiButtonProps {
    icon: string;
    selected?: boolean;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function EmojiButton({ icon, onClick, selected = false }: EmojiButtonProps & React.HTMLProps<HTMLButtonElement>) {
  return (
    <button
      className={`bg-white text-3xl p-3 border-4 border-transparent rounded-lg duration-100 m-2 shadow ${
        selected ? 'scale-90 border-slate-300' : ''
      }`}
      onClick={onClick}
    >
      {icon}
    </button>
  );
}

export default EmojiButton;
