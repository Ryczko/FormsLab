import { useCallback, useState, useEffect } from 'react';

import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

import useCopyToClipboard from 'shared/hooks/useCopyToClipboard';

import useTranslation from 'next-translate/useTranslation';
import { getFetch, patchFetch } from '../../../../../../lib/axiosConfig';
import { SurveyWithAnswers } from 'types/SurveyWithAnswers';
import { QuestionType } from '@prisma/client';
import { MappedAnswers } from 'types/MappedAnswers';
import { useApplicationContext } from 'features/application/context';
import { Page } from 'features/application/types/Page';

export const useSurveyResultsManager = (initialData: SurveyWithAnswers) => {
  const { setActivePage } = useApplicationContext();

  const router = useRouter();
  const { surveyId } = router.query as { surveyId: string };

  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const [isStatusLoading, setIsStatusLoading] = useState<boolean>(false);
  const [surveyData, setSurveyData] = useState<SurveyWithAnswers>();
  const [mappedAnswersData, setMappedAnswersData] = useState<MappedAnswers>({});

  const { copy } = useCopyToClipboard();
  const { t } = useTranslation('surveyAnswer');

  const fillSurveyData = useCallback((surveyData: SurveyWithAnswers) => {
    const mappedDataByQuestion: MappedAnswers = {};

    surveyData.answers.forEach((answer) => {
      answer.answerData.forEach((answerData) => {
        const existingQuestion = mappedDataByQuestion[answerData.questionId];
        if (existingQuestion) {
          existingQuestion.answers.push({
            id: answerData.id,
            date: answer.createdAt,
            answer: answerData.providedAnswer ?? undefined,
          });
        } else {
          const questionData = surveyData.questions.find(
            (q) => q.id === answerData.questionId
          );
          mappedDataByQuestion[answerData.questionId] = {
            questionType: questionData?.type as QuestionType,
            question: questionData?.title as string,
            options: questionData?.options ?? [],
            answers: [
              {
                id: answerData.id,
                answer: answerData.providedAnswer ?? undefined,
                date: answer.createdAt,
              },
            ],
          };
        }
      });
    });

    setSurveyData(surveyData);
    setMappedAnswersData(mappedDataByQuestion);
  }, []);

  const getSurveyData = useCallback(async () => {
    setIsDataLoading(true);
    const surveyData = await getFetch<SurveyWithAnswers>(
      `/api/survey/${surveyId}`
    );

    if (!surveyData) {
      router.replace('/');
      return;
    }

    fillSurveyData(surveyData);
    setIsDataLoading(false);

    toast.success(t('refreshSuccess'));
  }, [surveyId, router, t, fillSurveyData]);

  const updateSurveyStatus = useCallback(async () => {
    setIsStatusLoading(true);
    try {
      const surveyResult = await patchFetch(`/api/survey/${surveyId}`, {
        actionType: 'UPDATE_ACTIVE',
        isActive: !surveyData?.isActive,
      });
      setSurveyData((prev) =>
        prev ? { ...prev, isActive: !!surveyResult?.isActive } : prev
      );
    } catch (_err) {
      toast.error(t('updateStatusFailure'));
    }
    setIsStatusLoading(false);
  }, [setIsStatusLoading, setSurveyData, surveyData, surveyId, t]);

  useEffect(() => {
    setActivePage(Page.SURVEYS_RESULTS);

    if (!surveyId) {
      router.replace('/');
      return;
    }

    fillSurveyData(initialData);

    return () => {
      setActivePage(undefined);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCopyLink = (id: string) => () => {
    const link = `${window.location.protocol}//${window.location.host}/survey/${id}`;
    copy(link);
  };

  const onRemoveSuccess = async () => {
    await router.replace('/surveys');
  };

  return {
    handleCopyLink,
    surveyId,
    getSurveyData,
    surveyData,
    mappedAnswersData,
    isDataLoading,
    isStatusLoading,
    onRemoveSuccess,
    updateSurveyStatus,
  };
};

export type SurveyResultsManager = ReturnType<typeof useSurveyResultsManager>;
