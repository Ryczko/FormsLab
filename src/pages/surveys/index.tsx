import { DocumentData, Timestamp } from 'firebase/firestore';
import Image from 'next/image';
import Head from 'next/head';
import { formatDateDistance } from 'shared/utilities/convertTime';
import withAnimation from 'shared/HOC/withAnimation';
import withProtectedRoute from 'shared/HOC/withProtectedRoute';
import Header from 'shared/components/Header/Header';
import Loader from 'shared/components/Loader/Loader';
import SurveyRow from 'features/surveys/components/SurveyRow/SurveyRow';
import { useSurveyListManager } from 'features/surveys/managers/surveyListManager';
import NoSurveys from '../../../public/images/no-surveys.svg';
import Link from 'next/link';
import Button, { ButtonVariant } from 'shared/components/Button/Button';
import ButtonLink from 'shared/components/ButtonLink/ButtonLink';
import usePagination from 'features/surveys/hooks/usePagination';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/outline';
import useTranslation from 'next-translate/useTranslation';

function SurveyListPage() {
  const { error, loading, surveysCollection } = useSurveyListManager();
  const { items, canGoNext, canGoPrev, goNext, goPrev, pageIndex } =
    usePagination<DocumentData>(surveysCollection?.docs ?? [], { size: 10 });
  const { t } = useTranslation('surveys');

  return (
    <>
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content={t('content')} />
      </Head>

      <Header>{t('heading')}</Header>

      <div className="flex flex-col items-center justify-center">
        <div>
          {error && <strong>{t('headingError')}</strong>}
          {loading && <Loader isLoading={true} />}
        </div>
        {surveysCollection &&
          (items?.length > 0 ? (
            items.map((doc) => {
              const survey = doc.data();
              return (
                <SurveyRow
                  key={doc.id}
                  id={doc.id}
                  question={survey.title}
                  createDate={formatDateDistance(
                    survey.createDate as Timestamp
                  )}
                ></SurveyRow>
              );
            })
          ) : (
            <>
              <Image
                className="mt-2 w-[200px] -translate-x-3"
                src={NoSurveys}
                alt="no surveys"
                width="200"
                height="125"
              />
              <p className="my-8">{t('noSurveys')}</p>
              <Link href={'/survey/create'} passHref>
                <ButtonLink
                  variant={ButtonVariant.OUTLINE_PRIMARY}
                  className="w-full sm:w-auto"
                >
                  {t('buttonCreateSurvey')}
                </ButtonLink>
              </Link>
            </>
          ))}
      </div>
      {(canGoNext || canGoPrev) && (
        <div className="flex justify-center">
          <div className="flex flex-row items-center">
            <Button
              variant={ButtonVariant.OUTLINE_PRIMARY}
              className="px-4"
              icon={<ArrowLeftIcon className="h-5 w-5" />}
              disabled={!canGoPrev}
              onClick={goPrev}
            />
            <div className="min-w-[100px]">
              <p className="text-center">{pageIndex + 1}</p>
            </div>
            <Button
              variant={ButtonVariant.OUTLINE_PRIMARY}
              className="px-4"
              icon={<ArrowRightIcon className="h-5 w-5" />}
              disabled={!canGoNext}
              onClick={goNext}
            />
          </div>
        </div>
      )}
    </>
  );
}
export default withProtectedRoute(withAnimation(SurveyListPage));
