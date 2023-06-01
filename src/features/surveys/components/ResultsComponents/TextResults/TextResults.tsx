import React from 'react';
import AnswerTableRow from 'features/surveys/components/AnswerTableRow/AnswerTableRow';
import usePagination from 'features/surveys/hooks/usePagination';
import Button, { ButtonVariant } from 'shared/components/Button/Button';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/outline';
import { MappedAnswerData } from 'types/MappedAnswerData';

type TextResultsProps = {
  answers: MappedAnswerData[];
};

export default function TextResults({ answers }: TextResultsProps) {
  const { items, canGoNext, canGoPrev, goNext, goPrev, pageIndex } =
    usePagination(answers, { size: 5 });

  return (
    <div>
      {items.map((answer, index) => (
        <AnswerTableRow key={index} answer={answer} />
      ))}

      {(canGoNext || canGoPrev) && (
        <div className="mt-6 flex items-center justify-center">
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
    </div>
  );
}
