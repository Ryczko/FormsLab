import clsx from 'clsx';
import Image from 'next/image';
import { PropsWithChildren } from 'react';
import Loader from 'shared/components/Loader/Loader';

interface LoginButtonProps {
  image?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  isLoading?: boolean;
}

function LoginButton({
  image,
  children,
  onClick,
  type = 'button',
  className,
  isLoading,
  ...props
}: PropsWithChildren<LoginButtonProps>) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className={clsx(
        'btn relative my-1 flex w-full items-center justify-center rounded-lg border bg-white py-2 pl-2 pr-4 font-semibold text-zinc-900 shadow-sm hover:bg-zinc-50  active:bg-zinc-50',
        className
      )}
      {...props}
    >
      {image && (
        <Image
          className="ml-2 mr-[10px] block"
          width={24}
          height={24}
          src={image}
          alt={image}
        />
      )}
      {children}
      {isLoading && (
        <Loader
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
          isLoading
        />
      )}
    </button>
  );
}

export default LoginButton;
