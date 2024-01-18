import { LinkIcon } from '@heroicons/react/outline';
import React from 'react';
import Button, { ButtonVariant } from 'shared/components/Button/Button';
import StyledDialog from 'shared/components/StyledDialog/StyledDialog';
import useTranslation from 'next-translate/useTranslation';
import useCopyToClipboard from 'shared/hooks/useCopyToClipboard';
import Image from 'next/image';
import Link from 'next/link';

type ShareSurveyModalProps = {
  surveyId: string;
  isOpened: boolean;
  closeModal: () => void;
};

function objectToGetParams(object: {
  [key: string]: string | number | undefined | null;
}) {
  const params = Object.entries(object)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);

  return params.length > 0 ? `?${params.join('&')}` : '';
}

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

  const getTwitterShareableUrl = () => 'https://twitter.com/intent/tweet' +
    objectToGetParams({
      url: link,
      text: 'Coming from formslab',
      via: 'shubhamku044',
      hashtags: ['formslab', 'shubhamku044', 'shubhamsharma', 'shubhams.dev'].join(','),
      related: ['opensource'].join(','),
    });

  const getLinkedInShareableUrl = () => 'https://linkedin.com/sharing/share-offsite' + '?' + 'url=' + link;
  // objectToGetParams({ mini: 'true', title: 'something coming from formslab', summary: 'a very very large summary', source: 'source' });

  return (
    <StyledDialog
      isOpen={isOpened}
      onClose={closeModal}
      title={t('shareSurveyModal.title')}
      content={
        <>
          <div className="mt-4">
            <span className="scrollbar-hide block w-full select-all overflow-x-auto whitespace-nowrap rounded-md border border-gray-300 px-3 py-2 text-center text-sm focus:outline-none">
              {link}
            </span>
          </div>

          <div className="mt-4 flex flex-col-reverse justify-between gap-2 sm:flex-row">
            <Button
              variant={ButtonVariant.SECONDARY}
              onClick={closeModal}
              className="uppercase"
            >
              {t('shareSurveyModal.cancelButton')}
            </Button>
            <div className="flex flex-col-reverse gap-2 sm:flex-row">
              <Link target="_blank" href={getTwitterShareableUrl()}>
                <Button
                  variant={ButtonVariant.PRIMARY}
                  className="size-full"
                  icon={<Image width={20} height={20} alt="Twitter icon" src="/icons/tw.svg" className="size-5" />}
                />
              </Link>
              {/*
              <Link target="_blank" href={getLinkedInShareableUrl()}>
                <Button
                  className="size-full"
                  variant={ButtonVariant.PRIMARY}
                  icon={<Image width={20} height={20} alt="LinkedIn icon" src="/icons/ln.svg" className="size-5" />}
                />
              </Link>
              */}
              <Button
                variant={ButtonVariant.PRIMARY}
                onClick={handleCopy}
                icon={<LinkIcon className="size-5" />}
              />
            </div>
          </div>
        </>
      }
    />
  );
}
