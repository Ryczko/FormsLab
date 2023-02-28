type Props = {
  children: React.ReactNode;
};

export default function Header({ children }: Props) {
  return (
    <h1 className="mx-auto max-w-4xl pb-8 text-center text-3xl font-bold md:text-4xl">
      {children}
    </h1>
  );
}
