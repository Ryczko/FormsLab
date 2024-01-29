import EmojiPicker from 'features/surveys/features/SurveyCreator/components/EmojiPicker/EmojiPicker';
import { MAX_EMOJIS, MIN_EMOJIS } from 'shared/constants/emojisConfig';
import { useSurveyCreatorContext } from 'features/surveys/features/SurveyCreator/managers/createSurveyManager/context';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import clsx from 'clsx';

interface EmojiQuestionBlockProps {
  pack: string[];
  questionIndex: number;
}

export default function EmojiQuestionBlock({
  pack,
  questionIndex,
}: EmojiQuestionBlockProps) {
  const {
    handleAddingNewOption,
    handleOptionChange,
    handleOptionRemove,
    onDragEmojiEnd,
  } = useSurveyCreatorContext();

  return (
    <div
      className="mb-3 mt-1"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, 58px)',
        justifyContent: 'space-between',
        gridGap: '8px',
      }}
    >
      <DragDropContext
        onDragEnd={(result) => onDragEmojiEnd(result, questionIndex)}
      >
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={clsx(snapshot.isDraggingOver && '')}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '50px'
              }}
            >
              {pack.map((emote, idx) => (
                <Draggable key={emote} draggableId={emote} index={idx}>
                  {(provided, snapshot) => (
                    <div
                      className={clsx('mb-3', snapshot.isDragging && '')}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      style={provided.draggableProps.style}
                    >
                      <EmojiPicker
                        key={emote}
                        index={idx}
                        pickedEmoji={emote}
                        questionIndex={questionIndex}
                        onEmotePick={handleOptionChange}
                        onEmoteRemove={
                          pack.length > MIN_EMOJIS
                            ? handleOptionRemove
                            : undefined
                        }
                        dragHandleProps={provided.dragHandleProps}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>

        {pack.length < MAX_EMOJIS && (
          <EmojiPicker
            questionIndex={questionIndex}
            addEmoji={true}
            onEmoteAdd={handleAddingNewOption}
          />
        )}
      </DragDropContext>
    </div>
  );
}
