import clsx from 'clsx';
import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import QuestionBlockFactory from 'features/surveys/features/SurveyCreator/components/QuestionBlocks/QuestionBlockFactory';
import { useSurveyCreatorContext } from 'features/surveys/features/SurveyCreator/managers/createSurveyManager/context';
import { useApplicationContext } from 'features/application/context';
import useTranslation from 'next-translate/useTranslation';
import Note from 'shared/components/Note/Note';

export default function QuestionsSection() {
  const { t } = useTranslation('surveyCreate');

  const { isBrowser } = useApplicationContext();
  const { onDragQuestionEnd, questions, isEditMode } =
    useSurveyCreatorContext();

  return (
    <div className="mt-2">
      {isEditMode && (
        <Note title={t('editNoteTitle')} description={t('editNote')} />
      )}

      <div className="block md:hidden">
        <Note
          title={'Note'}
          description={
            'Some actions, such as advanced settings, are not available on low resolution devices.'
          }
        />
      </div>

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
                    key={question.draftId}
                    draggableId={question.draftId}
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
                          key={question.draftId}
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
