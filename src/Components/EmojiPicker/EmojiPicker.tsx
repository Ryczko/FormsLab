import Picker from 'emoji-picker-react';
import { useRef, useState } from 'react';
import { useCloseComponent } from '../../Hooks/useCloseComponent';
import Emoji from '../Emoji';

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
    <div ref={wrapperRef}>
      <button
        className="label-text w-16 text-3xl bg-white p-3 rounded-lg shadow transition hover:scale-95"
        onClick={() => setDisplayPicker(!displayPicker)}
      >
        <Emoji symbol={chosenEmoji?.emoji || defaultEmote} />
      </button>

      {displayPicker && (
        <div
          onClick={() => setDisplayPicker(false)}
          className="absolute w-full h-full left-0 top-0 bg-black opacity-60"
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
            zIndex: '1',
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
