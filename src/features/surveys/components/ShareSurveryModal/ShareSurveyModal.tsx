import { LinkIcon } from '@heroicons/react/outline';
import React from 'react';
import Button, { ButtonVariant } from 'shared/components/Button/Button';
import StyledDialog from 'shared/components/StyledDialog/StyledDialog';
import useTranslation from 'next-translate/useTranslation';
import useCopyToClipboard from 'shared/hooks/useCopyToClipboard';

type ShareSurveyModalProps = {
  surveyId: string;
  isOpened: boolean;
  closeModal: () => void;
};

export default function ShareSurveyModal({
  surveyId,
  isOpened,
  closeModal,
}: ShareSurveyModalProps) {
  const { t } = useTranslation('common');
  const { copy } = useCopyToClipboard();

  const domain =
    window.location.hostname === 'localhost' ? 'http://' : 'https://';
  const link = `${domain}${window.location.host}/survey/${surveyId}`;

  return (
    <StyledDialog
      isOpen={isOpened}
      onClose={closeModal}
      title={t('shareSurveyModal.title')}
      centerTitle
      contentClassName='w-96'
      content={
        <>
          <div className="mt-8">
            <input
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              value={`${link}/${surveyId}`}
              disabled
            />
            <p className="text-sm text-red-500">
            </p>
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              variant={ButtonVariant.OUTLINE_PRIMARY}
              onClick={() => {
                copy(link);
              }}
              icon={<LinkIcon className="h-5 w-5" />}
              className=""
            >
              {t('shareSurveyModal.copyUrl')}
            </Button>
          </div>
        </>
      }
    />
  );
}
