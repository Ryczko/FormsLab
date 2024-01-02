import React from 'react';
import { QuestionType } from '@prisma/client';
import ChoiceIcon from 'shared/components/QuestionTypeIcons/ChoiceIcon';
import EmojiIcon from 'shared/components/QuestionTypeIcons/EmojiIcon';
import InputIcon from 'shared/components/QuestionTypeIcons/InputIcon';
import RateIcon from 'shared/components/QuestionTypeIcons/RateIcon';

interface QuestionTypeIconsProps {
  type: QuestionType;
}

export default function QuestionTypeIcons({ type }: QuestionTypeIconsProps) {
  return (
    <div className="mx-1 flex h-[42px] w-[26px] items-center justify-center px-[1px] text-gray-400">
      {type === QuestionType.EMOJI && <EmojiIcon />}
      {type === QuestionType.INPUT && <InputIcon />}
      {type === QuestionType.CHOICE && <ChoiceIcon />}
      {type === QuestionType.RATE && <RateIcon />}
    </div>
  );
}
