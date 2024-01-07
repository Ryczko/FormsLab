import Head from 'next/head';
import withAnimation from 'shared/HOC/withAnimation';
import Button, { ButtonVariant } from 'shared/components/Button/Button';
import Header from 'shared/components/Header/Header';
import Input from 'shared/components/Input/Input';
import { useCreateSurveyManager } from 'features/surveys/managers/createSurveyManager';
import useTranslation from 'next-translate/useTranslation';
import QuestionBlockFactory from 'features/surveys/components/QuestionBlocks/QuestionBlockFactory';

import { AddQuestionButton } from 'features/surveys/components/AddQuestionButton/AddQuestionButton';
import {
  MAX_QUESTIONS,
  MAX_TITLE_LENGTH,
  MIN_QUESTIONS,
} from 'shared/constants/surveysConfig';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import clsx from 'clsx';
import { CogIcon } from '@heroicons/react/outline';
import useModal from 'features/surveys/hooks/useModal';
import SurveyOptionsModalModal from 'features/surveys/components/SurveyOptionsModal/SurveyOptionsModal';
import { useApplicationContext } from 'features/application/context';
import { InferGetServerSidePropsType, NextPageContext } from 'next';
import { getSurveyData } from 'pages/api/answer/[id]';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export async function getServerSideProps(context: NextPageContext) {
  const surveyId = context.query.surveyId?.[0];
  let surveyData;

  if (surveyId) {
    const session = await getSession(context);
    if (!session) {
      return {
        redirect: {
          destination: '/login',
        },
      };
    }

    surveyData = await getSurveyData(surveyId, session.user?.id);

    if (!surveyData) {
      return {
        redirect: {
          destination: '/survey/create',
        },
      };
    }
  }

  return {
    props: {
      initialData: surveyData ? JSON.parse(JSON.stringify(surveyData)) : null,
    },
  };
}

function SurveyCreatePage({
  initialData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { user } = useApplicationContext();

  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsBrowser(true);
    }
  }, []);

  const {
    title,
    error,
    handleChangeTitle,
    handleOptionChange,
    handleOptionRemove,
    handleAddingNewOption,
    createSurvey,
    isCreating,
    questions,
    addQuestion,
    removeQuestion,
    updateQuestion,
    isSubmitted,
    updateQuestionRequired,
    reorderQuestion,
    expandQuestion,
    surveyOptions,
    updateSurveyOptions,
    signInToCreateSurvey,
    isEditMode,
    confirmEditSurvey,
    discardChanges,
  } = useCreateSurveyManager(initialData);
  const { t } = useTranslation('surveyCreate');

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    reorderQuestion(result.source.index, result.destination.index);
  };

  const {
    isModalOpen: isOptionsModalOpen,
    closeModal: closeOptionsSurveyModal,
    openModal: openOptionsSurveyModal,
  } = useModal();

  return (
    <>
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content={t('content')} />
      </Head>

      <Header>{isEditMode ? t('editHeading') : t('heading')}</Header>

      <div className="flex flex-col gap-x-2 sm:flex-row">
        <div className="w-full">
          <Input
            name="survey-title"
            placeholder={t('surveyTitlePlaceholder')}
            value={title}
            error={error}
            maxLength={MAX_TITLE_LENGTH}
            onChange={handleChangeTitle}
          />
        </div>

        <Button
          className="h-[42px] border border-transparent sm:mt-2"
          variant={ButtonVariant.PRIMARY}
          onClick={openOptionsSurveyModal}
          icon={<CogIcon className="h-5 w-5" />}
          data-test-id="options-button"
        >
          Options
        </Button>
      </div>

      <div className="mt-4">
        {isEditMode && (
          <div
            className="mb-3 rounded-sm border-l-4 border-indigo-500 bg-indigo-100 px-4 py-2 text-left text-xs text-indigo-700"
            role="alert"
          >
            <p className="font-bold">{t('editNoteTitle')}</p>

            <p>{t('editNote')}</p>
          </div>
        )}
        <DragDropContext onDragEnd={onDragEnd}>
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
                            type={question.type}
                            dragHandleProps={provided.dragHandleProps}
                            handleAddingNewOption={handleAddingNewOption}
                            options={question.options ?? []}
                            handleOptionChange={handleOptionChange}
                            handleOptionRemove={handleOptionRemove}
                            questionIndex={index}
                            onQuestionRemove={removeQuestion}
                            updateQuestion={updateQuestion}
                            questionTitle={question.title}
                            isSubmitted={isSubmitted}
                            isRemovingPossible={
                              questions.length > MIN_QUESTIONS
                            }
                            isDraggingPossible={questions.length > 1}
                            isRequired={question.isRequired}
                            updateQuestionRequired={updateQuestionRequired}
                            expanded={question.expanded}
                            expandQuestion={expandQuestion}
                            isEditMode={isEditMode}
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

      <div className="mt-4">
        {questions.length < MAX_QUESTIONS && !isEditMode && (
          <AddQuestionButton onClick={addQuestion} />
        )}

        {user ? (
          <div className="flex flex-col gap-2 sm:flex-row">
            {isEditMode && (
              <Button
                onClick={discardChanges}
                className="z-0 w-full"
                variant={ButtonVariant.OUTLINE}
                disabled={isCreating}
              >
                {t('discardChanges')}
              </Button>
            )}
            <Button
              name="create-survey"
              onClick={isEditMode ? confirmEditSurvey : createSurvey}
              className="z-0 w-full"
              variant={ButtonVariant.PRIMARY}
              isLoading={isCreating}
            >
              {isEditMode ? t('buttonSave') : t('buttonCreate')}
            </Button>
          </div>
        ) : (
          <Button
            onClick={signInToCreateSurvey}
            variant={ButtonVariant.PRIMARY}
            className="z-0 mt-2 w-full"
          >
            {t('signInToCreateSurvey')}
          </Button>
        )}
      </div>

      <SurveyOptionsModalModal
        isOpened={isOptionsModalOpen}
        closeModal={closeOptionsSurveyModal}
        surveyOptions={surveyOptions}
        updateOptions={updateSurveyOptions}
      />
    </>
  );
}

export default withAnimation(SurveyCreatePage);
