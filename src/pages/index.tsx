import Head from 'next/head';
import ButtonLink from 'shared/components/ButtonLink/ButtonLink';
import { ButtonVariant } from 'shared/components/Button/Button';
import useTranslation from 'next-translate/useTranslation';
import { StarIcon } from '@heroicons/react/solid';
import { InferGetServerSidePropsType } from 'next';
import MainSection from 'features/application/components/MainSection';
import StandardPageWrapper from 'layout/StandardPageWrapper';
import withAnimation from 'shared/HOC/withAnimation';

export async function getServerSideProps() {
  const repositoryData = await fetch(
    'https://api.github.com/repos/Ryczko/Formslab'
  ).then((res) => res.json());

  return {
    props: {
      repositoryData,
    },
  };
}

function IndexPage({
  repositoryData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation('home');

  return (
    <StandardPageWrapper>
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content={t('content')} />
      </Head>
      <div className="pt-12 sm:pt-16">
        <h1 className="leading-tighter mb-4 text-3xl font-extrabold tracking-tighter text-secondary-900 sm:text-4xl md:text-6xl">
          {t('firstPartHeading')}&nbsp;
          <span className="text-indigo-400">{t('secondPartHeading')}</span>
        </h1>
        <p className="text-md mx-auto mb-6 mt-4 max-w-lg text-zinc-600 sm:text-lg md:text-xl">
          {t('Description')}
        </p>

        <div className="mb-16 flex flex-col space-y-2 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
          <ButtonLink
            href="https://github.com/Ryczko/FormsLab"
            target="_blank"
            className="flex w-full items-center justify-center sm:w-[250px]"
            variant={ButtonVariant.PRIMARY}
          >
            {t('star')}{' '}
            {repositoryData?.stargazers_count && (
              <>
                ({repositoryData.stargazers_count}{' '}
                <StarIcon className="h-4 w-4" />)
              </>
            )}
          </ButtonLink>

          <ButtonLink
            href={'/survey/create'}
            data-test-id="create-survey"
            variant={ButtonVariant.OUTLINE_PRIMARY}
            className="w-full sm:w-[230px]"
          >
            {t('buttonCreateSurvey')}
          </ButtonLink>
        </div>

        <hr />

        <MainSection
          image="/images/creator.webp"
          alt="creating survey"
          title={t('createTitle')}
          description={t('createDescription')}
        />
        <MainSection
          image="/images/answering.webp"
          alt="creating survey"
          title={t('answerTitle')}
          description={t('answerDescription')}
          reversed
        />
        <MainSection
          image="/images/results.webp"
          alt="creating survey"
          title={t('resultTitle')}
          description={t('resultDescription')}
        />
      </div>
    </StandardPageWrapper>
  );
}

export default withAnimation(IndexPage);
