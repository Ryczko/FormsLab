import AnswerTable from '../../Components/AnswerTable';
import AnswerHeader from '../../Components/AnswerHeader';
import AnswerTableRow from '../../Components/AnswerTableRow';
import { DownloadIcon, LinkIcon } from '@heroicons/react/outline';
import { useNavigate, useParams } from 'react-router-dom';
import { useDocumentTitle } from '../../Hooks/useDocumentTitle';
import { useEffect, useRef, useState } from 'react';
import { db } from '../../firebase';
import { formatFirebaseDateWithHours } from '../../Functions/ConvertTime';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  Timestamp,
} from 'firebase/firestore';
import { BarChartData } from '../../Components/BarChart/BarChart';
import toast from 'react-hot-toast';
import useCopyToClipboard from '../../Hooks/useCopyToClipboard';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CsvDownload from 'react-json-to-csv';
import HeaderComponent from '../../Components/HeaderComponent/HeaderComponent';
import Loader from '../../Components/Loader/Loader';
import Button, { ButtonVariant } from '../../Components/Button';

interface AnswerData {
  id: string;
  answerDate: string;
  selectedIcon: string;
  answer: string;
}

function SurveyAnswerPage() {
  useDocumentTitle('Survey Answers');
  const { surveyId } = useParams();
  const navigate = useNavigate();

  const [votes, setVotes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('-');
  const [answersData, setAnswersData] = useState<AnswerData[]>([]);
  const [, copy] = useCopyToClipboard();

  const refreshTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!surveyId) {
      navigate('/');
      return;
    }

    getSurveyData();

    return () => {
      if (refreshTimeout.current) {
        clearTimeout(refreshTimeout.current);
      }
    };
  }, [surveyId]);

  const getSurveyData = async () => {
    console.log('pobieram');
    const surveyData = await getDoc(doc(db, 'surveys', surveyId!));
    if (!surveyData.exists()) {
      navigate('/');
      return;
    }

    const answersData = await getDocs(
      collection(db, 'surveys', surveyId!, 'answers')
    );
    setVotes(answersData.docs.length);

    setStartTime(
      formatFirebaseDateWithHours(surveyData.data()?.createdDate as Timestamp)
    );
    setTitle(surveyData.data()?.title);
    const data = answersData.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      answerDate: formatFirebaseDateWithHours(
        doc.data().answerDate as Timestamp
      ),
    })) as AnswerData[];

    setAnswersData(data);

    refreshTimeout.current = setTimeout(getSurveyData, 3000);

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

    return Object.keys(result).map((key) => ({
      name: key,
      value: result[key],
    }));
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
      <Loader isLoading={isLoading} />
      {!isLoading && (
        <div className="container px-4 mx-auto text-center">
          <HeaderComponent>Answers for &quot;{title}&quot;</HeaderComponent>
          <div className="flex flex-col justify-center mb-6 sm:flex-row md:mb-10">
            <Button
              onClick={handleCopyLink(surveyId!)}
              variant={ButtonVariant.PRIMARY}
              className="w-full sm:w-[170px] mb-2 sm:mr-2 sm:mb-0"
            >
              Copy link
              <LinkIcon className="w-5 h-5 inline-block ml-2" />
            </Button>
            <Button
              className="w-full sm:w-[170px]"
              variant={ButtonVariant.OUTLINE}
            >
              <CsvDownload data={answersData} filename={`${title}.csv`}>
                <span className="font-semibold"> Download</span>
                <DownloadIcon className="ml-2 w-5 h-5 inline-block" />
              </CsvDownload>
            </Button>
          </div>

          <hr className=" md:hidden" />
          <AnswerHeader
            chartData={chartData}
            totalVotes={votes}
            startTime={startTime}
          />
          {answersData.length > 0 ? (
            <AnswerTable>
              {answersData.map((answer) => (
                <AnswerTableRow
                  key={answer.id}
                  time={answer.answerDate}
                  selectedIcon={answer.selectedIcon}
                  text={answer.answer}
                />
              ))}
            </AnswerTable>
          ) : (
            <div className="mt-8">No answers yet</div>
          )}
        </div>
      )}
    </>
  );
}

export default SurveyAnswerPage;
