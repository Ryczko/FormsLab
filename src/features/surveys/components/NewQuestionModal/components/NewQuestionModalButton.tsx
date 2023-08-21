import React from 'react';
import Button from 'shared/components/Button/Button';

interface NewQuestionModalButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  text: string;
}

export default function NewQuestionModalButton({
  onClick,
  icon,
  text,
}: NewQuestionModalButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="flex flex-col p-4 text-center sm:w-[160px]"
    >
      <div className="mb-[2px] w-[18px]">{icon}</div>
      {text}
    </Button>
  );
}
