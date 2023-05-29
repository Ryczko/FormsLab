import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import useCopyToClipboard from 'shared/hooks/useCopyToClipboard';
import useTranslation from 'next-translate/useTranslation';
import { QuestionType } from '@prisma/client';
import { postFetch } from '../../../../lib/axiosConfig';

export const useCreateSurveyManager = () => {
  const [title, setTitle] = useState('');
  const [pack, setPack] = useState<string[]>([
    ':smiley:',
    ':slightly_smiling_face:',
    ':slightly_frowning_face:',
    ':rage:',
  ]);
  const [error, setError] = useState('');

  const [isCreating, setIsCreating] = useState(false);

  const router = useRouter();
  const { copy } = useCopyToClipboard();
  const { t } = useTranslation('surveyCreate');

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setError('');
    setTitle(e.target.value);
  };

  const isEmojiPicked = (emoji: string) => {
    if (pack.includes(emoji)) {
      toast.error(t('duplicatingEmoji'));
      return true;
    }

    return false;
  };

  const handleEmotePick = (index: number, newEmote: string) => {
    setPack((oldPack) => {
      const newPack = [...oldPack];

      if (!isEmojiPicked(newEmote)) {
        newPack.splice(index, 1, newEmote);
      }
      return newPack;
    });
  };

  const handleAddingNewEmote = (newEmote: string) => {
    if (!isEmojiPicked(newEmote)) {
      setPack((oldPack) => [...oldPack, newEmote]);
    }
  };

  const handleEmoteRemove = (index: number) => {
    setPack((oldPack) => oldPack.filter((pack, idx) => idx !== index));
  };

  const createSurvey = async () => {
    if (!title.trim()) return setError(t('required'));

    setIsCreating(true);

    try {
      const newSurvey = await postFetch('/api/survey', {
        title,
        questions: [
          {
            title,
            options: pack,
            type: QuestionType.EMOJI,
          },
        ],
      });

      const domain =
        window.location.hostname === 'localhost' ? 'http://' : 'https://';
      const link = `${domain}${window.location.host}/survey/${newSurvey.id}`;
      const copiedCorrectly = await copy(link, true);
      await router.push(`/survey/answer/${newSurvey.id}`);
      toast.success(
        `${t('surveyCreationSuccess')} ${
          copiedCorrectly ? t('surveyCreationSucessCopiedCorrectly') : ''
        }`
      );
    } catch (error) {
      toast.error(t('surveyCreationFailed'));
    }
    setIsCreating(false);
  };

  return {
    title,
    error,
    pack,
    handleChangeTitle,
    handleEmotePick,
    handleEmoteRemove,
    handleAddingNewEmote,
    createSurvey,
    isCreating,
  };
};
