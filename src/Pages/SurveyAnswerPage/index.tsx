import AnswerTable from '../../Components/AnswerTable';
import AnswerHeader from '../../Components/AnswerHeader';
import AnswerTableRow from '../../Components/AnswerTableRow';
import IconButton, { IconButtonVariant } from '../../Components/IconButton';

function SurveyAnswerPage() {
  return (
    <div className="container block px-4 mx-auto mt-10 text-center">
      <div className="flex flex-row justify-center mb-10">
        <h1 className="mx-4 text-4xl font-bold text-center">Answer for #1</h1>
        <IconButton
          className="p-2"
          variant={IconButtonVariant.PRIMARY}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          }
        ></IconButton>
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
          text={'TEST TEST TESTTEST TEST TESTTEST TEST TESTTEST TEST TESTTEST TEST TESTTEST TEST TESTTEST TEST TESTTEST TEST TESTTEST TEST TESTTEST TEST TEST'}
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
