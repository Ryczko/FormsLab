import Head from 'next/head';
import Button, {
  ButtonVariant,
  ButtonSize,
} from 'shared/components/Button/Button';
import Header from 'shared/components/Header/Header';
import Loader from 'shared/components/Loader/Loader';
import { useSurveyAnswerManager } from 'features/surveys/managers/surveyAnswerManager';
import Link from 'next/link';
import ButtonLink from 'shared/components/ButtonLink/ButtonLink';
import {
  AnswerType,
  AnswersComponentFactory,
} from 'features/surveys/components/AnswersComponent/AnswersComponentFactory';

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

              <AnswersComponentFactory
                type={AnswerType.BUTTONS}
                {...{
                  icons,
                  selectedIcon,
                  handleIconClick,
                  showEmojiError,
                  answer,
                  handleInputAnswer,
                }}
              />
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
