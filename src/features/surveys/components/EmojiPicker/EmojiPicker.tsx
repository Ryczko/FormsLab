import { useRef, useState } from 'react';
import { useCloseComponent } from '../../../../shared/hooks/useCloseComponent';

import dynamic from 'next/dynamic';
import Loader from '../../../../shared/components/Loader/Loader';
import { Categories, EmojiClickData } from 'emoji-picker-react';
import { EMOJI_STYLE } from 'src/shared/constants/emojisConfig';
import Emoji from '../Emoji/Emoji';

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
  const [chosenEmoji, setChosenEmoji] = useState<EmojiClickData>();
  const [displayPicker, setDisplayPicker] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useCloseComponent(wrapperRef, () => setDisplayPicker(false));

  const onEmojiClick = (emojiObject: EmojiClickData) => {
    setChosenEmoji(emojiObject);
    onEmotePick(index, emojiObject.unified);
    setDisplayPicker(!displayPicker);
  };

  return (
    <div ref={wrapperRef}>
      <button
        className="flex justify-center items-center p-3 w-16 text-3xl bg-white rounded-lg shadow transition hover:scale-95 label-text"
        onClick={() => setDisplayPicker(!displayPicker)}
      >
        <Emoji unified={chosenEmoji?.unified || defaultEmote} />
      </button>

      {displayPicker && (
        <div
          onClick={() => setDisplayPicker(false)}
          className="fixed top-0 left-0 z-10 w-full h-full bg-black opacity-60"
        />
      )}
      {displayPicker && (
        <div className="flex overflow-hidden fixed top-1/2 left-1/2 z-20 justify-center items-center w-[400px] max-w-[90%] h-[400px] max-h-[90%] bg-white rounded-md -translate-x-1/2 -translate-y-1/2">
          <Picker
            onEmojiClick={onEmojiClick}
            autoFocusSearch={false}
            emojiStyle={EMOJI_STYLE}
            searchDisabled
            skinTonesDisabled
            previewConfig={{
              showPreview: false,
            }}
            categories={[
              {
                category: Categories.SUGGESTED,
                name: 'Frequently Used',
              },
              {
                category: Categories.SMILEYS_PEOPLE,
                name: 'Smileys & People',
              },
              {
                category: Categories.ANIMALS_NATURE,
                name: 'Animals & Nature',
              },
              {
                category: Categories.FOOD_DRINK,
                name: 'Food & Drink',
              },
              {
                category: Categories.TRAVEL_PLACES,
                name: 'Travel & Places',
              },
              {
                category: Categories.ACTIVITIES,
                name: 'Activities',
              },
              {
                category: Categories.OBJECTS,
                name: 'Objects',
              },
              {
                category: Categories.FLAGS,
                name: 'Flags',
              },
            ]}
            width={400}
            height={400}
          />
        </div>
      )}
    </div>
  );
}

export default EmojiPicker;
