import { TrashIcon } from '@heroicons/react/outline';

import useTranslation from 'next-translate/useTranslation';
import { useAccountManager } from 'features/account/accountManager';
import Button, { ButtonVariant } from 'shared/components/Button/Button';
import StyledDialog from 'shared/components/StyledDialog/StyledDialog';
import Avatar from 'shared/components/Avatar/Avatar';
import { formatDateDistance } from 'shared/utilities/convertTime';
import Header from 'shared/components/Header/Header';

export default function Account() {
  const { t } = useTranslation('account');

  const {
    user,
    isOpen,
    openDeleteModal,
    closeDeleteModal,
    handleOnAccountDelete,
    isRemoving,
  } = useAccountManager();

  return (
    <>
      <Header>Your account</Header>

      {user ? (
        <div className="mt-4 flex w-full items-center justify-center gap-12 text-left">
          <Avatar size={160} src={user.image} classNames="border" />

          <div className="mb-4">
            <h2 className="mb-2 text-2xl">{user?.name}</h2>
            <p>{user?.email}</p>
            <p>Account created: {formatDateDistance(user.createdAt)}</p>
          </div>
        </div>
      ) : (
        <></>
      )}

      {process.env.NEXT_PUBLIC_REMOVE_ACCOUNT && (
        <>
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="flex w-full md:ml-2 md:w-auto">
              <Button
                variant={ButtonVariant.DANGER}
                title={t('deleteAccountButtonTitle')}
                className="ml-2 mt-2 w-full justify-center px-3 sm:mt-0 md:w-auto"
                onClick={openDeleteModal}
                icon={<TrashIcon className="h-5 w-5" />}
              >
                {t('deleteAccountButton')}
              </Button>
            </div>
          </div>
          <StyledDialog
            isOpen={isOpen}
            onClose={closeDeleteModal}
            title={t('dialogTitle')}
            content={
              <>
                <div className="mt-2">
                  <p className="text-sm text-red-500">
                    {t('dialogContentFirst')}&nbsp;
                    <span className="font-bold">
                      {t('dialogContentSecond')}
                    </span>{' '}
                    {t('dialogContentThird')}
                  </p>
                </div>
                <div className="mt-6 flex justify-between space-x-3">
                  <Button
                    variant={ButtonVariant.SECONDARY}
                    onClick={closeDeleteModal}
                    className="uppercase"
                    disabled={isRemoving}
                  >
                    {t('buttonCancle')}
                  </Button>
                  <Button
                    variant={ButtonVariant.DANGER}
                    onClick={handleOnAccountDelete}
                    icon={<TrashIcon className="h-5 w-5" />}
                    className="uppercase"
                    isLoading={isRemoving}
                  >
                    {t('buttonConfirm')}
                  </Button>
                </div>
              </>
            }
          />
        </>
      )}
    </>
  );
}
