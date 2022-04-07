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
    <>
      <tr className='py-4 bg-white text-zinc-500'>
        <td className="p-4">{ID}</td>
        <td className="p-4">{time}</td>
        <td className="p-4">{score}</td>
        <td className="p-4">{text}</td>
        <td className="p-2"></td>
      </tr>
    </>
  );
}

export default AnswerTableRow;
