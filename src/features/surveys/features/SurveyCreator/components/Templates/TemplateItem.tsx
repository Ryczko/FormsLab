import React from 'react';
import clsx from 'clsx';

interface TemplateItemProps {
  title?: string;
  onTemplatePreview?: (event: React.MouseEvent<HTMLDivElement>) => void;
  fieldTestSelector?: string;
}

export default function TemplateItem({
  title,
  onTemplatePreview,
  fieldTestSelector,
}: TemplateItemProps) {
  return (
    <div
      onClick={(e) => onTemplatePreview?.(e)}
      data-test-id={fieldTestSelector}
      className={clsx(
        'flex h-[60px] flex-grow cursor-pointer flex-col items-center rounded border border-zinc-300 bg-white px-4 hover:bg-zinc-50'
      )}
    >
      <div className="flex grow items-center text-sm">
        {title || 'Blank form'}
      </div>
    </div>
  );
}
