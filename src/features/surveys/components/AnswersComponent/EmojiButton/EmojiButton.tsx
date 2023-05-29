import Emoji from 'features/surveys/components/Emoji/Emoji';

interface EmojiButtonProps {
  icon: string;
  selected?: boolean;
  onClick: (icon: string) => void;
}

function EmojiButton({ icon, onClick, selected = false }: EmojiButtonProps) {
  return (
    <button
      type="button"
      className={`flex items-center justify-center rounded-lg border-4 border-transparent bg-white p-3 shadow  duration-100 ${
        selected ? 'scale-90 !border-slate-300' : ''
      }`}
      onClick={() => onClick(icon)}
    >
      <Emoji shortcodes={icon} />
    </button>
  );
}

export default EmojiButton;
