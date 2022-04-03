import React from 'react';

interface AnswerHeaderProps {
  totalVotes: number;
  medianOfScore: string;
  startTime: string;
  endTime: string;
}

function AnswerHeader({
  totalVotes,
  medianOfScore,
  startTime,
  endTime,
}: AnswerHeaderProps & React.HTMLProps<HTMLButtonElement>) {
  return (
    <div className="flex flex-col items-center justify-center py-4">
      <table className="table-auto">
        <thead>
          <tr>
            <th className="p-4">Total Votes</th>
            <th className="p-4">Median of score</th>
            <th className="p-4">Start Time</th>
            <th className="p-4">End Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-4">{totalVotes}</td>
            <td className="p-4">{medianOfScore}</td>
            <td className="p-4">{startTime}</td>
            <td className="p-4">{endTime}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AnswerHeader;
