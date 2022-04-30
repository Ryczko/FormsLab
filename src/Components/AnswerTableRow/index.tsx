interface AnswerTableRowProps {
  time: string;
  selectedIcon: string;
  text: string;
}

function AnswerTableRow({ time, selectedIcon, text }: AnswerTableRowProps) {
  return (
    <tr className="bg-white sm:py-4 text-zinc-500">
      <td className="sm:p-4">{time}</td>
      <td className="sm:p-4">{selectedIcon}</td>
      <td className="sm:p-4">{text}</td>
    </tr>
  );
}

export default AnswerTableRow;
