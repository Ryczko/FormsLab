import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';

const ThankyouPage = () => {
  const { t } = useTranslation('thankyou');

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
          <span className="text-[#A5B4FC]">
            {t('secondPartHeading')}
          </span>
        </h1>
        <p className="mx-auto mb-6 mt-4 max-w-lg text-xl text-zinc-600">
          {t('content')}
        </p>
      </div>
    </>
  );
};

export default ThankyouPage;
