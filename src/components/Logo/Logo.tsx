import clsx from 'clsx';
import Link from 'next/link';

interface LogoProps {
  classNames?: string;
}

function Logo({ classNames = '' }: LogoProps) {
  return (
    <Link href={'/'} className={'flex items-center'} passHref>
      <a
        className={clsx('block font-serif text-2xl text-zinc-600', classNames)}
      >
        Employee Pulse
      </a>
    </Link>
  );
}

export default Logo;
