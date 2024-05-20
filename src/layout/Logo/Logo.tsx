import Link from 'next/link';
import logo from '../../../public/images/logo.svg';
import Image from 'next/image';
import { useApplicationContext } from 'features/application/context';

interface LogoProps {
  width?: number;
  height?: number;
}

function Logo({ width = 115, height = 50 }: LogoProps) {
  const { user } = useApplicationContext();

  return (
    <div className="flex cursor-pointer items-center">
      <Link href={user ? '/surveys' : '/'} scroll={false}>
        <Image src={logo} alt="logo" width={width} height={height} />
      </Link>
    </div>
  );
}

export default Logo;
