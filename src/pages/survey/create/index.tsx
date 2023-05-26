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
    pack,
    error,
    handleChangeTitle,
    handleEmotePick,
    handleEmoteRemove,
    handleAddingNewEmote,
    createSurvey,
    isCreating,
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
        className="!mb-1 py-3"
        onChange={handleChangeTitle}
        absoluteError
      />

      <QuestionBlockFactory
        type="emoji"
        handleAddingNewEmote={handleAddingNewEmote}
        pack={pack}
        handleEmotePick={handleEmotePick}
        handleEmoteRemove={handleEmoteRemove}
      />

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
