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
  const [allowAdd, setAllowAdd] = useState(true);
  const [allowRemove, setAllowRemove] = useState(true);

  const { user } = useApplicationContext();
  const [isCreating, setIsCreating] = useState(false);

  const router = useRouter();
  const { copy } = useCopyToClipboard();

  // Move to useState initial value when bug in emoji library will be solved:
  // https://github.com/ealush/emoji-picker-react/issues/329
  useEffect(() => {
    setPack(['1f603', '1f642', '1f641', '1f621']);
  }, []);

  useEffect(() => {
    if (pack.length === 2) {
      return setAllowRemove(false);
    }
    if (pack.length === 8) {
      return setAllowAdd(false);
    }

    setAllowRemove(true);
    setAllowRemove(true);
  }, [pack]);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  const handleEmotePick = (index: number, newEmote: string) => {
    setPack((oldPack) => {
      oldPack.splice(index, 1, newEmote);
      return oldPack;
    });
  };

  const handleAddingNewEmote = (newEmote: string) => {
    if (pack.includes(newEmote)) return;
    setPack((oldPack) => [...oldPack, newEmote]);
  };

  const handleEmoteRemove = (index: number) => {
    setPack((oldPack) => {
      return oldPack.filter((pack, idx) => idx !== index);
    });
  };

  const createSurvey = async () => {
    if (!title) return setError('Required field');

    setIsCreating(true);

    try {
      const newSurvey = await addDoc(collection(db, 'surveys'), {
        title,
        pack,
        isActive: true,
        creatorId: user?.uid,
        createDate: new Date(),
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

  return {
    title,
    error,
    pack,
    allowAdd,
    allowRemove,
    handleChangeTitle,
    handleEmotePick,
    handleEmoteRemove,
    handleAddingNewEmote,
    createSurvey,
    isCreating,
  };
};
