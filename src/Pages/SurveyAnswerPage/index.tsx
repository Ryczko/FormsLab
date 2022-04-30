import AnswerTable from '../../Components/AnswerTable';
import AnswerHeader from '../../Components/AnswerHeader';
import AnswerTableRow from '../../Components/AnswerTableRow';
import IconButton, { IconButtonVariant } from '../../Components/IconButton';
import { LinkIcon } from '@heroicons/react/outline';
import { useNavigate, useParams } from 'react-router-dom';
import { useDocumentTitle } from '../../Hooks/useDocumentTitle';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  Timestamp,
} from 'firebase/firestore';
import PieChart, { PieChartData } from '../../Components/PieChart/PieChart';

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
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('-');
  const [answersData, setAnswersData] = useState<AnswerData[]>([]);

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
      formatFirebaseDate(surveyData.data()?.createdDate as Timestamp)
    );
    setTitle(surveyData.data()?.title);
    const data = answersData.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      answerDate: formatFirebaseDate(doc.data().answerDate as Timestamp),
    })) as AnswerData[];

    setAnswersData(data);
  };

  const formatFirebaseDate = (date: Timestamp) => {
    return date.toDate().toLocaleString('pl-PL', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getDataToChart = (): PieChartData[] => {
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

  return (
    <div className="container block px-4 mx-auto mt-10 text-center">
      <div className="flex flex-row justify-center mb-10">
        <h1 className="mx-4 text-4xl font-bold text-center">
          Answers for &quot;{title}&quot;
        </h1>
        <IconButton
          title="Copy link to clipboard"
          className="p-2"
          variant={IconButtonVariant.PRIMARY}
          icon={<LinkIcon className="w-5 h-5" />}
        />
      </div>
      {chartData.length ? <PieChart data={chartData} /> : null}

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
  );
}

export default SurveyAnswerPage;
