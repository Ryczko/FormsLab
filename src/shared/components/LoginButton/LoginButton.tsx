import clsx from 'clsx';
import Image from 'next/image';

interface LoginButtonProps {
  image?: string;
  onClick?: () => void;
  children: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

function LoginButton({
  image,
  children,
  onClick,
  type = 'button',
  className,
  ...props
}: LoginButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        className,
        'flex justify-center items-center py-2 pr-4 pl-2 my-1 w-full font-semibold text-zinc-900 bg-white hover:bg-zinc-50 active:bg-zinc-50 rounded-lg  shadow'
      )}
      {...props}
    >
      {image && (
        <Image
          className="block mr-6 ml-2"
          width="45px"
          height="24px"
          src={image}
        />
      )}
      {children}
    </button>
  );
}

export default LoginButton;
