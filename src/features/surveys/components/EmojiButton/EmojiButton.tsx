import Emoji from '../Emoji/Emoji';

interface EmojiButtonProps {
  icon: string;
  selected?: boolean;
  onClick: (icon: string) => void;
}

function EmojiButton({ icon, onClick, selected = false }: EmojiButtonProps) {
  return (
    <button
      className={`rounded-lg border-4 border-transparent bg-white p-3 flex justify-center items-center shadow  duration-100 ${
        selected ? 'scale-90 border-slate-300' : ''
      }`}
      onClick={() => onClick(icon)}
    >
      <Emoji unified={icon} />
    </button>
  );
}

export default EmojiButton;
