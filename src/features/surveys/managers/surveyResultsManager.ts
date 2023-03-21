import { useCallback } from 'react';

import {
  getDoc,
  doc,
  collection,
  query,
  orderBy,
  getDocs,
  Timestamp,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { db } from 'src/firebase';
import useCopyToClipboard from 'src/shared/hooks/useCopyToClipboard';
import { formatFirebaseDateWithHours } from 'src/shared/utilities/convertTime';
import { BarChartData } from '../components/BarChart/BarChart';
import { AnswerData } from '../interfaces/AnswerData';

export const useSurveyResultsManager = () => {
  const router = useRouter();
  const { surveyId } = router.query as { surveyId: string };

  const [votes, setVotes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('-');
  const [endDate, setEndDate] = useState('-');
  const [answersData, setAnswersData] = useState<AnswerData[]>([]);
  const [, copy] = useCopyToClipboard();

  const getSurveyData = useCallback(
    async (displayMessages = false) => {
      const surveyData = await getDoc(doc(db, 'surveys', surveyId!));
      if (!surveyData.exists()) {
        router.replace('/');
        return;
      }
      const anserwsCollectionRef = collection(
        db,
        'surveys',
        surveyId!,
        'answers'
      );
      const anserwsQuery = query(
        anserwsCollectionRef,
        orderBy('answerDate', 'desc')
      );

      const answersData = await getDocs(anserwsQuery);
      setVotes(answersData.docs.length);

      setStartDate(
        formatFirebaseDateWithHours(surveyData.data()?.startDate as Timestamp)
      );
      setEndDate(
        formatFirebaseDateWithHours(surveyData.data()?.endDate as Timestamp)
      );

      setTitle(surveyData.data()?.title);
      const data = answersData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        answerDate: formatFirebaseDateWithHours(
          doc.data().answerDate as Timestamp
        ),
      })) as AnswerData[];

      if (displayMessages) {
        toast.success('Data has been refreshed');
      }
      setAnswersData(data);
      setIsLoading(false);
    },
    [surveyId, router]
  );

  useEffect(() => {
    if (!surveyId) {
      router.replace('/');
      return;
    }

    getSurveyData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDataToChart = (): BarChartData[] => {
    if (!answersData.length) {
      return [];
    }

    const uniqueAnswers = Array.from(
      new Set(answersData.map((a) => a.selectedIcon))
    );

    const result = {};

    uniqueAnswers.forEach((answer) => {
      result[answer] = 0;
    });

    answersData.forEach((answer) => {
      result[answer.selectedIcon] += 1;
    });

    return Object.keys(result)
      .map((key) => ({
        name: key,
        value: result[key],
      }))
      .sort((a, b) => b.value - a.value);
  };

  const chartData = getDataToChart();

  const handleCopyLink = (id: string) => () => {
    const domain =
      window.location.hostname === 'localhost' ? 'http://' : 'https://';
    const link = `${domain}${window.location.host}/survey/${id}`;
    copy(link);
    toast.success('Link copied to clipboard');
  };

  return {
    isLoading,
    title,
    handleCopyLink,
    surveyId,
    answersData,
    getSurveyData,
    chartData,
    votes,
    startDate,
    endDate,
  };
};
