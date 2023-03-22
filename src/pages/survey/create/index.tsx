import DatePicker from 'react-datepicker';
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
    handleChangeTitle,
    startDate,
    setStartDate,
    endDate,
    filterPassedTime,
    setEndDate,
    filterPassedSelectedTime,
    handleEmotePick,
    createSurvey,
    buttonDisable,
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
            onChange={handleChangeTitle}
          />
          <div className="mt-10 mb-4 block text-left font-semibold">
            Select duration of survey
          </div>
          <div className="flex flex-col items-center justify-center space-y-4 md:flex-row md:space-y-0">
            <DatePicker
              className="focus:shadow-outline mr-auto block w-full cursor-pointer rounded-lg py-3 px-4 text-center font-medium leading-none text-zinc-600 shadow-sm focus:outline-none md:w-52"
              selected={startDate}
              onChange={(date) => {
                if (!date) return;
                return setStartDate(date);
              }}
              calendarStartDay={1}
              dateFormat="dd/MM/yyyy HH:mm"
              timeFormat="HH:mm"
              showTimeSelect
              timeIntervals={5}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              showPreviousMonths={false}
              filterTime={filterPassedTime}
            />
            <p>to</p>
            <DatePicker
              className="focus:shadow-outline ml-auto block w-full cursor-pointer rounded-lg py-3 px-4 text-center font-medium leading-none text-zinc-600 shadow-sm focus:outline-none md:w-52"
              selected={endDate}
              onChange={(date) => {
                if (!date) return;
                return setEndDate(date);
              }}
              calendarStartDay={1}
              dateFormat="dd/MM/yyyy HH:mm"
              timeFormat="HH:mm"
              showTimeSelect
              timeIntervals={5}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              showPreviousMonths={false}
              filterTime={filterPassedSelectedTime}
            />
          </div>

          <div className="mt-10">
            <div className="mb-4 block text-left font-semibold">
              Click on icon to change
            </div>

            <div className="flex w-full justify-between">
              {pack.map((emote, idx) => (
                <EmojiPicker
                  key={idx}
                  index={idx}
                  defaultEmote={emote}
                  onEmotePick={handleEmotePick}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              onClick={createSurvey}
              className="z-0 mt-12 w-full sm:w-auto"
              disabled={!title.length || buttonDisable}
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
