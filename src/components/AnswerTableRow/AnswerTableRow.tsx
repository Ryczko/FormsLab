import Emoji from '../Emoji';

interface AnswerTableRowProps {
  time: string;
  selectedIcon: string;
  text: string;
}

function AnswerTableRow({ time, selectedIcon, text }: AnswerTableRowProps) {
  return (
    <div className="bg-white py-3 shadow-sm max-w-[800px] mx-auto px-3 grid grid-cols-6 my-2 rounded-md">
      <div className="col-span-2">{time}</div>
      <div>
        <Emoji symbol={selectedIcon} />
      </div>
      <div className="col-span-3 text-left break-words">{text || '-'}</div>
    </div>
  );
}

export default AnswerTableRow;
