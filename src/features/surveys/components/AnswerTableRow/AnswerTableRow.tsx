import { formatDate } from 'shared/utilities/convertTime';
import { MappedAnswerData } from 'types/MappedAnswerData';

interface AnswerTableRowProps {
  answer: MappedAnswerData;
}

function AnswerTableRow({ answer }: AnswerTableRowProps) {
  return (
    <div className="mb-2 grid grid-cols-8 rounded-md border bg-white p-3 shadow-sm">
      <div className="col-span-3 border-r px-4 text-sm">
        {formatDate(answer.date)}
      </div>

      <div className="col-span-5 ml-4 break-words text-left text-sm">
        {answer.answer || '-'}
      </div>
    </div>
  );
}

export default AnswerTableRow;
