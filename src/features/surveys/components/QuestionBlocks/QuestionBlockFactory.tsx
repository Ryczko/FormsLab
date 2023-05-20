import EmojiQuestionBlock from 'features/surveys/components/QuestionBlocks/EmojiQuestionBlock/EmojiQuestionBlock';

interface QuestionBlockFactoryProps {
  type: 'emoji';
  pack: string[];
  handleEmotePick: (index: number, newEmote: string) => void;
  handleEmoteRemove: (index: number) => void;
  handleAddingNewEmote: (newEmote: string) => void;
}

export default function QuestionBlockFactory({
  type,
  handleAddingNewEmote,
  handleEmotePick,
  handleEmoteRemove,
  pack,
}: QuestionBlockFactoryProps) {
  switch (type) {
    case 'emoji':
      return (
        <EmojiQuestionBlock
          handleAddingNewEmote={handleAddingNewEmote}
          pack={pack}
          handleEmotePick={handleEmotePick}
          handleEmoteRemove={handleEmoteRemove}
        />
      );
    default:
      return null;
  }
}
