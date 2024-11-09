import { LinkIcon } from '@heroicons/react/outline';
import React from 'react';
import Button, { ButtonVariant } from 'shared/components/Button/Button';
import StyledDialog from 'shared/components/StyledDialog/StyledDialog';
import useTranslation from 'next-translate/useTranslation';
import useCopyToClipboard from 'shared/hooks/useCopyToClipboard';
import QRCode from 'react-qr-code';

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

  const link = `${window.location.protocol}//${window.location.host}/survey/${surveyId}`;

  const handleCopy = () => {
    copy(link);
  };

  return (
    <StyledDialog
      isOpen={isOpened}
      onClose={closeModal}
      title={t('shareSurveyModal.title')}
      content={
        <>
          <div className="mx-auto my-4 w-1/3">
            <QRCode
              size={256}
              style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
              value={link}
            />
          </div>

          <span className="scrollbar-hide block w-full select-all overflow-x-auto whitespace-nowrap rounded-md border border-gray-300 px-3 py-2 text-center text-sm focus:outline-none">
            {link}
          </span>

          <div className="mt-4 flex flex-col-reverse justify-between gap-2 sm:flex-row">
            <Button
              variant={ButtonVariant.SECONDARY}
              onClick={closeModal}
              className="uppercase"
            >
              {t('shareSurveyModal.cancelButton')}
            </Button>
            <Button
              variant={ButtonVariant.PRIMARY}
              onClick={handleCopy}
              icon={<LinkIcon className="h-5 w-5" />}
            >
              {t('shareSurveyModal.copyUrl')}
            </Button>
          </div>
        </>
      }
    />
  );
}
