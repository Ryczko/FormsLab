import { formatDate } from 'shared/utilities/convertTime';
import { MappedAnswerData } from 'types/MappedAnswerData';

interface AnswerTableRowProps {
  answer: MappedAnswerData;
}

function AnswerTableRow({ answer }: AnswerTableRowProps) {
  return (
    <div className="my-2 grid grid-cols-8 rounded-md bg-white p-3 shadow-sm">
      <div className="col-span-2 text-sm">{formatDate(answer.date)}</div>

      <div className="col-span-6 break-words text-left text-sm">
        {answer.answer || '-'}
      </div>
    </div>
  );
}

export default AnswerTableRow;
