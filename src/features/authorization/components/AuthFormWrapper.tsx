import React, { PropsWithChildren } from 'react';

export default function AuthFormWrapper({ children }: PropsWithChildren) {
  return (
    <section className="mx-auto flex flex-col items-center justify-center lg:mt-6">
      <div className="mt-4 w-full rounded-lg border bg-white p-6 shadow-sm sm:max-w-md">
        {children}
      </div>
    </section>
  );
}
