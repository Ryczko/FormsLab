import { PropsWithChildren } from 'react';

export default function Header({ children }: PropsWithChildren) {
  return (
    <h1 className="pb-6 text-center text-2xl font-bold md:text-3xl">
      {children}
    </h1>
  );
}
