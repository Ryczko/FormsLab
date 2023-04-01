import { useCallback, useState, useEffect } from 'react';
import {
  getDoc,
  doc,
  collection,
  query,
  orderBy,
  getDocs,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { BarChartData } from 'features/surveys/components/BarChart/BarChart';
import { AnswerData } from 'features/surveys/interfaces/AnswerData';
import {
  formatDateDistance,
  formatFirebaseDateWithHours,
} from 'shared/utilities/convertTime';
import useCopyToClipboard from 'shared/hooks/useCopyToClipboard';
import { db } from 'firebaseConfiguration';

export const useSurveyResultsManager = () => {
  const router = useRouter();
  const { surveyId } = router.query as { surveyId: string };

  const [votes, setVotes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [createDate, setCreateDate] = useState<string>('');
  const [answersData, setAnswersData] = useState<AnswerData[]>([]);
  const [chartData, setChartData] = useState<BarChartData[]>([]);
  const [isSurveyActive, setIsSurveyActive] = useState<boolean>(false);
  const [showOnlyWithExtraFeedback, setShowOnlyWithExtraFeedback] =
    useState(false);

  const [filteredAnswersData, setFilteredAnswersData] = useState<AnswerData[]>(
    []
  );

  const { copy } = useCopyToClipboard();

  const getSurveyData = useCallback(
    async (displayMessages = false) => {
      const surveyData = await getDoc(doc(db, 'surveys', surveyId));
      if (!surveyData.exists()) {
        router.replace('/');
        return;
      }
      const anserwsCollectionRef = collection(
        db,
        'surveys',
        surveyId,
        'answers'
      );
      const anserwsQuery = query(
        anserwsCollectionRef,
        orderBy('answerDate', 'desc')
      );

      const answersData = await getDocs(anserwsQuery);
      setVotes(answersData.docs.length);

      setIsSurveyActive(surveyData.data()?.isActive);
      setCreateDate(
        formatFirebaseDateWithHours(surveyData.data()?.createDate as Timestamp)
      );

      setTitle(surveyData.data()?.title);
      const data = answersData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        answerDate: formatDateDistance(doc.data().answerDate as Timestamp),
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

  useEffect(() => {
    const updateSurveyStatus = async () => {
      await updateDoc(doc(db, 'surveys', surveyId), {
        isActive: isSurveyActive,
      });
    };

    updateSurveyStatus();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSurveyActive]);

  const getDataToChart = useCallback((): BarChartData[] => {
    if (!answersData.length) {
      return [];
    }

    const uniqueAnswers = Array.from(
      new Set(answersData.map((a) => a.selectedIcon))
    );

    const result: {
      [key: string]: number;
    } = {};

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
  }, [answersData]);

  useEffect(() => {
    setChartData(getDataToChart());
  }, [answersData, getDataToChart]);

  useEffect(() => {
    const filtered = showOnlyWithExtraFeedback
      ? answersData.filter((answer) => answer.answer.trim() !== '')
      : answersData;
    setFilteredAnswersData(filtered);
  }, [answersData, showOnlyWithExtraFeedback]);

  const navigateToSurveys = useCallback(
    () => router.push('/surveys'),
    [router]
  );

  const handleCopyLink = (id: string) => () => {
    const domain =
      window.location.hostname === 'localhost' ? 'http://' : 'https://';
    const link = `${domain}${window.location.host}/survey/${id}`;
    copy(link);
  };

  return {
    isLoading,
    title,
    handleCopyLink,
    surveyId,
    getSurveyData,
    chartData,
    isSurveyActive,
    setIsSurveyActive,
    votes,
    createDate,
    showOnlyWithExtraFeedback,
    filteredAnswersData,
    setShowOnlyWithExtraFeedback,
    navigateToSurveys,
  };
};
