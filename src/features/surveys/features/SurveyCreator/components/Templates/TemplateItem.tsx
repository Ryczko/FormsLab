import React from 'react';
import { Template } from 'features/surveys/features/SurveyCreator/components/Templates/Templates';
import clsx from 'clsx';
import Button, { ButtonVariant } from 'shared/components/Button/Button';

interface TemplateItemProps {
  template?: Template;
  title?: string;
  onTemplatePreview?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onTemplatePick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isInPreview: boolean;
  buttonContent?: string;
}

export default function TemplateItem({
  template,
  title,
  onTemplatePreview,
  onTemplatePick,
  isInPreview,
  buttonContent,
}: TemplateItemProps) {
  return (
    <div
      onClick={(e) => onTemplatePreview?.(e)}
      className={clsx(
        'flex h-[140px] flex-grow cursor-pointer flex-col items-center rounded border border-zinc-600/50 px-4 pb-4 shadow',
        template ? 'border-solid bg-zinc-50' : 'bg-white',
        isInPreview ? 'pt-2' : 'pt-4'
      )}
    >
      <div className="flex grow items-center">{title || 'Blank'}</div>
      {isInPreview && (
        <Button
          className="w-full"
          variant={ButtonVariant.PRIMARY}
          onClick={(e) => onTemplatePick(e)}
        >
          {buttonContent || 'Use Template'}
        </Button>
      )}
    </div>
  );
}
