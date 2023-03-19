import dynamic from 'next/dynamic';
import { EMOJI_STYLE } from 'src/shared/constants/emojisConfig';

import { Emoji as StaticLibEmoji } from 'emoji-picker-react';

const LibEmoji = dynamic<React.ComponentProps<typeof StaticLibEmoji>>(
  () => import('emoji-picker-react').then((mod) => mod.Emoji),
  {
    ssr: false,
  }
);

interface EmojiProps {
  unified: string;
  size?: number;
}

export default function Emoji({ unified, size = 32 }: EmojiProps) {
  return <LibEmoji unified={unified} emojiStyle={EMOJI_STYLE} size={size} />;
}
