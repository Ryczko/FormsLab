import { DownloadIcon } from '@heroicons/react/outline';
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
                icon={<DownloadIcon className="w-5 h-5" />}
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
