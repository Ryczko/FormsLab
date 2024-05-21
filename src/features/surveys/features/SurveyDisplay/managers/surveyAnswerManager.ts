import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { LocalStorageKeys } from 'features/surveys/constants/types';
import useLocalStorage from 'features/surveys/hooks/useLocalStorage';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { getFetch, postFetch } from '../../../../../../lib/axiosConfig';
import { SurveyWithQuestions } from 'types/SurveyWithQuestions';
import { ComparisonType, Survey } from '@prisma/client';
import { QuestionWithLogicPath } from 'types/QuestionWithLogicPath';

export type Answers = { [key: string]: string };

const DEFAULT_VALUE: string[] = [];

export type DraftQuestionWithAnswer = QuestionWithLogicPath & {
  answer?: string;
};

export type SurveyWithQuestionsAndUsersAnswers = Survey & {
  questions: DraftQuestionWithAnswer[];
};

export const useSurveyAnswerManager = (
  initialData: SurveyWithQuestions,
  previewMode: boolean,
  restartTrigger?: number
) => {
  const router = useRouter();
  const { t } = useTranslation('survey');

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isSurveyFinished, setIsSurveyFinished] = useState(false);

  const { surveyId } = router.query as { surveyId: string };

  const [formData, setFormData] =
    useState<SurveyWithQuestionsAndUsersAnswers>(initialData);

  const [isAnswering, setIsAnswering] = useState(false);
  const [localStorageValue, setLocalStorageValue] = useLocalStorage<string[]>(
    DEFAULT_VALUE,
    LocalStorageKeys.LocalStorageKey
  );

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [previousQuestions, setPreviousQuestions] = useState<number[]>([]);

  useEffect(() => {
    if (previewMode) {
      setFormData(initialData);
      setIsSubmitted(false);

      const questionsCount = initialData.questions.length;

      if (questionsCount <= activeQuestionIndex && questionsCount > 0) {
        setActiveQuestionIndex(questionsCount - 1);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData, previewMode]);

  useEffect(() => {
    if (restartTrigger) {
      restartSurvey();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restartTrigger]);

  const restartSurvey = () => {
    setFormData(initialData);
    setActiveQuestionIndex(0);
    setPreviousQuestions([]);
    setIsSubmitted(false);
    setIsSurveyFinished(false);
  };

  const handleNextQuestion = () => {
    setIsSubmitted(true);

    if (isAnswerValid(activeQuestionIndex) && formData?.questions) {
      const activeQuestion = formData?.questions[activeQuestionIndex];

      setPreviousQuestions((previousQuestions) => [
        ...previousQuestions,
        activeQuestionIndex,
      ]);

      for (let i = 0; i < activeQuestion.logicPaths.length; i++) {
        const path = activeQuestion.logicPaths[i];

        const equalCondition =
          path.comparisonType === ComparisonType.EQUAL &&
          activeQuestion.answer &&
          path.selectedOption === activeQuestion.answer;

        const submitCondition =
          path.comparisonType === ComparisonType.SUBMITTED;

        const greatThanCondition =
          path.comparisonType === ComparisonType.GREATER_THAN &&
          activeQuestion.answer &&
          path.selectedOption &&
          Number(activeQuestion.answer) > Number(path.selectedOption);

        const lessThanCondition =
          path.comparisonType === ComparisonType.LESS_THAN &&
          activeQuestion.answer &&
          path.selectedOption &&
          Number(activeQuestion.answer) < Number(path.selectedOption);

        if (
          equalCondition ||
          submitCondition ||
          greatThanCondition ||
          lessThanCondition
        ) {
          if (path.endSurvey) {
            handleSave(false);
            return;
          }

          const nextQuestionIndex = formData?.questions.findIndex(
            (question) => question.id === path.nextQuestionId
          );
          setActiveQuestionIndex(
            nextQuestionIndex !== -1
              ? nextQuestionIndex
              : activeQuestionIndex + 1
          );
          setIsSubmitted(false);

          return;
        }
      }

      if (activeQuestionIndex < formData?.questions.length - 1) {
        setActiveQuestionIndex((prev) => prev + 1);
        setIsSubmitted(false);
      } else {
        handleSave(false);
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (previousQuestions.length > 0) {
      const lastQuestionIndex = previousQuestions[previousQuestions.length - 1];
      setActiveQuestionIndex(lastQuestionIndex);
      setPreviousQuestions((previousQuestions) =>
        previousQuestions.filter(
          (questionIndex) => questionIndex !== lastQuestionIndex
        )
      );
    }
  };

  const isAnswerValid = (index: number) => {
    if (formData?.questions[index].isRequired) {
      return !!formData?.questions[index].answer?.trim();
    }
    return true;
  };

  useEffect(() => {
    if (
      !process.env.NEXT_PUBLIC_ALLOW_MULTIPLE_ANSWERS &&
      localStorageValue.includes(surveyId) &&
      !isAnswering &&
      !isSurveyFinished
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

  const handleSave = async (validateAllForm = true) => {
    setIsSubmitted(true);

    if (validateAllForm && !isAnswersValid()) return;

    if (previewMode) {
      setIsAnswering(true);

      //to simulate real request
      setTimeout(() => {
        setIsSurveyFinished(true);
        setIsAnswering(false);
      }, 600);
      return;
    }

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
        setIsSurveyFinished(true);
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
    previewMode,
    isSurveyFinished,
    restartSurvey,
  };
};

export type SurveyAnswerManager = ReturnType<typeof useSurveyAnswerManager>;
