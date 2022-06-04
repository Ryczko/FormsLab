import Emoji from '../Emoji';

interface AnswerTableRowProps {
  time: string;
  selectedIcon: string;
  text: string;
}

function AnswerTableRow({ time, selectedIcon, text }: AnswerTableRowProps) {
  return (
    <div className="grid grid-cols-6 p-3 my-2 mx-auto max-w-[800px] bg-white rounded-md shadow-sm">
      <div className="col-span-2">{time}</div>
      <div>
        <Emoji symbol={selectedIcon} />
      </div>
      <div className="col-span-3 text-left break-words">{text || '-'}</div>
    </div>
  );
}

export default AnswerTableRow;
