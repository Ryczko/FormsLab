import React from 'react';
import IconButton, { IconButtonVariant } from '../../Components/IconButton';

function AnswerTable({ children }: React.HTMLProps<HTMLButtonElement>) {
  return (
    <div className="flex flex-col items-center justify-center py-4">
      <table className="table-auto w:4/6 sm:w-3/4 drop-shadow-lg">
        <thead>
          <tr>
            <th className="p-8">ID</th>
            <th className="p-8">Time</th>
            <th className="p-8">Score</th>
            <th className="w-1/3 p-8">Text</th>
            <th className="hidden px-8 sm:table-cell">
              <IconButton
                variant={IconButtonVariant.PRIMARY}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                }
              ></IconButton>
            </th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export default AnswerTable;
