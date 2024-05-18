import React from 'react';
import { QuestionType } from '@prisma/client';
import ChoiceIcon from 'shared/components/QuestionTypeIcons/ChoiceIcon';
import EmojiIcon from 'shared/components/QuestionTypeIcons/EmojiIcon';
import InputIcon from 'shared/components/QuestionTypeIcons/InputIcon';
import RateIcon from 'shared/components/QuestionTypeIcons/RateIcon';
import { Tooltip } from 'react-tooltip';
import useTranslation from 'next-translate/useTranslation';

interface QuestionTypeIconsProps {
  index: number;
  type: QuestionType;
}

export default function QuestionTypeIcons({
  type,
  index,
}: QuestionTypeIconsProps) {
  const { t } = useTranslation('common');

  return (
    <>
      <Tooltip
        className="z-10"
        id={`my-tooltip-${index}`}
        place="bottom"
        positionStrategy="fixed"
      >
        {`${t(`questionType.${type.toLowerCase()}`)} ${t(
          'questionType.question'
        )}`}
      </Tooltip>
      <div
        className="mx-1 flex h-[38px] w-[25px] items-center justify-center px-[1px] text-gray-400"
        data-tooltip-id={`my-tooltip-${index}`}
      >
        {type === QuestionType.EMOJI && <EmojiIcon />}
        {type === QuestionType.INPUT && <InputIcon />}
        {type === QuestionType.CHOICE && <ChoiceIcon />}
        {type === QuestionType.RATE && <RateIcon />}
      </div>
    </>
  );
}
