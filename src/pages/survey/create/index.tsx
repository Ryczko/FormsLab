import Head from 'next/head';
import withAnimation from 'shared/HOC/withAnimation';
import withProtectedRoute from 'shared/HOC/withProtectedRoute';
import Button, { ButtonVariant } from 'shared/components/Button/Button';
import Header from 'shared/components/Header/Header';
import Input from 'shared/components/Input/Input';
import EmojiPicker from 'features/surveys/components/EmojiPicker/EmojiPicker';
import { useCreateSurveyManager } from 'features/surveys/managers/createSurveyManager';

function SurveyCreatePage() {
  const {
    title,
    pack,
    error,
    allowAdd,
    allowRemove,
    handleChangeTitle,
    handleEmotePick,
    handleEmoteRemove,
    handleAddingNewEmote,
    createSurvey,
    isCreating,
  } = useCreateSurveyManager();

  return (
    <>
      <Head>
        <title>Create Survey</title>
        <meta name="description" content="Create Survey - Employee Pulse" />
      </Head>
      <div className="container m-auto px-4 text-center md:px-8">
        <Header>Create new survey</Header>

        <div className="mx-auto max-w-lg">
          <Input
            label="Survey title"
            placeholder="Title..."
            value={title}
            error={!title ? error : undefined}
            className="!mb-1 py-3"
            onChange={handleChangeTitle}
            absoluteError
          />

          <div className="mt-8">
            <div className="mb-3 block text-left font-semibold">
              Click on icon to change
            </div>
            <div className="grid w-full grid-cols-4 items-start justify-items-center gap-y-4 max-[400px]:grid-cols-2">
              {pack.map((emote, idx) => (
                <EmojiPicker
                  key={idx}
                  index={idx}
                  defaultEmote={emote}
                  onEmotePick={handleEmotePick}
                  onEmoteRemove={allowRemove ? handleEmoteRemove : undefined}
                />
              ))}
              {allowAdd && (
                <EmojiPicker
                  addEmoji={allowAdd}
                  onEmoteAdd={handleAddingNewEmote}
                />
              )}
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              onClick={createSurvey}
              className="z-0 mt-6 w-full sm:w-auto"
              variant={ButtonVariant.PRIMARY}
              isLoading={isCreating}
            >
              Create
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default withProtectedRoute(withAnimation(SurveyCreatePage));
