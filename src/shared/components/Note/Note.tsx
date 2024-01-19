import clsx from 'clsx';
import React from 'react';

interface NoteProps {
  title: string;
  description: string;
  classNames?: string;
}

export default function Note({ title, description, classNames }: NoteProps) {
  return (
    <div
      className={clsx(
        'mb-3 rounded-sm border-l-4 border-indigo-500 bg-indigo-100 px-4 py-2 text-left text-xs text-indigo-700',
        classNames
      )}
      role="alert"
    >
      <p className="font-bold">{title}</p>
      <p>{description}</p>
    </div>
  );
}
