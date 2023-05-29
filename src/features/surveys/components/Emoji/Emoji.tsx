import { EMOJI_STYLE } from 'shared/constants/emojisConfig';

interface EmojiProps {
  shortcodes: string;
  size?: number;
}

export default function Emoji({ shortcodes, size = 32 }: EmojiProps) {
  return (
    <em-emoji size={`${size}px`} shortcodes={shortcodes} set={EMOJI_STYLE} />
  );
}
