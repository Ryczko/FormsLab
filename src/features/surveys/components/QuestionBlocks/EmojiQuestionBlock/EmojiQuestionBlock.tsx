import QuestionBlockWrapper from 'features/surveys/components/QuestionBlocks/QuestionBlockWrapper/QuestionBlockWrapper';
import useTranslation from 'next-translate/useTranslation';
import EmojiPicker from 'features/surveys/components/EmojiPicker/EmojiPicker';
import { MAX_EMOJIS, MIN_EMOJIS } from 'shared/constants/emojisConfig';

interface EmojiQuestionBlockProps {
  pack: string[];
  handleEmotePick: (index: number, newEmote: string) => void;
  handleEmoteRemove: (index: number) => void;
  handleAddingNewEmote: (newEmote: string) => void;
}

export default function EmojiQuestionBlock({
  pack,
  handleAddingNewEmote,
  handleEmotePick,
  handleEmoteRemove,
}: EmojiQuestionBlockProps) {
  const { t } = useTranslation('surveyCreate');

  return (
    <QuestionBlockWrapper>
      <div className="mb-3 block text-left font-semibold">
        {t('emojiPickingInformation')}
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, 64px)',
          justifyContent: 'space-between',
          gridGap: '8px',
        }}
      >
        {pack.map((emote, idx) => (
          <EmojiPicker
            key={idx}
            index={idx}
            pickedEmoji={emote}
            onEmotePick={handleEmotePick}
            onEmoteRemove={
              pack.length > MIN_EMOJIS ? handleEmoteRemove : undefined
            }
          />
        ))}
        {pack.length < MAX_EMOJIS && (
          <EmojiPicker addEmoji={true} onEmoteAdd={handleAddingNewEmote} />
        )}
      </div>
    </QuestionBlockWrapper>
  );
}
