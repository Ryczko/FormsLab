import React, { PropsWithChildren } from 'react';
import clsx from 'clsx';
import {
  ButtonProps,
  ButtonSize,
  ButtonVariant,
} from 'shared/components/Button/Button';
import Link from 'next/link';

export const IconButtonLinkVariant = ButtonVariant;
export const IconButtonLinkSize = ButtonSize;
interface IconButtonLinkProps extends ButtonProps {
  onClick?: () => void;
  href: string;
}

const IconButtonLink = ({
  children,
  className,
  variant = IconButtonLinkVariant.SECONDARY,
  sizeType = IconButtonLinkSize.DEFAULT,
  icon,
  href,
  ...props
}: PropsWithChildren<IconButtonLinkProps>) => {
  return (
    <Link
      href={href}
      {...props}
      className={clsx(
        'btn',
        'hover:no-underline',
        'flex items-center',
        variant,
        sizeType,
        className
      )}
    >
      <div className="px-1">{icon}</div>
      {children}
    </Link>
  );
};

export default IconButtonLink;
