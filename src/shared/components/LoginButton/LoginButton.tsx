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
      // eslint-disable-next-line react/button-has-type
      type={type}
      onClick={onClick}
      className={clsx(
        className,
        'my-1 flex w-full items-center justify-center rounded-lg bg-white py-2 pr-4 pl-2 font-semibold text-zinc-900 shadow hover:bg-zinc-50  active:bg-zinc-50'
      )}
      {...props}
    >
      {image && (
        <Image
          className="mr-6 ml-2 block"
          width="45px"
          height="24px"
          src={image}
          alt={image}
        />
      )}
      {children}
    </button>
  );
}

export default LoginButton;
