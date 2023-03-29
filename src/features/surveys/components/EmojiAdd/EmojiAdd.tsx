import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { EmojiClickData } from 'emoji-picker-react';
import { Categories } from 'emoji-picker-react';
import { useCloseComponent } from 'shared/hooks/useCloseComponent';
import Loader from 'shared/components/Loader/Loader';
import { EMOJI_STYLE } from 'shared/constants/emojisConfig';

const Picker = dynamic(() => import('emoji-picker-react'), {
  ssr: false,
  loading: () => <Loader isLoading={true} />,
});

interface EmojiPickerProps {
  onEmotePick: (newValue: string) => void;
}

function EmojiPicker({ onEmotePick }: EmojiPickerProps) {
  const [displayPicker, setDisplayPicker] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useCloseComponent(wrapperRef, () => setDisplayPicker(false));

  const onEmojiClick = (emojiObject: EmojiClickData) => {
    onEmotePick(emojiObject.unified);
    setDisplayPicker(!displayPicker);
  };

  return (
    <div ref={wrapperRef}>
      <button
        type="button"
        className="label-text flex w-16 items-center justify-center rounded-lg bg-white p-3 text-3xl shadow transition hover:scale-95"
        onClick={() => setDisplayPicker(!displayPicker)}
      >
        <p className="pt-1 text-xl">+</p>
      </button>
      {displayPicker && (
        <button
          type="button"
          onClick={() => setDisplayPicker(false)}
          className="fixed top-0 left-0 z-10 h-full w-full bg-black opacity-60"
        />
      )}
      {displayPicker && (
        <div className="fixed top-1/2 left-1/2 z-20 flex h-[400px] max-h-[90%] w-[400px] max-w-[90%] -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-md bg-white">
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
