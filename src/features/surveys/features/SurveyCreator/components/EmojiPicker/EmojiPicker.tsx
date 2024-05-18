import React, { useState } from 'react';
import { EMOJI_STYLE } from 'shared/constants/emojisConfig';
import { PlusSmIcon, TrashIcon } from '@heroicons/react/outline';
import Button, { ButtonVariant } from 'shared/components/Button/Button';
import StyledDialog from 'shared/components/StyledDialog/StyledDialog';
import Picker from '@emoji-mart/react';
import Emoji from 'features/surveys/components/Emoji/Emoji';
import { EmojiObject } from 'features/surveys/features/SurveyCreator/components/EmojiPicker/EmojiObject';

interface EmojiPickerProps {
  index?: number;
  pickedEmoji?: string;
  addEmoji?: boolean;
  onEmotePick?: (
    idx: number,
    newValue: string,
    questionIndex: number,
    blockDuplicates?: boolean
  ) => void;
  onEmoteAdd?: (
    newValue: string,
    questionIndex: number,
    blockDuplicates?: boolean
  ) => void;
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
    onEmotePick?.(index, emojiObject.shortcodes, questionIndex, true);
    setDisplayPicker(false);
  };

  const onEmojiClickAdd = (emojiObject: EmojiObject) => {
    onEmoteAdd?.(emojiObject.shortcodes, questionIndex, true);
    setDisplayPicker(false);
  };

  return (
    <div>
      <Button
        className="label-text flex h-11 w-14 items-center justify-center rounded-md border bg-zinc-50 shadow-sm transition hover:scale-95"
        onClick={() => setDisplayPicker(!displayPicker)}
      >
        {!addEmoji ? (
          <Emoji size={27} shortcodes={pickedEmoji || ''} />
        ) : (
          <PlusSmIcon className="w-[20px]" />
        )}
      </Button>
      {onEmoteRemove && (
        <Button
          onClick={() => onEmoteRemove(index, questionIndex)}
          className="mt-1 w-14 py-1.5"
          variant={ButtonVariant.DANGER}
          icon={<TrashIcon className="h-[15px] w-[15px]" />}
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
            emojiSize={28}
            emojiButtonSize={38}
            emojiButtonRadius={'6px'}
            theme="light"
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
