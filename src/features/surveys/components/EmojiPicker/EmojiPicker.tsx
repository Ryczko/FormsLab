import React, { useState } from 'react';
import { EMOJI_STYLE } from 'shared/constants/emojisConfig';
import { PlusSmIcon, TrashIcon } from '@heroicons/react/outline';
import Button, { ButtonVariant } from 'shared/components/Button/Button';
import StyledDialog from 'shared/components/StyledDialog/StyledDialog';
import Picker from '@emoji-mart/react';
import Emoji from 'features/surveys/components/Emoji/Emoji';
import { EmojiObject } from 'features/surveys/components/EmojiPicker/EmojiObject';

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

  const onEmojiClick = (emojiObject: EmojiObject) => {
    onEmotePick?.(index, emojiObject.shortcodes);
    setDisplayPicker(false);
  };

  const onEmojiClickAdd = (emojiObject: EmojiObject) => {
    onEmoteAdd?.(emojiObject.shortcodes);
    setDisplayPicker(false);
  };

  return (
    <div>
      <button
        type="button"
        className="label-text flex min-h-[56px] w-16 items-center justify-center rounded-lg bg-white p-3 text-3xl shadow transition hover:scale-95"
        onClick={() => setDisplayPicker(!displayPicker)}
      >
        {!addEmoji ? (
          <Emoji shortcodes={pickedEmoji || ''} />
        ) : (
          <div className="flex h-[34px] w-[32px] items-center">
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
        contentClassName="!w-[400px] !p-0"
        content={
          <Picker
            onEmojiSelect={!addEmoji ? onEmojiClick : onEmojiClickAdd}
            set={EMOJI_STYLE}
            previewPosition="none"
            searchPosition="none"
            dynamicWidth={true}
            skinTonePosition="none"
            emojiSize={30}
            emojiButtonSize={40}
            emojiButtonRadius={'8px'}
            categories={[
              'frequent',
              'people',
              'nature',
              'foods',
              'activity',
              'places',
              'flags',
            ]}
          />
        }
      ></StyledDialog>
    </div>
  );
}

export default EmojiPicker;
