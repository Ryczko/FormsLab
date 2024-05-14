import React, { useEffect, useState } from 'react';
import { Survey } from '@prisma/client';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/outline';
import SurveyRow from 'features/surveys/features/SurveyList/components/SurveyRow/SurveyRow';
import usePagination from 'features/surveys/hooks/usePagination';
import Button, { ButtonVariant } from 'shared/components/Button/Button';
import ButtonLink from 'shared/components/ButtonLink/ButtonLink';
import { formatDateDistance } from 'shared/utilities/convertTime';
import { getFetch } from '../../../../../lib/axiosConfig';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import NoSurveys from '/public/images/no-surveys.svg';
import { useApplicationContext } from 'features/application/context';
import { Page } from 'features/application/types/Page';

interface SurveyListProps {
  initialData: Survey[];
}

export default function SurveyList({ initialData }: SurveyListProps) {
  const { setActivePage } = useApplicationContext();
  const { t } = useTranslation('surveys');

  const [surveysData, setSurveysData] = useState<Survey[]>(initialData);

  const { items, canGoNext, canGoPrev, goNext, goPrev, pageIndex } =
    usePagination<Survey>(surveysData ?? [], { size: 7 });

  useEffect(() => {
    setActivePage(Page.SURVEYS_LIST);

    return () => {
      setActivePage(undefined);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (items.length === 0) {
      goPrev();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const refreshSurveys = async () => {
    const surveys = await getFetch<{ surveys: Survey[] }>('/api/survey');
    setSurveysData(surveys.surveys);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        {initialData &&
          (items?.length > 0 ? (
            items.map((item) => {
              return (
                <SurveyRow
                  key={item.id}
                  id={item.id}
                  question={item.title}
                  refreshSurveys={refreshSurveys}
                  createDate={formatDateDistance(item.createdAt)}
                ></SurveyRow>
              );
            })
          ) : (
            <>
              <Image
                className="mt-2 w-[160px] -translate-x-1"
                src={NoSurveys}
                alt="no surveys"
                height={165}
              />
              <p className="my-6">{t('noSurveys')}</p>
              <ButtonLink
                href={'/survey/create'}
                variant={ButtonVariant.PRIMARY}
                className="w-full sm:w-[200px]"
              >
                {t('buttonCreateSurvey')}
              </ButtonLink>
            </>
          ))}
      </div>
      {(canGoNext || canGoPrev) && (
        <div className="mt-2 flex flex-row items-center justify-center">
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
      )}
    </>
  );
}
