import { addDoc, collection } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useApplicationContext } from 'src/features/application/context';
import { db } from 'src/firebase';
import useCopyToClipboard from 'src/shared/hooks/useCopyToClipboard';

export const useCreateSurveyManager = () => {
  const [title, setTitle] = useState('');
  const [pack, setPack] = useState(['😃', '🙂', '🙁', '😡']);

  const { user } = useApplicationContext();
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
      router.push(`/survey/answer/${newSurvey.id}`);

      toast.success('Survey created and link copied to clipboard');
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
  return {
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
  };
};
