import Head from 'next/head';
import { TrashIcon } from '@heroicons/react/outline';
import withAnimation from 'shared/HOC/withAnimation';
import Header from 'shared/components/Header/Header';
import withProtectedRoute from 'shared/HOC/withProtectedRoute';

import Button, { ButtonVariant } from 'shared/components/Button/Button';
import { useSettingsManager } from 'features/settings/settingsManager';
import StyledDialog from 'shared/components/StyledDialog/StyledDialog';
import withFeatureToggles from 'shared/HOC/withFeatureToggles';
import useTranslation from 'next-translate/useTranslation';

function SettingsPage() {
  const {
    user,
    loading,
    isOpen,
    openDeleteModal,
    closeDeleteModal,
    handleOnAccountDelete,
    isRemoving,
  } = useSettingsManager();
  const { t } = useTranslation('settings');

  return (
    <>
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content={t('content')} />
      </Head>

      <Header>
        {t('heading')}&nbsp;{user?.displayName}!
      </Header>
      <div className="flex flex-col items-center justify-center space-y-2">
        <div className="flex w-full md:ml-2 md:w-auto">
          <Button
            variant={ButtonVariant.DANGER}
            title={t('deleteAccountButtonTitle')}
            className="mt-2 ml-2 w-full justify-center px-3 sm:mt-0 md:w-auto"
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
      {loading && (
        <div className="text-center text-sm text-zinc-600">{t('loading')}</div>
      )}
    </>
  );
}

export default withFeatureToggles(
  withProtectedRoute(withAnimation(SettingsPage)),
  [process.env.NEXT_PUBLIC_REMOVE_ACCOUNT]
);
