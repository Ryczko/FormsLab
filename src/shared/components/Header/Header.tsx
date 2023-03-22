import { PropsWithChildren } from 'react';

export default function Header({ children }: PropsWithChildren) {
  return (
    <h1 className="mx-auto max-w-4xl pb-8 text-center text-2xl font-bold md:text-4xl">
      {children}
    </h1>
  );
}
