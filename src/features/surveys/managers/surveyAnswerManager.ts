import { getDoc, doc, addDoc, collection } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { db } from 'firebaseConfiguration';
import { LocalStorageKeys } from 'features/surveys/constants/types';
import useLocalStorage from 'features/surveys/hooks/useLocalStorage';
import useTranslation from 'next-translate/useTranslation';

const DEFAULT_VALUE: string[] = [];

export const useSurveyAnswerManager = () => {
  const router = useRouter();
  const [showEmojiError, setShowEmojiError] = useState(false);
  const { surveyId } = router.query as { surveyId: string };

  const [isSurveyActive, setIsSurveyActive] = useState<boolean>(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [icons, setIcons] = useState<string[]>([]);
  const [selectedIcon, setSelectedIcon] = useState('');
  const [buttonDisable, setButtonDisable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnswering, setIsAnswering] = useState(false);
  const [localStorageValue, setLocalStorageValue] = useLocalStorage<string[]>(
    DEFAULT_VALUE,
    LocalStorageKeys.LocalStorageKey
  );
  const { t } = useTranslation('survey');

  const getSurveyData = useCallback(async () => {
    const surveyData = await getDoc(doc(db, 'surveys', surveyId));
    if (!surveyData.exists()) {
      router.replace('/');
      return;
    }

    if (!surveyData.data()?.isActive) {
      setIsSurveyActive(false);
    } else {
      setIsSurveyActive(true);
      setQuestion(surveyData.data()?.title);
      setIcons(surveyData.data()?.pack);
    }
    setIsLoading(false);
  }, [router, surveyId]);

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

      const survey = await getDoc(doc(db, 'surveys', surveyId));

      if (survey.data()?.isActive) {
        await addDoc(collection(db, 'surveys', surveyId, 'answers'), {
          selectedIcon,
          answer,
          answerDate: new Date(),
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
    isLoading,
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
