import { addDoc, collection } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import toast from 'react-hot-toast';

import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';

import { auth, db } from '../../../firebase';
import withAnimation from '../../../HOC/withAnimation';
import useCopyToClipboard from '../../../hooks/useCopyToClipboard';
import withProtectedRoute from '../../../HOC/withProtectedRoute';
import Head from 'next/head';
import Button, { ButtonVariant } from 'src/components/Button/Button';
import Header from 'src/components/Header/Header';
import Input from 'src/components/Input/Input';
import EmojiPicker from 'src/components/EmojiPicker/EmojiPicker';

function SurveyCreatePage() {
  const [title, setTitle] = useState('');
  const [pack, setPack] = useState(['😃', '🙂', '🙁', '😡']);

  const [user] = useAuthState(auth);
  const [buttonDisable, setButtonDisable] = useState(false);

  const router = useRouter();
  const [, copy] = useCopyToClipboard();

  const handleChangeTitle = (e: any) => {
    setTitle(e.target.value);
  };

  const handleEmotePick = (index: number, newEmote: string) => {
    setPack((oldPack) => {
      oldPack.splice(index, 1, newEmote);
      return oldPack;
    });
  };

  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(
    new Date(new Date().setDate(new Date().getDate() + 1)) as any
  );

  useEffect(() => {
    if (startDate! > endDate!) {
      setStartDate(endDate);
      setEndDate(startDate);
    }
  }, [startDate, endDate]);

  const createSurvey = async () => {
    setButtonDisable(true);
    try {
      const newSurvey = await addDoc(collection(db, 'surveys'), {
        title,
        pack,
        creatorId: user?.uid,
        startDate,
        endDate,
      });
      const domain =
        window.location.hostname === 'localhost' ? 'http://' : 'https://';
      const link = `${domain}${window.location.host}/survey/${newSurvey.id}`;
      copy(link);
      toast.success('Survey created and link copied to clipboard');

      router.push(`/survey/answer/${newSurvey.id}`);
    } catch (error) {
      toast.error('Survey creation failed');
    }
    setButtonDisable(false);
  };

  const filterPassedTime = (time: string | number | Date) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const filterPassedSelectedTime = (time: string | number | Date) => {
    const currentDate = startDate;
    const selectedDate = new Date(time);

    return currentDate!.getTime() < selectedDate.getTime();
  };

  return (
    <>
      <Head>
        <title>Create Survey</title>
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
          <label className="mt-10 mb-4 block text-left font-semibold">
            Select duration of survey
          </label>
          <div className="flex flex-col items-center justify-center space-y-4 md:flex-row md:space-y-0">
            <DatePicker
              className="focus:shadow-outline mr-auto block w-full cursor-pointer rounded-lg py-3 px-4 text-center font-medium leading-none text-zinc-600 shadow-sm focus:outline-none md:w-52"
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
              className="focus:shadow-outline ml-auto block w-full cursor-pointer rounded-lg py-3 px-4 text-center font-medium leading-none text-zinc-600 shadow-sm focus:outline-none md:w-52"
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
            <label className="mb-4 block text-left font-semibold">
              Click on icon to change
            </label>

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
