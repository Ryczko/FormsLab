import { getDoc, doc, addDoc, collection } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { db } from 'firebaseConfiguration';

export const useSurveyAnswerManager = () => {
  const router = useRouter();

  const { surveyId } = router.query as { surveyId: string };

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [icons, setIcons] = useState<string[]>([]);
  const [selectedIcon, setSelectedIcon] = useState('');
  const [buttonDisable, setButtonDisable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnswering, setIsAnswering] = useState(false);

  const getSurveyData = useCallback(async () => {
    const surveyData = await getDoc(doc(db, 'surveys', surveyId));
    if (!surveyData.exists()) {
      router.replace('/');
      return;
    }

    if (
      surveyData.data()?.startDate.toDate().toISOString() >
      new Date().toISOString()
    ) {
      toast.error('Survey is not opened yet');
      router.replace('/');
      return;
    }

    if (
      surveyData.data()?.endDate.toDate().toISOString() <
      new Date().toISOString()
    ) {
      toast.error('Survey is closed');
      router.replace('/');
      return;
    }

    setQuestion(surveyData.data()?.title);
    setIcons(surveyData.data()?.pack);
    setIsLoading(false);
  }, [router, surveyId]);

  useEffect(() => {
    if (surveyId) {
      getSurveyData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleIconClick = (icon: string) => {
    setSelectedIcon(icon);
  };

  const handleSave = async () => {
    setButtonDisable(true);
    setIsAnswering(true);

    try {
      if (!surveyId) {
        toast.error('Survey ID not found');
        throw new Error('Survey ID not found');
      }
      await addDoc(collection(db, 'surveys', surveyId, 'answers'), {
        selectedIcon,
        answer,
        answerDate: new Date(),
      });
      await router.replace('/');
      toast.success('The reply has been sent');
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
    question,
    icons,
    selectedIcon,
    handleIconClick,
    answer,
    handleInputAnswer,
    buttonDisable,
    handleSave,
    isAnswering,
  };
};
