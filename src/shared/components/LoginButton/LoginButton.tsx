import Image from 'next/image';

interface LoginButtonProps {
  image: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
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
      className="flex justify-center items-center py-2 pr-4 pl-2 w-full font-semibold text-zinc-900 bg-white hover:bg-zinc-50 active:bg-zinc-50 rounded-lg border shadow sm:w-[240px]"
      {...props}
    >
      <Image
        className="block mr-6 ml-2"
        width="45px"
        height="24px"
        src={image}
      />
      {children}
    </button>
  );
}

export default LoginButton;
