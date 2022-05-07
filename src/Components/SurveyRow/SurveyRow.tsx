import { useState, Fragment } from 'react';
import { LinkIcon, TrashIcon } from '@heroicons/react/outline';
import Button, { ButtonVariant } from '../Button';
import IconButton, { IconButtonVariant } from '../IconButton';
import toast from 'react-hot-toast';
import useCopyToClipboard from '../../Hooks/useCopyToClipboard';
import { useNavigate } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { db } from '../../firebase';
import { deleteDoc, doc } from 'firebase/firestore';

type Props = {
  question: string;
  startDate: string;
  endDate: string;
  id: string;
};

export default function SurveyRow({ question, startDate, endDate, id }: Props) {
  const [, copy] = useCopyToClipboard();
  const navigate = useNavigate();
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
    navigate(`/survey/answer/${id}`);
  };

  const handleOnDelete = (id: string) => async () => {
    await deleteDoc(doc(db, 'surveys', id));
    closeDeleteModal();
    toast.success('Survey deleted');
  };

  return (
    <div className="flex max-w-full flex-col w-[600px] my-2 md:flex-row">
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

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
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

                  <div className="mt-4">
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
      <div className="flex items-center justify-between w-full px-4 py-3 bg-white rounded-md rounded-b-none shadow-sm md:rounded-b-md">
        <div title={question} className="text-left truncate w-36">
          {question}
        </div>
        <div className="flex items-center space-x-2">
          <div>{startDate}</div>
          <div>-</div>
          <div>{endDate}</div>
        </div>
      </div>
      <div className="flex w-full md:w-auto md:ml-2">
        <Button
          variant={ButtonVariant.OUTLINE}
          className="px-4 mr-2 sm:mt-0 mt-2 w-full md:w-auto"
          onClick={handleOnMoreButton}
        >
          More
        </Button>

        <IconButton
          variant={IconButtonVariant.PRIMARY}
          className={
            'px-3 sm:mt-0 mt-2 text-center w-full justify-center md:w-auto'
          }
          title="Copy link to clipboard"
          icon={<LinkIcon className="w-5 h-5" />}
          onClick={handleCopyLink}
        />
        <IconButton
          variant={IconButtonVariant.DANGER}
          title="Delete survey"
          className="px-3 ml-2 sm:mt-0 mt-2 w-full justify-center md:w-auto"
          onClick={openDeleteModal}
          icon={<TrashIcon className="w-5 h-5" />}
        />
      </div>
    </div>
  );
}
