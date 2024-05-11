import React from 'react';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';

export default function ThankYou() {
  const { t } = useTranslation('thankyou');

  return (
    <div className="my-4 flex flex-col items-center justify-center">
      <Image
        src="/images/thankyou.svg"
        alt="thankyou"
        height="151"
        width="140"
      />

      <h1
        data-test-id="thank-you-header"
        className="leading-tighter mt-4 text-3xl font-extrabold tracking-tighter"
      >
        {t('firstPartHeading')}&nbsp;
        <span className="text-indigo-200">{t('secondPartHeading')}</span>
      </h1>
      <p className="text-md mt-2 max-w-lg text-zinc-600">{t('content')}</p>
    </div>
  );
}
