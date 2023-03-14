import { useState, Fragment } from 'react';
import { LinkIcon, TrashIcon } from '@heroicons/react/outline';

import toast from 'react-hot-toast';
import useCopyToClipboard from '../../../../shared/hooks/useCopyToClipboard';
import { Dialog, Transition } from '@headlessui/react';
import { db } from '../../../../firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import Button, {
  ButtonVariant,
} from '../../../../shared/components/Button/Button';
import IconButton, {
  IconButtonVariant,
} from '../../../../shared/components/IconButton/IconButton';

type Props = {
  question: string;
  startDate: string;
  endDate: string;
  id: string;
};

export default function SurveyRow({ question, startDate, endDate, id }: Props) {
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
    toast.success('Link copied to clipboard');
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
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col mb-4 w-[600px] max-w-full md:flex-row">
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeDeleteModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-zinc-900 bg-opacity-25" />
          </Transition.Child>

          <div className="overflow-y-auto fixed inset-0">
            <div className="flex justify-center items-center p-4 min-h-full text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="flex overflow-hidden flex-col justify-center p-6 w-auto max-w-md text-left bg-white rounded-md shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-zinc-900"
                  >
                    Delete survey
                  </Dialog.Title>
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
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
    </div>
  );
}
