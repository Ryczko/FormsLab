import Head from 'next/head';
import withAnimation from 'shared/HOC/withAnimation';
import withProtectedRoute from 'shared/HOC/withProtectedRoute';
import Button, { ButtonVariant } from 'shared/components/Button/Button';
import Header from 'shared/components/Header/Header';
import Input from 'shared/components/Input/Input';
import EmojiPicker from 'features/surveys/components/EmojiPicker/EmojiPicker';
import { useCreateSurveyManager } from 'features/surveys/managers/createSurveyManager';
import useTranslation from 'next-translate/useTranslation';

const MIN_EMOJIS = 2;
const MAX_EMOJIS = 8;

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
        error={!title ? error : undefined}
        className="!mb-1 py-3"
        onChange={handleChangeTitle}
        absoluteError
      />

      <div className="mt-8">
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
        <div className="flex justify-center">
          <Button
            name="create-survey"
            onClick={createSurvey}
            className="z-0 mt-9 w-full sm:w-auto"
            variant={ButtonVariant.PRIMARY}
            isLoading={isCreating}
          >
            {t('buttonCreate')}
          </Button>
        </div>
      </div>
    </>
  );
}

export default withProtectedRoute(withAnimation(SurveyCreatePage));
