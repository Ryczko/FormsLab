import { DownloadIcon, LinkIcon, RefreshIcon } from '@heroicons/react/outline';

import { useEffect, useState } from 'react';

import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  Timestamp,
} from 'firebase/firestore';

import toast from 'react-hot-toast';

import CsvDownload from 'react-json-to-csv';

import { useRouter } from 'next/router';

import { db } from '../../../../firebase';
import withAnimation from '../../../../HOC/withAnimation';
import useCopyToClipboard from '../../../../hooks/useCopyToClipboard';
import { formatFirebaseDateWithHours } from '../../../../utilities/convertTime';
import withProtectedRoute from '../../../../HOC/withProtectedRoute';
import Head from 'next/head';
import AnswerHeader from 'src/components/AnswerHeader/AnswerHeader';
import AnswerTableRow from 'src/components/AnswerTableRow/AnswerTableRow';
import { BarChartData } from 'src/components/BarChart/BarChart';
import Header from 'src/components/Header/Header';
import IconButton, {
  IconButtonVariant,
} from 'src/components/IconButton/IconButton';
import Loader from 'src/components/Loader/Loader';

interface AnswerData {
  id: string;
  answerDate: string;
  selectedIcon: string;
  answer: string;
}

function SurveyAnswerPage() {
  const router = useRouter();
  const { surveyId } = router.query as { surveyId: string };

  const [votes, setVotes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('-');
  const [endDate, setEndDate] = useState('-');
  const [answersData, setAnswersData] = useState<AnswerData[]>([]);
  const [, copy] = useCopyToClipboard();

  useEffect(() => {
    if (!surveyId) {
      router.replace('/');
      return;
    }

    getSurveyData();
  }, [surveyId]);

  const getSurveyData = async (displayMessages = false) => {
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
  };

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

  return (
    <>
      <Head>
        <title>Survey Answers</title>
      </Head>
      <Loader isLoading={isLoading} />
      {!isLoading && (
        <div className="container mx-auto text-center">
          <Header>Answers for &quot;{title}&quot;</Header>
          <div className="flex flex-col justify-center mb-6 sm:flex-row md:mb-10">
            <IconButton
              title="Copy link to clipboard"
              onClick={handleCopyLink(surveyId!)}
              variant={IconButtonVariant.PRIMARY}
              className="justify-center mb-2 w-full sm:mr-2 sm:mb-0 sm:w-[170px]"
              icon={<LinkIcon className="w-5 h-5" />}
            >
              Copy link
            </IconButton>
            <CsvDownload
              className="block"
              data={answersData}
              filename={`${title}.csv`}
            >
              <IconButton
                title="Download as CSV file"
                className="justify-center w-full sm:w-[170px]"
                variant={IconButtonVariant.OUTLINE}
                icon={<DownloadIcon className="w-5 h-5" />}
              >
                Download
              </IconButton>
            </CsvDownload>

            <IconButton
              title="Refresh data"
              onClick={() => getSurveyData(true)}
              variant={IconButtonVariant.OUTLINE}
              className="justify-center mt-2 w-full sm:mt-0 sm:ml-2 sm:w-[170px]"
              icon={<RefreshIcon className="w-5 h-5" />}
            >
              Refresh
            </IconButton>
          </div>

          <hr className=" md:hidden" />
          <AnswerHeader
            chartData={chartData}
            totalVotes={votes}
            startDate={startDate}
            endDate={endDate}
          />
          {answersData.length > 0 ? (
            <div className="mt-8 mb-6">
              {answersData.map((answer) => (
                <AnswerTableRow
                  key={answer.id}
                  time={answer.answerDate}
                  selectedIcon={answer.selectedIcon}
                  text={answer.answer}
                />
              ))}
            </div>
          ) : (
            <div className="mt-4">No answers yet</div>
          )}
        </div>
      )}
    </>
  );
}

export default withProtectedRoute(withAnimation(SurveyAnswerPage));
