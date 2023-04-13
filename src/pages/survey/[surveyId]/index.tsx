import Head from 'next/head';
import Button, {
  ButtonVariant,
  ButtonSize,
} from 'shared/components/Button/Button';
import EmojiButton from 'features/surveys/components/EmojiButton/EmojiButton';
import Header from 'shared/components/Header/Header';
import Loader from 'shared/components/Loader/Loader';
import { useSurveyAnswerManager } from 'features/surveys/managers/surveyAnswerManager';
import Link from 'next/link';
import ButtonLink from 'shared/components/ButtonLink/ButtonLink';

function AnswerPage() {
  const {
    isSurveyActive,
    isLoading,
    question,
    icons,
    selectedIcon,
    handleIconClick,
    answer,
    handleInputAnswer,
    handleSave,
    isAnswering,
    showEmojiError,
  } = useSurveyAnswerManager();

  return (
    <>
      <Head>
        <title>Survey</title>
        <meta name="description" content="Survey - Employee Pulse" />
      </Head>
      <Loader isLoading={isLoading} />
      {!isLoading && (
        <>
          {isSurveyActive ? (
            <>
              <Header>{question}</Header>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {icons.map((icon, idx) => (
                  <EmojiButton
                    icon={icon}
                    selected={selectedIcon === icon}
                    key={idx}
                    onClick={handleIconClick}
                  />
                ))}
              </div>
              {showEmojiError && (
                <div className="mt-2 text-red-500">
                  Please select an emoji before sending.
                </div>
              )}
              <div className="mt-8">
                <textarea
                  className="h-52 w-full resize-none rounded-lg p-4 shadow focus:outline-none"
                  placeholder="Tell Us More"
                  value={answer}
                  onChange={handleInputAnswer}
                ></textarea>
              </div>
              <div className="flex justify-center">
                <Button
                  onClick={handleSave}
                  className="mt-6 w-full sm:w-auto"
                  variant={ButtonVariant.PRIMARY}
                  sizeType={ButtonSize.MEDIUM}
                  isLoading={isAnswering}
                >
                  Send
                </Button>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-5xl">🙁</h1>
              <h1 className="my-5 text-xl">Oops Survey is no longer active</h1>
              <Link href={'/'}>
                <ButtonLink
                  variant={ButtonVariant.PRIMARY}
                  className="w-full sm:w-auto"
                >
                  Go back to home
                </ButtonLink>
              </Link>
            </>
          )}
        </>
      )}
    </>
  );
}

export default AnswerPage;
