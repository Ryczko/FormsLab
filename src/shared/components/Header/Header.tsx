interface HeaderProps {
  children: React.ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return (
    <h1 className="mx-auto max-w-4xl pb-8 text-center text-2xl font-bold md:text-4xl">
      {children}
    </h1>
  );
}
