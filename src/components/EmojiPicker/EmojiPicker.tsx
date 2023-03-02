import { useRef, useState } from 'react';
import { useCloseComponent } from '../../hooks/useCloseComponent';

import dynamic from 'next/dynamic';
import Emoji from '../Emoji/Emoji';
import Loader from '../Loader/Loader';
const Picker = dynamic(() => import('emoji-picker-react'), {
  ssr: false,
  loading: () => <Loader isLoading={true} />,
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

  const onEmojiClick = (_event: unknown, emojiObject: { emoji: string }) => {
    setChosenEmoji(emojiObject);
    onEmotePick(index, emojiObject.emoji as string);
    setDisplayPicker(!displayPicker);
  };
  return (
    <div ref={wrapperRef}>
      <button
        className="label-text w-16 rounded-lg bg-white p-3 text-3xl shadow transition hover:scale-95"
        onClick={() => setDisplayPicker(!displayPicker)}
      >
        <Emoji symbol={chosenEmoji?.emoji || defaultEmote} />
      </button>

      {displayPicker && (
        <div
          onClick={() => setDisplayPicker(false)}
          className="fixed top-0 left-0 z-10 h-full w-full bg-black opacity-60"
        />
      )}
      {displayPicker && (
        <div className="fixed top-1/2 left-1/2 z-20 flex h-[400px] max-h-[90%] w-[400px] max-w-[90%] -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-md bg-white">
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
              width: '400px',
              height: '400px',
            }}
          />
        </div>
      )}
    </div>
  );
}

export default EmojiPicker;
