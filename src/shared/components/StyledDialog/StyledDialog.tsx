import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { XIcon } from '@heroicons/react/outline';

interface StyledDialogProps {
  title?: string;
  content: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  contentClassName?: string;
}

export default function StyledDialog({
  title = '',
  content,
  isOpen,
  onClose,
  contentClassName = '',
}: StyledDialogProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={onClose}>
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
              <Dialog.Panel
                className={clsx(
                  'flex w-auto min-w-[250px] max-w-xl flex-col justify-center overflow-hidden rounded-md bg-white p-4 text-left shadow-xl transition-all',
                  contentClassName
                )}
              >
                {!!title && (
                  <Dialog.Title
                    as="h3"
                    className={clsx(
                      'flex items-center border-b pb-2 text-lg font-medium leading-6 text-zinc-900'
                    )}
                  >
                    <span className="w-full text-left">{title}</span>
                    <XIcon
                      onClick={onClose}
                      data-test-id={'close-modal'}
                      className=" h-5 w-5 cursor-pointer"
                    />
                  </Dialog.Title>
                )}

                {content}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
