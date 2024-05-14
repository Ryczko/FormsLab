import React, { PropsWithChildren } from 'react';

export default function StandardPageWrapper({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto mb-4 mt-[60px] w-full max-w-[58rem] px-4 py-8">
      {children}
    </div>
  );
}
