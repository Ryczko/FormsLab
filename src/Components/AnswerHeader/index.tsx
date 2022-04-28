interface AnswerHeaderProps {
  totalVotes: number;
  startTime: string;
}

function AnswerHeader({ totalVotes, startTime }: AnswerHeaderProps) {
  return (
    <div className="flex flex-col items-center justify-center py-4">
      <table className="table-auto">
        <thead>
          <tr>
            <th className="py-2 px-8">Total Votes</th>
            <th className="py-2 px-8">Start Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-8">{totalVotes}</td>
            <td className="py-2 px-8">{startTime}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AnswerHeader;
