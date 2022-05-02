type Props = {
  children: React.ReactNode;
};

export default function Header({ children }: Props) {
  return (
    <h1 className="text-3xl pb-6 font-bold text-center md:text-4xl">
      {children}
    </h1>
  );
}
