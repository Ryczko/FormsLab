import React, { PropsWithChildren } from 'react';

export default function FullPageWrapper({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto mt-[60px] flex w-full flex-grow items-stretch">
      {children}
    </div>
  );
}
