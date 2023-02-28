import Image from 'next/image';

interface LoginButtonProps {
  image: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

function LoginButton({
  image,
  children,
  onClick,
  type = 'button',
  ...props
}: LoginButtonProps & React.HTMLProps<HTMLButtonElement>) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="flex w-full items-center justify-center rounded-lg border bg-white py-2 pr-4 pl-2 font-semibold text-zinc-900 shadow hover:bg-zinc-50 active:bg-zinc-50 sm:w-[240px]"
      {...props}
    >
      <Image
        className="mr-6 ml-2 block"
        width="45px"
        height="24px"
        src={image}
      />
      {children}
    </button>
  );
}

export default LoginButton;
