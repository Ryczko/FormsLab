import Emoji from 'features/surveys/components/Emoji/Emoji';

interface AnswerTableRowProps {
  time: string;
  selectedIcon: string;
  text: string;
}

function AnswerTableRow({ time, selectedIcon, text }: AnswerTableRowProps) {
  return (
    <div className="my-2 grid grid-cols-8 rounded-md bg-white p-3 shadow-sm">
      <div className="col-span-3 hidden text-sm xsm:block">{time}</div>
      <div className="col-span-2 ml-[4px] mr-2 mt-[1px] flex justify-center xsm:col-span-1 xsm:justify-start">
        <Emoji shortcodes={selectedIcon} size={22} />
      </div>
      <div className="col-span-6 break-words text-left xsm:col-span-4">
        {text || '-'}
      </div>
    </div>
  );
}

export default AnswerTableRow;
