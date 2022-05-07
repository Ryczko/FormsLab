type Props = {
  children: React.ReactNode;
};

export default function Header({ children }: Props) {
  return (
    <h1 className="text-3xl pb-6 font-bold max-w-4xl mx-auto text-center md:text-4xl">
      {children}
    </h1>
  );
}
