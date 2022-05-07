import clsx from 'clsx';
import { Link } from 'react-router-dom';

interface LogoProps {
  classNames?: string;
}

function Logo({ classNames = '' }: LogoProps) {
  return (
    <Link
      to={'/'}
      className={clsx(
        'flex items-center font-serif text-2xl text-zinc-600',
        classNames
      )}
    >
      Employee Pulse
    </Link>
  );
}

export default Logo;
