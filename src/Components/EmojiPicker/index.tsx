import Picker from 'emoji-picker-react';
import { useRef, useState } from 'react';
import { useCloseComponent } from '../../Hooks/useCloseComponent';
import Emoji from '../Emoji/Emoji';

interface EmojiPickerProps {
  index: number;
  defaultEmote?: string;
  onEmotePick: (idx, newValue) => void;
}

function EmojiPicker({ defaultEmote, index, onEmotePick }: EmojiPickerProps) {
  const [chosenEmoji, setChosenEmoji] = useState<any>(null);
  const [displayPicker, setDisplayPicker] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useCloseComponent(wrapperRef, () => setDisplayPicker(false));

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    onEmotePick(index, emojiObject.emoji as string);
    setDisplayPicker(!displayPicker);
  };
  return (
    <div className="relative" ref={wrapperRef}>
      <button
        className="label-text w-16 text-3xl bg-white p-3 rounded-lg shadow transition hover:scale-95"
        onClick={() => setDisplayPicker(!displayPicker)}
      >
        <Emoji symbol={chosenEmoji?.emoji || defaultEmote} />
      </button>
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
            position: 'absolute',
            top: '105%',
            zIndex: '1',
          }}
        />
      )}
    </div>
  );
}

export default EmojiPicker;
