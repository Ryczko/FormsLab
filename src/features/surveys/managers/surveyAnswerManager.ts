import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { LocalStorageKeys } from 'features/surveys/constants/types';
import useLocalStorage from 'features/surveys/hooks/useLocalStorage';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { getFetch, postFetch } from '../../../../lib/axiosConfig';
import { SurveyWithQuestions } from 'types/SurveyWithQuestions';
import { Question, Survey } from '@prisma/client';

export type Answers = { [key: string]: string };

const DEFAULT_VALUE: string[] = [];

export type SurveyWithQuestionsAndUsersAnswers = Survey & {
  questions: (Question & { answer?: string })[];
};

export const useSurveyAnswerManager = (initialData: SurveyWithQuestions) => {
  const router = useRouter();
  const { t } = useTranslation('survey');

  const [isSubmitted, setIsSubmitted] = useState(false);

  const { surveyId } = router.query as { surveyId: string };

  const [formData, setFormData] =
    useState<SurveyWithQuestionsAndUsersAnswers>();

  const [isAnswering, setIsAnswering] = useState(false);
  const [localStorageValue, setLocalStorageValue] = useLocalStorage<string[]>(
    DEFAULT_VALUE,
    LocalStorageKeys.LocalStorageKey
  );

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  const handleNextQuestion = () => {
    setIsSubmitted(true);

    if (isAnswerValid(activeQuestionIndex) && formData?.questions) {
      if (activeQuestionIndex < formData?.questions.length - 1) {
        setActiveQuestionIndex((prev) => prev + 1);
        setIsSubmitted(false);
      } else {
        handleSave();
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (activeQuestionIndex > 0) {
      setActiveQuestionIndex((prev) => prev - 1);
    }
  };

  const isAnswerValid = (index: number) => {
    if (formData?.questions[index].isRequired) {
      return !!formData?.questions[index].answer?.trim();
    }
    return true;
  };

  useEffect(() => {
    if (surveyId) {
      setFormData(initialData);
    }
    if (
      !process.env.NEXT_PUBLIC_ALLOW_MULTIPLE_ANSWERS &&
      localStorageValue.includes(surveyId) &&
      !isAnswering
    ) {
      router.replace('/');
      toast.success(t('alreadyAnswered'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorageValue]);

  const handleAnswerChange = (answer: string, questionId: string) => {
    setFormData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        questions: prev.questions.map((question) => {
          if (question.id === questionId) {
            return { ...question, answer };
          }
          return question;
        }),
      };
    });
  };

  const isAnswersValid = () => {
    if (
      !formData?.questions
        .filter((question) => question.isRequired)
        .every((question) => question.answer)
    ) {
      toast.error(t('fillRequiredFields'));
      return false;
    }

    if (
      formData.questions.every(
        (question) => !question.answer || question.answer?.trim() === ''
      )
    ) {
      toast.error(t('atLeastOneAnswer'));
      return false;
    }

    setIsSubmitted(false);
    return true;
  };

  const handleSave = async () => {
    setIsSubmitted(true);

    if (!isAnswersValid()) return;

    setIsAnswering(true);

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
          answersData: formData?.questions.map((question) => ({
            questionId: question.id,
            answer: question.answer,
          })),
        });

        setLocalStorageValue([...localStorageValue, surveyId]);
        await router.replace(`/survey/${surveyId}/thank-you`);
        toast.success(t('successfullSubmit'));
      } else {
        setFormData((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            isActive: false,
          };
        });
        toast.error(t('surveyInactive'));
      }
    } catch (error) {
      toast.error(t('unSuccessfullSubmit'));
    } finally {
      setIsAnswering(false);
    }
  };

  return {
    handleAnswerChange,
    handleSave,
    isAnswering,
    formData,
    isSubmitted,
    activeQuestionIndex,
    handleNextQuestion,
    handlePreviousQuestion,
  };
};
