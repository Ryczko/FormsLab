import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { LocalStorageKeys } from 'features/surveys/constants/types';
import useLocalStorage from 'features/surveys/hooks/useLocalStorage';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { getFetch, postFetch } from '../../../../lib/axiosConfig';
import { SurveyWithQuestions } from 'types/SurveyWithQuestions';

const DEFAULT_VALUE: string[] = [];

export const useSurveyAnswerManager = (initialData: SurveyWithQuestions) => {
  const router = useRouter();
  const [showEmojiError, setShowEmojiError] = useState(false);
  const { surveyId } = router.query as { surveyId: string };

  const [isSurveyActive, setIsSurveyActive] = useState<boolean>(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [icons, setIcons] = useState<string[]>([]);
  const [selectedIcon, setSelectedIcon] = useState('');
  const [buttonDisable, setButtonDisable] = useState(false);
  const [isAnswering, setIsAnswering] = useState(false);
  const [localStorageValue, setLocalStorageValue] = useLocalStorage<string[]>(
    DEFAULT_VALUE,
    LocalStorageKeys.LocalStorageKey
  );
  const { t } = useTranslation('survey');

  const getSurveyData = useCallback(async () => {
    if (!initialData.isActive) {
      router.replace('/');
      return;
    } else {
      setIsSurveyActive(true);
      setQuestion(initialData.title);
      setIcons(initialData.questions[0].options);
    }
  }, [router, initialData]);

  useEffect(() => {
    if (surveyId) {
      getSurveyData();
    }
    if (
      process.env.NEXT_PUBLIC_BLOCK_MULTIPLE_ANSWERS &&
      localStorageValue.includes(surveyId) &&
      !isAnswering
    ) {
      router.replace('/');
      toast.success(t('alreadyAnswered'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorageValue]);

  const handleIconClick = (icon: string) => {
    setSelectedIcon(icon);
    setShowEmojiError(false);
  };

  const handleSave = async () => {
    if (!selectedIcon) {
      setShowEmojiError(true);
      return;
    } else {
      setShowEmojiError(false);
      setButtonDisable(true);
      setIsAnswering(true);
    }

    try {
      if (!surveyId) {
        toast.error(t('surveyIdNotFound'));
        throw new Error('Survey ID not found');
      }

      const survey = await getFetch<SurveyWithQuestions>(
        `/api/answer/${surveyId}`
      );

      if (survey.isActive) {
        await postFetch(`/api/answer/${surveyId}`, {
          answersData: [
            {
              questionId: survey.questions[0].id,
              answer: selectedIcon,
            },
          ],
        });

        setLocalStorageValue([...localStorageValue, surveyId]);
        await router.replace('/');
        toast.success(t('successfullSubmit'));
      } else {
        await router.replace('/');
        toast.error(t('surveyInactive'));
      }
    } catch (error) {
      toast.error(t('unSuccessfullSubmit'));
    } finally {
      setButtonDisable(false);
      setIsAnswering(false);
    }
  };

  const handleInputAnswer = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
  };

  return {
    isSurveyActive,
    question,
    icons,
    selectedIcon,
    handleIconClick,
    answer,
    handleInputAnswer,
    buttonDisable,
    handleSave,
    isAnswering,
    showEmojiError,
  };
};
