import { addDoc, collection } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useApplicationContext } from 'features/application/context';
import { db } from 'firebaseConfiguration';
import useCopyToClipboard from 'shared/hooks/useCopyToClipboard';

export const useCreateSurveyManager = () => {
  const [title, setTitle] = useState('');
  const [pack, setPack] = useState<string[]>([]);
  const [error, setError] = useState('');

  const { user } = useApplicationContext();
  const [isCreating, setIsCreating] = useState(false);

  const router = useRouter();
  const { copy } = useCopyToClipboard();

  // Move to useState initial value when bug in emoji library will be solved:
  // https://github.com/ealush/emoji-picker-react/issues/329
  useEffect(() => {
    setPack(['1f603', '1f642', '1f641', '1f621']);
  }, []);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  const handleEmotePick = (index: number, newEmote: string) => {
    setPack((oldPack) => {
      oldPack.splice(index, 1, newEmote);
      return oldPack;
    });
  };

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(
    new Date(new Date().setDate(new Date().getDate() + 1))
  );

  useEffect(() => {
    if (startDate > endDate) {
      setStartDate(endDate);
      setEndDate(startDate);
    }
  }, [startDate, endDate]);

  const createSurvey = async () => {
    if (!title) return setError('Required field');

    setIsCreating(true);

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
      const copiedCorrectly = await copy(link, true);
      await router.push(`/survey/answer/${newSurvey.id}`);
      toast.success(
        `Survey created succesfully ${
          copiedCorrectly ? 'and link copied to clipboard' : ''
        }`
      );
    } catch (error) {
      toast.error('Survey creation failed');
    }
    setIsCreating(false);
  };

  const filterPassedTime = (time: string | number | Date) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const filterPassedSelectedTime = (time: string | number | Date) => {
    const currentDate = startDate;
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };
  return {
    title,
    error,
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
    isCreating,
  };
};
