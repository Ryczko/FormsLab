import { useState } from 'react';
import { LinkIcon, TrashIcon } from '@heroicons/react/outline';

import { useRouter } from 'next/router';
import useCopyToClipboard from 'shared/hooks/useCopyToClipboard';
import Button, { ButtonVariant } from 'shared/components/Button/Button';

import DeleteSurveyModal from 'features/surveys/components/DeleteSurveyModal/DeleteSurveyModal';

interface SurveyRowProps {
  question: string;
  createDate: string;
  id: string;
}

export default function SurveyRow({
  question,
  createDate,
  id,
}: SurveyRowProps) {
  const { copy } = useCopyToClipboard();
  const navigate = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  function closeDeleteModal() {
    setIsOpen(false);
  }

  function openDeleteModal() {
    setIsOpen(true);
  }

  const handleCopyLink = () => {
    const domain =
      window.location.hostname === 'localhost' ? 'http://' : 'https://';
    const link = `${domain}${window.location.host}/survey/${id}`;
    copy(link);
  };

  const handleOnMoreButton = () => {
    navigate.push(`/survey/answer/${id}`);
  };

  return (
    <div className="mb-4 flex w-[600px] max-w-full flex-col md:flex-row">
      <div className="flex w-full items-center justify-between rounded-md rounded-b-none bg-white py-3 px-4 shadow-sm md:rounded-b-md">
        <div title={question} className="w-36 truncate text-left">
          {question}
        </div>
        <div className="flex items-center space-x-2">
          <div>{createDate}</div>
        </div>
      </div>
      <div className="flex w-full md:ml-2 md:w-auto">
        <Button
          variant={ButtonVariant.OUTLINE}
          className="mt-2 mr-2 w-full px-4 sm:mt-0 md:w-auto"
          onClick={handleOnMoreButton}
        >
          More
        </Button>

        <Button
          variant={ButtonVariant.PRIMARY}
          className={
            'mt-2 w-full justify-center px-3 text-center sm:mt-0 md:w-auto'
          }
          title="Copy link to clipboard"
          icon={<LinkIcon className="h-5 w-5" />}
          onClick={handleCopyLink}
        />
        <Button
          variant={ButtonVariant.DANGER}
          title="Delete survey"
          className="mt-2 ml-2 w-full justify-center px-3 sm:mt-0 md:w-auto"
          onClick={openDeleteModal}
          icon={<TrashIcon className="h-5 w-5" />}
        />
      </div>
      <DeleteSurveyModal
        surveyId={id}
        closeModal={closeDeleteModal}
        isOpened={isOpen}
      />
    </div>
  );
}
