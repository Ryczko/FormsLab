import Link from 'next/link';
import logo from '../../../public/images/logo.svg';
import Image from 'next/image';

interface LogoProps {
  width?: number;
  height?: number;
}

function Logo({ width = 160, height = 50 }: LogoProps) {
  return (
    <div className="flex translate-y-[2px] cursor-pointer items-center">
      <Link href={'/'}>
        <Image src={logo} alt="logo" width={width} height={height} />
      </Link>
    </div>
  );
}

export default Logo;
