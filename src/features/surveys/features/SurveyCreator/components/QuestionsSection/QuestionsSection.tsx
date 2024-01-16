import clsx from 'clsx';
import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import QuestionBlockFactory from 'features/surveys/features/SurveyCreator/components/QuestionBlocks/QuestionBlockFactory';
import { useSurveyCreatorContext } from 'features/surveys/features/SurveyCreator/context';
import { useApplicationContext } from 'features/application/context';
import useTranslation from 'next-translate/useTranslation';
import Note from 'shared/components/Note/Note';

export default function QuestionsSection() {
  const { t } = useTranslation('surveyCreate');

  const { isBrowser } = useApplicationContext();
  const { onDragQuestionEnd, questions, isEditMode } =
    useSurveyCreatorContext();

  return (
    <div className="mt-4">
      {isEditMode && (
        <Note title={t('editNoteTitle')} description={t('editNote')} />
      )}

      <DragDropContext onDragEnd={onDragQuestionEnd}>
        {isBrowser ? (
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={clsx(snapshot.isDraggingOver && '')}
              >
                {questions.map((question, index) => (
                  <Draggable
                    key={question.id}
                    draggableId={question.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        className={clsx('mb-3', snapshot.isDragging && '')}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={provided.draggableProps.style}
                      >
                        <QuestionBlockFactory
                          key={question.id}
                          questionData={question}
                          dragHandleProps={provided.dragHandleProps}
                          questionIndex={index}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ) : null}
      </DragDropContext>
    </div>
  );
}
