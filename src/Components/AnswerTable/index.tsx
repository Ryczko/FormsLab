import React from 'react';

function AnswerTable({ children }: React.HTMLProps<HTMLButtonElement>) {
  return (
    <div className="flex flex-col items-center justify-center py-4">
      <table className="table-auto w:4/6 sm:w-3/4 drop-shadow-lg">
        <thead>
          <tr>
            <th className="p-8">Time</th>
            <th className="p-8">Score</th>
            <th className="w-1/2 p-8">Text</th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export default AnswerTable;
