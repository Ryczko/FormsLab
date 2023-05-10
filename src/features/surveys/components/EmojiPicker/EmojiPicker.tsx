import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { EmojiClickData } from 'emoji-picker-react';
import { Categories } from 'emoji-picker-react';
import Loader from 'shared/components/Loader/Loader';
import Emoji from 'features/surveys/components/Emoji/Emoji';
import { EMOJI_STYLE } from 'shared/constants/emojisConfig';
import { PlusSmIcon, TrashIcon } from '@heroicons/react/outline';
import Button, { ButtonVariant } from 'shared/components/Button/Button';
import StyledDialog from 'shared/components/StyledDialog/StyledDialog';

const Picker = dynamic(() => import('emoji-picker-react'), {
  ssr: false,
  loading: () => <Loader isLoading={true} />,
});

interface EmojiPickerProps {
  index?: number;
  pickedEmoji?: string;
  addEmoji?: boolean;
  onEmotePick?: (idx: number, newValue: string) => void;
  onEmoteAdd?: (newValue: string) => void;
  onEmoteRemove?: (idx: number) => void;
}

function EmojiPicker({
  index = 0,
  pickedEmoji,
  addEmoji,
  onEmotePick,
  onEmoteAdd,
  onEmoteRemove,
}: EmojiPickerProps) {
  const [displayPicker, setDisplayPicker] = useState(false);

  const onEmojiClick = (emojiObject: EmojiClickData) => {
    onEmotePick?.(index, emojiObject.unified);
    setDisplayPicker(false);
  };

  const onEmojiClickAdd = (emojiObject: EmojiClickData) => {
    onEmoteAdd?.(emojiObject.unified);
    setDisplayPicker(false);
  };

  return (
    <div>
      <button
        type="button"
        className="label-text flex w-16 items-center justify-center rounded-lg bg-white p-3 text-3xl shadow transition hover:scale-95"
        onClick={() => setDisplayPicker(!displayPicker)}
      >
        {!addEmoji ? (
          <Emoji unified={pickedEmoji || ''} />
        ) : (
          <div className="w-[32px]">
            <PlusSmIcon />
          </div>
        )}
      </button>
      {onEmoteRemove && (
        <Button
          onClick={() => onEmoteRemove(index)}
          className="mt-1 w-[64px]"
          variant={ButtonVariant.DANGER}
          icon={<TrashIcon className="h-4 w-4" />}
        />
      )}
      <StyledDialog
        onClose={() => setDisplayPicker(false)}
        isOpen={displayPicker}
        contentClassName="w-[400px] p-0"
        content={
          <Picker
            onEmojiClick={!addEmoji ? onEmojiClick : onEmojiClickAdd}
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
            width={'100%'}
            height={400}
          />
        }
      ></StyledDialog>
    </div>
  );
}

export default EmojiPicker;
