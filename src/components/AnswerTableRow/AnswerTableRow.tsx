import Emoji from '../Emoji/Emoji';

interface AnswerTableRowProps {
  time: string;
  selectedIcon: string;
  text: string;
}

function AnswerTableRow({ time, selectedIcon, text }: AnswerTableRowProps) {
  return (
    <div className="my-2 mx-auto grid max-w-[800px] grid-cols-6 rounded-md bg-white p-3 shadow-sm">
      <div className="col-span-2">{time}</div>
      <div>
        <Emoji symbol={selectedIcon} />
      </div>
      <div className="col-span-3 break-words text-left">{text || '-'}</div>
    </div>
  );
}

export default AnswerTableRow;
