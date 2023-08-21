import Head from 'next/head';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  ButtonVariant,
} from 'shared/components/Button/Button';
import ButtonLink from 'shared/components/ButtonLink/ButtonLink';

const ThankyouPage = () => {
  const router = useRouter();
  const { t } = useTranslation('thankyou');
  const initialSeconds = 10; //seconds for countdown redirection
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(timer);
    }

    if (seconds === 0) {
      router.replace('/');
    }
  }, [seconds, router]);

  return (
    <>
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content={t('content')} />
      </Head>
      <div className="pt-2">
        <div className='flex justify-center'>
          <Image src="/images/thankyou.svg" alt="thankyou" height="200" width="200" />
        </div>
        <h1 className="leading-tighter mb-4 pt-3 text-4xl font-extrabold tracking-tighter md:text-6xl">
          {t('firstPartHeading')}&nbsp;
          <span className="text-indigo-600">
            {t('secondPartHeading')}
          </span>
        </h1>
        <p className="mx-auto mb-6 mt-4 max-w-lg text-xl text-zinc-600">
          {t('content')}
        </p>

        <div className="mb-8 flex flex-col space-y-2 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
          <ButtonLink href="/" variant={ButtonVariant.PRIMARY}>
            {t('backToHome')}
          </ButtonLink>
        </div>
        <p className="mx-auto max-w-lg text-xl text-zinc-600">
          {`${t('firstPartRedirectionMessage')} ${seconds} ${t('secondPartRedirectionMessage')}.`}
        </p>
      </div>
    </>
  );
};

export default ThankyouPage;
