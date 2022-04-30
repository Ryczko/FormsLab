import AnswerTable from '../../Components/AnswerTable';
import AnswerHeader from '../../Components/AnswerHeader';
import AnswerTableRow from '../../Components/AnswerTableRow';
import IconButton, { IconButtonVariant } from '../../Components/IconButton';
import { DownloadIcon, LinkIcon } from '@heroicons/react/outline';
import { useNavigate, useParams } from 'react-router-dom';
import { useDocumentTitle } from '../../Hooks/useDocumentTitle';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import {formatFirebaseDateWithHours} from '../../Functions/ConvertTime';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  Timestamp,
} from 'firebase/firestore';
import BarChart, { BarChartData } from '../../Components/BarChart/BarChart';
import toast from 'react-hot-toast';
import useCopyToClipboard from '../../Hooks/useCopyToClipboard';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CsvDownload from 'react-json-to-csv';
import HeaderComponent from '../../Components/HeaderComponent/HeaderComponent';
import Loader from '../../Components/Loader/Loader';

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
      answerDate: formatFirebaseDateWithHours(doc.data().answerDate as Timestamp),
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
        <div className="container px-4 mx-auto text-center">
          <HeaderComponent>Answers for &quot;{title}&quot;</HeaderComponent>
          <div className="flex flex-row justify-center mb-10">
            <IconButton
              variant={IconButtonVariant.PRIMARY}  
              title="Copy link to clipboard"
              onClick={handleCopyLink(surveyId!)}
              icon={<LinkIcon className="w-5 h-5" />}
            />
            <CsvDownload              
              data={answersData}
              filename={`${title}.csv`}
            >
              <IconButton
                variant={IconButtonVariant.PRIMARY}
                title="Download"
                icon={<DownloadIcon className="w-5 h-5" />}
              />
            </CsvDownload>
          </div>
          {chartData.length ? <BarChart data={chartData} /> : null}

          <AnswerHeader totalVotes={votes} startTime={startTime} />
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
