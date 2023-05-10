import clsx from 'clsx';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import {
  ButtonProps,
  ButtonSize,
  ButtonVariant,
} from 'shared/components/Button/Button';

export const ButtonLinkVariant = ButtonVariant;
export const ButtonLinkSize = ButtonSize;

interface ButtonLinkProps extends ButtonProps {
  onClick?: () => void;
  href: string;
}

const ButtonLink = ({
  children,
  className,
  href,
  variant = ButtonLinkVariant.SECONDARY,
  sizeType = ButtonLinkSize.DEFAULT,
  ...props
}: PropsWithChildren<ButtonLinkProps>) => (
  <Link
    href={href}
    {...props}
    className={clsx('btn', variant, sizeType, 'hover:no-underline', className)}
  >
    {children}
  </Link>
);

export default ButtonLink;
