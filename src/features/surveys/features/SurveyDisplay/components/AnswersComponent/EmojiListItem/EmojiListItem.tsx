import clsx from 'clsx';
import Emoji from 'features/surveys/components/Emoji/Emoji';

interface EmojiListItemProps {
  icon: string;
  selected?: boolean;
  isAnySelected?: boolean;
  onClick?: (icon: string) => void;
}

function EmojiListItem({
  icon,
  onClick = () => undefined,
  isAnySelected,
  selected = false,
}: EmojiListItemProps) {
  return (
    <button
      type="button"
      className={clsx(
        'flex w-[56px] justify-center rounded-lg duration-200 hover:scale-125',
        isAnySelected ? 'grayscale' : '',
        selected ? 'scale-125 grayscale-0' : ''
      )}
      onClick={() => onClick(icon)}
    >
      <Emoji shortcodes={icon} />
    </button>
  );
}

export default EmojiListItem;
