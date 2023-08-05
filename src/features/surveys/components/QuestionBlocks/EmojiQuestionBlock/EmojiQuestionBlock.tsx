import EmojiPicker from 'features/surveys/components/EmojiPicker/EmojiPicker';
import { MAX_EMOJIS, MIN_EMOJIS } from 'shared/constants/emojisConfig';

interface EmojiQuestionBlockProps {
  pack: string[];
  handleEmotePick: (
    index: number,
    newEmote: string,
    questionIndex: number,
    blockDuplicates?: boolean
  ) => void;
  handleEmoteRemove: (index: number, questionIndex: number) => void;
  handleAddingNewEmote: (
    newEmote: string,
    questionIndex: number,
    blockDuplicates?: boolean
  ) => void;
  questionIndex: number;
}

export default function EmojiQuestionBlock({
  pack,
  handleAddingNewEmote,
  handleEmotePick,
  handleEmoteRemove,
  questionIndex,
}: EmojiQuestionBlockProps) {
  return (
    <div
      className="mt-4"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, 64px)',
        justifyContent: 'space-between',
        gridGap: '8px',
      }}
    >
      {pack.map((emote, idx) => (
        <EmojiPicker
          key={emote}
          index={idx}
          pickedEmoji={emote}
          questionIndex={questionIndex}
          onEmotePick={handleEmotePick}
          onEmoteRemove={
            pack.length > MIN_EMOJIS ? handleEmoteRemove : undefined
          }
        />
      ))}
      {pack.length < MAX_EMOJIS && (
        <EmojiPicker
          questionIndex={questionIndex}
          addEmoji={true}
          onEmoteAdd={handleAddingNewEmote}
        />
      )}
    </div>
  );
}
