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
          'block font-serif text-2xl text-zinc-600 translate-y-[-2px] md:ml-11 small-sm:ml-14',
          classNames
        )}
      >
        Employee Pulse
      </a>
    </Link>
  );
}

export default Logo;
