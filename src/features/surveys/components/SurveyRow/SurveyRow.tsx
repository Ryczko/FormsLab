import { useState } from 'react';
import { LinkIcon, TrashIcon } from '@heroicons/react/outline';

import toast from 'react-hot-toast';
import { deleteDoc, doc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import useCopyToClipboard from '../../../../shared/hooks/useCopyToClipboard';
import { db } from '../../../../firebase';
import Button, {
  ButtonVariant,
} from '../../../../shared/components/Button/Button';

import StyledDialog from 'src/shared/components/StyledDialog/StyledDialog';

interface SurveyRowProps {
  question: string;
  startDate: string;
  endDate: string;
  id: string;
}

export default function SurveyRow({
  question,
  startDate,
  endDate,
  id,
}: SurveyRowProps) {
  const { copy } = useCopyToClipboard();
  const navigate = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

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

  const handleOnDelete = (id: string) => async () => {
    setIsRemoving(true);
    try {
      await deleteDoc(doc(db, 'surveys', id));
      closeDeleteModal();
      toast.success('Survey deleted');
    } catch (error) {
      toast.error('Error deleting survey');
    }
    setIsRemoving(false);
  };

  return (
    <div className="mb-4 flex w-[600px] max-w-full flex-col md:flex-row">
      <div className="flex w-full items-center justify-between rounded-md rounded-b-none bg-white py-3 px-4 shadow-sm md:rounded-b-md">
        <div title={question} className="w-36 truncate text-left">
          {question}
        </div>
        <div className="flex items-center space-x-2">
          <div>{startDate}</div>
          <div>-</div>
          <div>{endDate}</div>
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
      <StyledDialog
        isOpen={isOpen}
        onClose={closeDeleteModal}
        title="Delete survey"
        content={
          <>
            <div className="mt-2">
              <p className="text-sm text-red-500">
                Are you sure you want to&nbsp;
                <span className="font-bold">delete</span> this survey?
              </p>
            </div>

            <div className="mt-6 flex justify-between">
              <Button
                variant={ButtonVariant.SECONDARY}
                onClick={closeDeleteModal}
                className="uppercase"
                disabled={isRemoving}
              >
                Cancel
              </Button>
              <Button
                variant={ButtonVariant.DANGER}
                onClick={handleOnDelete(id)}
                icon={<TrashIcon className="h-5 w-5" />}
                className="uppercase"
                isLoading={isRemoving}
              >
                Delete
              </Button>
            </div>
          </>
        }
      />
    </div>
  );
}
