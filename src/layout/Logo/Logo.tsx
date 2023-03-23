import clsx from 'clsx';
import Link from 'next/link';

interface LogoProps {
  classNames?: string;
}

function Logo({ classNames = '' }: LogoProps) {
  return (
    <Link href={'/'} passHref>
      <a
        href={'/'}
        className={clsx(
          'block translate-y-[-2px] font-serif text-2xl text-zinc-600 xsm:ml-14 md:ml-11',
          classNames
        )}
      >
        Employee Pulse
      </a>
    </Link>
  );
}

export default Logo;
