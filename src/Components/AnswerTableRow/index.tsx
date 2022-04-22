import React from 'react';

interface AnswerTableRowProps {
  ID: number;
  time: string;
  score: string;
  text: string;
}

function AnswerTableRow({
  ID,
  time,
  score,
  text,
}: AnswerTableRowProps & React.HTMLProps<HTMLButtonElement>) {
  return (
    <tr className="bg-white sm:py-4 text-zinc-500">
      <td className="sm:p-4">{ID}</td>
      <td className="sm:p-4">{time}</td>
      <td className="sm:p-4">{score}</td>
      <td className="sm:p-4">{text}</td>
      <td className="hidden sm:p-2 sm:table-cell"></td>
    </tr>
  );
}

export default AnswerTableRow;
