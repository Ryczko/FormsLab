import { useRef, useState } from 'react';
import { useCloseComponent } from '../../hooks/useCloseComponent';
import Emoji from '../Emoji';

import dynamic from 'next/dynamic';
const Picker = dynamic(() => import('emoji-picker-react'), {
  ssr: false,
});

interface EmojiPickerProps {
  index: number;
  defaultEmote?: string;
  onEmotePick: (idx: number, newValue: number | string) => void;
}

function EmojiPicker({ defaultEmote, index, onEmotePick }: EmojiPickerProps) {
  const [chosenEmoji, setChosenEmoji] = useState<any>(null);
  const [displayPicker, setDisplayPicker] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useCloseComponent(wrapperRef, () => setDisplayPicker(false));

  const onEmojiClick = (_event: unknown, emojiObject: { emoji: string; }) => {
    setChosenEmoji(emojiObject);
    onEmotePick(index, emojiObject.emoji as string);
    setDisplayPicker(!displayPicker);
  };
  return (
    <div ref={wrapperRef}>
      <button
        className="p-3 w-16 text-3xl bg-white rounded-lg shadow transition hover:scale-95 label-text"
        onClick={() => setDisplayPicker(!displayPicker)}
      >
        <Emoji symbol={chosenEmoji?.emoji || defaultEmote} />
      </button>

      {displayPicker && (
        <div
          onClick={() => setDisplayPicker(false)}
          className="fixed top-0 left-0 z-10 w-full h-full bg-black opacity-60"
        />
      )}
      {displayPicker && (
        <Picker
          native
          onEmojiClick={onEmojiClick}
          disableAutoFocus
          disableSearchBar
          disableSkinTonePicker
          groupVisibility={{
            flags: false,
            symbols: false,
          }}
          pickerStyle={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: '99',
            boxShadow: 'none',
            maxWidth: '90%',
            width: '400px',
            height: '400px',
          }}
        />
      )}
    </div>
  );
}

export default EmojiPicker;
