import React from 'react';
import AvatarIcon from '/public/images/avatar.svg';
import Image from 'next/image';
import clsx from 'clsx';

interface AvatarProps {
  src?: string | null;
  size?: number;
  classNames?: string;
}

export default function Avatar({ src, size = 32, classNames }: AvatarProps) {
  return (
    <Image
      src={src ? src : AvatarIcon}
      alt="user photo"
      width={size}
      height={size}
      className={clsx('rounded-full bg-white', classNames)}
    />
  );
}
