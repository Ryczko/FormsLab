import withAnimation from '../../shared/HOC/withAnimation';
import Head from 'next/head';
import Header from 'src/shared/components/Header/Header';
import { Fragment } from 'react';
import withProtectedRoute from 'src/shared/HOC/withProtectedRoute';
import IconButton, {
  IconButtonVariant,
} from 'src/shared/components/IconButton/IconButton';
import { TrashIcon } from '@heroicons/react/outline';
import { Dialog, Transition } from '@headlessui/react';
import Button, { ButtonVariant } from 'src/shared/components/Button/Button';
import { useSettingsManager } from 'src/features/settings/settingsManager';

function SettingsPage() {
  const {
    user,
    loading,
    error,
    isOpen,
    openDeleteModal,
    closeDeleteModal,
    handleOnAccountDelete,
  } = useSettingsManager();

  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <div className="container px-4 m-auto text-center md:px-8">
        <Header>Hi {user.displayName}!</Header>
        <div className="flex flex-col justify-center items-center space-y-2">
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              onClose={closeDeleteModal}
            >
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
                        Delete my account
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-red-500">
                          Are you sure you want to&nbsp;
                          <span className="font-bold">delete</span> your
                          account?
                        </p>
                      </div>

                      <div className="flex justify-between mt-6 space-x-3">
                        <Button
                          variant={ButtonVariant.SECONDARY}
                          onClick={closeDeleteModal}
                          className="uppercase"
                        >
                          Cancel
                        </Button>
                        <IconButton
                          variant={IconButtonVariant.DANGER}
                          onClick={handleOnAccountDelete}
                          icon={<TrashIcon className="w-5 h-5" />}
                          className="uppercase"
                        >
                          Delete my account
                        </IconButton>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>

          <div className="flex w-full md:ml-2 md:w-auto">
            <IconButton
              variant={IconButtonVariant.DANGER}
              title="Delete my account"
              className="justify-center px-3 mt-2 ml-2 w-full sm:mt-0 md:w-auto"
              onClick={openDeleteModal}
              icon={<TrashIcon className="w-5 h-5" />}
            >
              Delete my account
            </IconButton>
          </div>
        </div>
        {loading && (
          <div className="text-sm text-center text-zinc-600">Loading...</div>
        )}
        {error && (
          <div className="text-sm text-center text-red-600">
            Error: {error.message}
          </div>
        )}
      </div>
    </>
  );
}

export default withProtectedRoute(withAnimation(SettingsPage));
