import EmojiPicker from 'features/surveys/features/SurveyCreator/components/EmojiPicker/EmojiPicker';
import { MAX_EMOJIS, MIN_EMOJIS } from 'shared/constants/emojisConfig';
import { useSurveyCreatorContext } from 'features/surveys/features/SurveyCreator/managers/createSurveyManager/context';

interface EmojiQuestionBlockProps {
  pack: string[];
  questionIndex: number;
}

export default function EmojiQuestionBlock({
  pack,
  questionIndex,
}: EmojiQuestionBlockProps) {
  const { handleAddingNewOption, handleOptionChange, handleOptionRemove } =
    useSurveyCreatorContext();

  return (
    <div
      className="mb-4 mt-2"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, 56px)',
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
          onEmotePick={handleOptionChange}
          onEmoteRemove={
            pack.length > MIN_EMOJIS ? handleOptionRemove : undefined
          }
        />
      ))}
      {pack.length < MAX_EMOJIS && (
        <EmojiPicker
          questionIndex={questionIndex}
          addEmoji={true}
          onEmoteAdd={handleAddingNewOption}
        />
      )}
    </div>
  );
}
