import Head from 'next/head';
import withAnimation from 'shared/HOC/withAnimation';
import withProtectedRoute from 'shared/HOC/withProtectedRoute';
import Button, { ButtonVariant } from 'shared/components/Button/Button';
import Header from 'shared/components/Header/Header';
import Input from 'shared/components/Input/Input';
import { useCreateSurveyManager } from 'features/surveys/managers/createSurveyManager';
import useTranslation from 'next-translate/useTranslation';
import QuestionBlockFactory from 'features/surveys/components/QuestionBlocks/QuestionBlockFactory';
import { getSession } from 'next-auth/react';
import { NextPageContext } from 'next';
import { AddQuestionButton } from 'features/surveys/components/AddQuestionButton/AddQuestionButton';
import {
  MAX_QUESTIONS,
  MAX_TITLE_LENGTH,
  MIN_QUESTIONS,
} from 'shared/constants/surveysConfig';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

function SurveyCreatePage() {
  const {
    title,
    error,
    handleChangeTitle,
    handleEmotePick,
    handleEmoteRemove,
    handleAddingNewEmote,
    createSurvey,
    isCreating,
    questions,
    addQuestion,
    removeQuestion,
    updateQuestion,
    isSubmitted,
    updateQuestionRequired,
  } = useCreateSurveyManager();
  const { t } = useTranslation('surveyCreate');

  return (
    <>
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content={t('content')} />
      </Head>

      <Header>{t('heading')}</Header>
      <Input
        label={t('surveyTitleLable')}
        name="survey-title"
        placeholder={t('surveyTitlePlaceholder')}
        value={title}
        error={error}
        maxLength={MAX_TITLE_LENGTH}
        onChange={handleChangeTitle}
      />

      {questions.map((question, index) => (
        <QuestionBlockFactory
          key={question.id}
          type={question.type}
          handleAddingNewEmote={handleAddingNewEmote}
          pack={question.options ?? []}
          handleEmotePick={handleEmotePick}
          handleEmoteRemove={handleEmoteRemove}
          questionIndex={index}
          onQuestionRemove={removeQuestion}
          updateQuestion={updateQuestion}
          questionTitle={question.title}
          isSubmitted={isSubmitted}
          isRemovingPossible={questions.length > MIN_QUESTIONS}
          isRequired={question.isRequired}
          updateQuestionRequired={updateQuestionRequired}
        />
      ))}

      {questions.length < MAX_QUESTIONS && (
        <AddQuestionButton onClick={addQuestion} />
      )}

      <div className="flex justify-center">
        <Button
          name="create-survey"
          onClick={createSurvey}
          className="z-0 mt-2 w-full"
          variant={ButtonVariant.PRIMARY}
          isLoading={isCreating}
        >
          {t('buttonCreate')}
        </Button>
      </div>
    </>
  );
}

export default withProtectedRoute(withAnimation(SurveyCreatePage));
