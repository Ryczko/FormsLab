import AnswerHeader from '../../Components/AnswerHeader';
import AnswerTableRow from '../../Components/AnswerTableRow';
import { DownloadIcon, LinkIcon } from '@heroicons/react/outline';
import { useNavigate, useParams } from 'react-router-dom';
import { useDocumentTitle } from '../../Hooks/useDocumentTitle';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { formatFirebaseDateWithHours } from '../../Utils/convertTime';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  Timestamp,
} from 'firebase/firestore';
import { BarChartData } from '../../Components/BarChart/BarChart';
import toast from 'react-hot-toast';
import useCopyToClipboard from '../../Hooks/useCopyToClipboard';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CsvDownload from 'react-json-to-csv';
import Header from '../../Components/Header/Header';
import Loader from '../../Components/Loader';
import IconButton, { IconButtonVariant } from '../../Components/IconButton';

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
  const [startDate, setStartDate] = useState('-');
  const [endDate, setEndDate] = useState('-');
  const [answersData, setAnswersData] = useState<AnswerData[]>([]);
  const [, copy] = useCopyToClipboard();

  useEffect(() => {
    if (!surveyId) {
      navigate('/');
      return;
    }

    getSurveyData();
  }, [surveyId]);

  const getSurveyData = async () => {
    const surveyData = await getDoc(doc(db, 'surveys', surveyId!));
    if (!surveyData.exists()) {
      navigate('/');
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
        <div className="container mx-auto text-center">
          <Header>Answers for &quot;{title}&quot;</Header>
          <div className="flex flex-col justify-center mb-6 sm:flex-row md:mb-10">
            <IconButton
              onClick={handleCopyLink(surveyId!)}
              variant={IconButtonVariant.PRIMARY}
              className="w-full sm:w-[170px] mb-2 sm:mr-2 sm:mb-0 justify-center"
              icon={<LinkIcon className="w-5 h-5" />}
            >
              Copy link
            </IconButton>
            <IconButton
              className="w-full sm:w-[170px] justify-center"
              variant={IconButtonVariant.OUTLINE}
              icon={
                <CsvDownload
                  className="block"
                  data={answersData}
                  filename={`${title}.csv`}
                >
                  <DownloadIcon className="w-5 h-5" />
                </CsvDownload>
              }
            >
              Download
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
            <div className="mt-8">No answers yet</div>
          )}
        </div>
      )}
    </>
  );
}

export default SurveyAnswerPage;
