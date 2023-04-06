import DatePicker from 'react-datepicker';

import withAnimation from '../../../shared/HOC/withAnimation';
import withProtectedRoute from '../../../shared/HOC/withProtectedRoute';
import Head from 'next/head';
import Button, { ButtonVariant } from 'src/shared/components/Button/Button';
import Header from 'src/shared/components/Header/Header';
import Input from 'src/shared/components/Input/Input';
import EmojiPicker from 'src/features/surveys/components/EmojiPicker/EmojiPicker';
import { useCreateSurveyManager } from 'src/features/surveys/managers/createSurveyManager';

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
  } = useCreateSurveyManager();

  return (
    <>
      <Head>
        <title>Create Survey</title>
        <meta name="description" content="Create Survey - Employee Pulse" />
      </Head>
      <div className="container px-4 m-auto text-center md:px-8">
        <Header>Create new survey</Header>

        <div className="mx-auto max-w-lg">
          <Input
            label="Survey title"
            placeholder="Title..."
            value={title}
            onChange={handleChangeTitle}
          />
          <label className="block mt-10 mb-4 font-semibold text-left">
            Select duration of survey
          </label>
          <div className="flex flex-col justify-center items-center space-y-4 md:flex-row md:space-y-0">
            <DatePicker
              className="block py-3 px-4 mr-auto w-full font-medium leading-none text-center text-zinc-600 rounded-lg focus:outline-none shadow-sm cursor-pointer md:w-52 focus:shadow-outline"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
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
              className="block py-3 px-4 ml-auto w-full font-medium leading-none text-center text-zinc-600 rounded-lg focus:outline-none shadow-sm cursor-pointer md:w-52 focus:shadow-outline"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
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
            <label className="block mb-4 font-semibold text-left">
              Click on icon to change
            </label>

            <div className="flex justify-between w-full">
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
          <Input
            label="Tell Us More"
            placeholder="Tell Us More"
          />
          

          <Button
            onClick={createSurvey}
            className="z-0 mt-12 w-full sm:w-auto"
            disabled={!title.length || buttonDisable}
            variant={ButtonVariant.PRIMARY}
          >
            Create
          </Button>
        </div>
      </div>
    </>
  );
}

export default withProtectedRoute(withAnimation(SurveyCreatePage));
