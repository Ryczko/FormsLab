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
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexGrow: '1',
      }}
    >
      <DragDropContext
        onDragEnd={(result) => onDragEmojiEnd(result, questionIndex)}
      >
        <Droppable droppableId="droppable-emoji" direction="horizontal">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={clsx('flex', snapshot.isDraggingOver && '')}
            >
              {pack.map((emote, index) => (
                <Draggable key={emote} draggableId={emote} index={index}>
                  {(provided, snapshot) => (
                    <div
                      className={clsx('mb-3 mr-5', snapshot.isDragging && '')}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      style={provided.draggableProps.style}
                    >
                      <EmojiPicker
                        key={emote}
                        index={index}
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
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
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
