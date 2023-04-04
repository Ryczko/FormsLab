import { getDoc, doc, addDoc, collection } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { db } from 'firebaseConfiguration';
import { LocalStorageKeys } from 'features/surveys/constants/types';
import useLocalStorage from 'features/surveys/hooks/useLocalStorage';

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
    if (localStorageValue.includes(surveyId) && !isAnswering) {
      router.replace('/');
      toast.success('You have answered this survey');
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
        toast.error('Survey ID not found');
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
        toast.success('The reply has been sent');
      } else {
        await router.replace('/');
        toast.error('The survey is no longer active.');
      }
    } catch (error) {
      toast.error('Error occured');
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
