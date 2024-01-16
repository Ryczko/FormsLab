import React from 'react';

interface NoteProps {
  title: string;
  description: string;
}

export default function Note({ title, description }: NoteProps) {
  return (
    <div
      className="mb-3 rounded-sm border-l-4 border-indigo-500 bg-indigo-100 px-4 py-2 text-left text-xs text-indigo-700"
      role="alert"
    >
      <p className="font-bold">{title}</p>
      <p>{description}</p>
    </div>
  );
}
