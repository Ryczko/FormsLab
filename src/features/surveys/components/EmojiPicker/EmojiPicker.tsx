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
  onEmotePick?: (idx: number, newValue: string, questionIndex: number) => void;
  onEmoteAdd?: (newValue: string, questionIndex: number) => void;
  onEmoteRemove?: (idx: number, questionIndex: number) => void;
  questionIndex: number;
}

function EmojiPicker({
  index = 0,
  pickedEmoji,
  addEmoji,
  onEmotePick,
  onEmoteAdd,
  onEmoteRemove,
  questionIndex,
}: EmojiPickerProps) {
  const [displayPicker, setDisplayPicker] = useState(false);

  const onEmojiClick = (emojiObject: EmojiObject) => {
    onEmotePick?.(index, emojiObject.shortcodes, questionIndex);
    setDisplayPicker(false);
  };

  const onEmojiClickAdd = (emojiObject: EmojiObject) => {
    onEmoteAdd?.(emojiObject.shortcodes, questionIndex);
    setDisplayPicker(false);
  };

  return (
    <div>
      <button
        type="button"
        className="label-text flex min-h-[57px] w-16 items-center justify-center rounded-lg bg-white p-3 shadow transition hover:scale-95"
        onClick={() => setDisplayPicker(!displayPicker)}
      >
        {!addEmoji ? (
          <Emoji shortcodes={pickedEmoji || ''} />
        ) : (
          <PlusSmIcon className="w-[32px]" />
        )}
      </button>
      {onEmoteRemove && (
        <Button
          onClick={() => onEmoteRemove(index, questionIndex)}
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
              'giffs',
              'people',
              'nature',
              'foods',
              'activity',
              'places',
              'flags',
              'objects',
              'symbols',
            ]}
          />
        }
      ></StyledDialog>
    </div>
  );
}

export default EmojiPicker;
