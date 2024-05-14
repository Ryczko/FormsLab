import React, { PropsWithChildren } from 'react';

export default function ExternalPageWrapper({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto flex w-full max-w-[54rem] flex-grow items-center justify-center px-4 py-8">
      {children}
    </div>
  );
}
