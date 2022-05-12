import { addDoc, collection } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Button, { ButtonVariant } from '../../Components/Button';
import EmojiPicker from '../../Components/EmojiPicker';
import Input from '../../Components/Input';
import { auth, db } from '../../firebase';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useCopyToClipboard from '../../Hooks/useCopyToClipboard';
import { useDocumentTitle } from '../../Hooks/useDocumentTitle';
import Header from '../../Components/Header';
import withAnimation from '../../HOC/withAnimation';
import DatePicker from 'react-datepicker';
import '../../datepicker.scss';

function SurveyCreatePage() {
  useDocumentTitle('Create Survey');
  const [title, setTitle] = useState('');
  const [pack, setPack] = useState(['😃', '🙂', '🙁', '😡']);

  const [user] = useAuthState(auth);
  const [buttonDisable, setButtonDisable] = useState(false);

  const navigate = useNavigate();
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

      navigate(`/survey/answer/${newSurvey.id}`);
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
    <div className="container px-4 m-auto text-center md:px-8">
      <Header>Create new survey</Header>

      <div className="max-w-lg mx-auto">
        <Input
          label="Survey title"
          placeholder="Title..."
          value={title}
          onChange={handleChangeTitle}
        />
        <label className="block mt-10 mb-4 font-semibold text-left">
          Select duration of survey
        </label>
        <div className="flex flex-col items-center justify-center space-y-4 md:space-y-0 md:flex-row">
          <DatePicker
            className="w-full md:w-52 block text-center mr-auto py-3 px-4 font-medium leading-none rounded-lg shadow-sm cursor-pointer focus:outline-none focus:shadow-outline text-zinc-600"
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
            className="w-full md:w-52 text-center block py-3 ml-auto px-4 font-medium leading-none rounded-lg shadow-sm cursor-pointer focus:outline-none focus:shadow-outline text-zinc-600"
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

        <Button
          onClick={createSurvey}
          className="z-0 w-full mt-12 sm:w-auto"
          disabled={!title.length || buttonDisable}
          variant={ButtonVariant.PRIMARY}
        >
          Create
        </Button>
      </div>
    </div>
  );
}

export default withAnimation(SurveyCreatePage);
