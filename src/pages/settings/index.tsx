import withAnimation from '../../shared/HOC/withAnimation';
import Head from 'next/head';
import Header from 'src/shared/components/Header/Header';
import withProtectedRoute from 'src/shared/HOC/withProtectedRoute';
import IconButton, {
  IconButtonVariant,
} from 'src/shared/components/IconButton/IconButton';
import { TrashIcon } from '@heroicons/react/outline';
import Button, { ButtonVariant } from 'src/shared/components/Button/Button';
import { useSettingsManager } from 'src/features/settings/settingsManager';
import StyledDialog from 'src/shared/components/StyledDialog/StyledDialog';

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
        <meta name="description" content="Settings - Employee Pulse" />
      </Head>
      <div className="container px-4 m-auto text-center md:px-8">
        <Header>Hi {user.displayName}!</Header>
        <div className="flex flex-col justify-center items-center space-y-2">
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
        <StyledDialog
          isOpen={isOpen}
          onClose={closeDeleteModal}
          title="Delete my account"
          content={
            <>
              <div className="mt-2">
                <p className="text-sm text-red-500">
                  Are you sure you want to&nbsp;
                  <span className="font-bold">delete</span> your account?
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
            </>
          }
        />
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
