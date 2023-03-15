interface HeaderProps {
  children: React.ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return (
    <h1 className="pb-8 mx-auto max-w-4xl text-3xl font-bold text-center md:text-4xl">
      {children}
    </h1>
  );
}
