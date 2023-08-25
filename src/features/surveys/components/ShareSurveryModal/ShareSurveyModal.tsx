import { LinkIcon } from '@heroicons/react/outline';
import React, { useCallback, useRef } from 'react';
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
  const inputEl = useRef<HTMLInputElement>(null);

  const link = `${window.location.protocol}//${window.location.host}/survey/${surveyId}`;

  const handleCopy = () => {
    copy(link);

    if (inputEl.current) {
      inputEl.current.select();
    }
  };

  const handleInputFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      e.target.select();
    },
    []
  );

  return (
    <StyledDialog
      isOpen={isOpened}
      onClose={closeModal}
      title={t('shareSurveyModal.title')}
      contentClassName="!w-[800px]"
      content={
        <>
          <div className="mt-4">
            <input
              onFocus={handleInputFocus}
              ref={inputEl}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none"
              value={`${link}`}
            />
          </div>

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
