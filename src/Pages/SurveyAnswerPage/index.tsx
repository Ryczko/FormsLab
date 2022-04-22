import AnswerTable from '../../Components/AnswerTable';
import AnswerHeader from '../../Components/AnswerHeader';
import AnswerTableRow from '../../Components/AnswerTableRow';
import IconButton, { IconButtonVariant } from '../../Components/IconButton';
import { LinkIcon } from '@heroicons/react/outline';
import { useParams } from 'react-router-dom';
import { useDocumentTitle } from '../../Hooks/useDocumentTitle';

function SurveyAnswerPage() {
  useDocumentTitle('Survey Answers');
  const { answerId } = useParams();

  return (
    <div className="container block px-4 mx-auto mt-10 text-center">
      <div className="flex flex-row justify-center mb-10">
        <h1 className="text-4xl font-bold text-center sm:mx-4">Answers for #1</h1>
        <IconButton
          title="Copy link to clipboard"
          className="hidden p-2 sm:block"
          variant={IconButtonVariant.PRIMARY}
          icon={<LinkIcon className="w-5 h-5" />}
        />
        <h1 className="mx-4 text-4xl font-bold text-center">
          Answers for {answerId}
        </h1>
        <IconButton
          title="Copy link to clipboard"
          className="p-2"
          variant={IconButtonVariant.PRIMARY}
          icon={<LinkIcon className="w-5 h-5" />}
        />
      </div>
      <AnswerHeader
        totalVotes={120}
        medianOfScore={'3/4'}
        startTime={'12:30:00'}
        endTime={'12:45:00'}
      />
      <AnswerTable>
        <AnswerTableRow
          ID={1}
          time={'12:41:04'}
          score={'1/4'}
          text={'TEST TEST TEST'}
        />
        <AnswerTableRow
          ID={1}
          time={'12:41:04'}
          score={'1/4'}
          text={
            'TEST TEST TESTTEST TEST TESTTEST TEST TESTTEST TEST TESTTEST TEST TESTTEST TEST TESTTEST TEST TESTTEST TEST TESTTEST TEST TESTTEST TEST TEST'
          }
        />
        <AnswerTableRow
          ID={1}
          time={'12:41:04'}
          score={'1/4'}
          text={'TEST TEST TEST'}
        />
      </AnswerTable>
    </div>
  );
}

export default SurveyAnswerPage;
