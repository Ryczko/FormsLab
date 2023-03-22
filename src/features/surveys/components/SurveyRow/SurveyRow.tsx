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
import IconButton, {
  IconButtonVariant,
} from '../../../../shared/components/IconButton/IconButton';
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
  const [, copy] = useCopyToClipboard();
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

  const handleOnDelete = (id: string) => async () => {
    try {
      await deleteDoc(doc(db, 'surveys', id));
      closeDeleteModal();
      toast.success('Survey deleted');
    } catch (error) {
      toast.error('Error deleting survey');
    }
  };

  return (
    <div className="flex flex-col mb-4 w-[600px] max-w-full md:flex-row">
      <div className="flex justify-between items-center py-3 px-4 w-full bg-white rounded-md rounded-b-none shadow-sm md:rounded-b-md">
        <div title={question} className="w-36 text-left truncate">
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
          className="px-4 mt-2 mr-2 w-full sm:mt-0 md:w-auto"
          onClick={handleOnMoreButton}
        >
          More
        </Button>

        <IconButton
          variant={IconButtonVariant.PRIMARY}
          className={
            'justify-center px-3 mt-2 w-full text-center sm:mt-0 md:w-auto'
          }
          title="Copy link to clipboard"
          icon={<LinkIcon className="w-5 h-5" />}
          onClick={handleCopyLink}
        />
        <IconButton
          variant={IconButtonVariant.DANGER}
          title="Delete survey"
          className="justify-center px-3 mt-2 ml-2 w-full sm:mt-0 md:w-auto"
          onClick={openDeleteModal}
          icon={<TrashIcon className="w-5 h-5" />}
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

            <div className="flex justify-between mt-6">
              <Button
                variant={ButtonVariant.SECONDARY}
                onClick={closeDeleteModal}
                className="uppercase"
              >
                Cancel
              </Button>
              <IconButton
                variant={IconButtonVariant.DANGER}
                onClick={handleOnDelete(id)}
                icon={<TrashIcon className="w-5 h-5" />}
                className="uppercase"
              >
                Delete
              </IconButton>
            </div>
          </>
        }
      />
    </div>
  );
}
