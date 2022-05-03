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
import DatePicker from '../../Components/DatePicker';

function SurveyCreatePage() {
  useDocumentTitle('Create Survey');
  const [title, setTitle] = useState('');
  const [pack, setPack] = useState(['😃', '🙂', '🙁', '😡']);

  const [user] = useAuthState(auth);
  const [buttonDisable, setButtonDisable] = useState(false);

  const navigate = useNavigate();
  const [, copy] = useCopyToClipboard();
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());

  const handleChangeTitle = (e: any) => {
    setTitle(e.target.value);
  };

  const handleEmotePick = (index: number, newEmote: string) => {
    setPack((oldPack) => {
      oldPack.splice(index, 1, newEmote);
      return oldPack;
    });
  };

  const [startDate, setStartDate] = useState(new Date()) as any;
  const [endDate, setEndDate] = useState(
    new Date().setMonth(startDate.getMonth() + 1)
  );

  useEffect(() => {
    if (startDate > endDate) setStartDate(endDate);
  }, [endDate]);

  useEffect(() => {
    if (startDate > endDate) setEndDate(startDate);
  }, [startDate]);

  const createSurvey = async () => {
    setButtonDisable(true);
    try {
      const newSurvey = await addDoc(collection(db, 'surveys'), {
        title,
        pack,
        creatorId: user?.uid,
        startDate: selectedStartDate,
        endDate: selectedEndDate,
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

  return (
    <div className="container px-4 m-auto text-center md:px-8">
      <Header>Create new survey</Header>

      <div className="max-w-lg mx-auto mt-8">
        <Input
          label="Survey title"
          placeholder="Title..."
          value={title}
          onChange={handleChangeTitle}
        />
        <label className="block mt-10 mb-4 font-semibold text-left">Select duration of survey</label>
        <div className="flex flex-col items-center justify-center space-y-4 md:space-y-0 md:space-x-8 md:flex-row">
          <DatePicker
            selectedDate={selectedStartDate}
            setSelectedDate={setSelectedStartDate}
          />
          <DatePicker
            selectedDate={selectedEndDate}
            setSelectedDate={setSelectedEndDate}
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

export default SurveyCreatePage;
