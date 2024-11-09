import clsx from 'clsx';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import {
  ButtonProps,
  ButtonSize,
  ButtonVariant,
} from 'shared/components/Button/Button';
import { UrlObject } from 'url';

export const ButtonLinkVariant = ButtonVariant;
export const ButtonLinkSize = ButtonSize;

interface ButtonLinkProps extends ButtonProps {
  onClick?: () => void;
  href: string | UrlObject;
  target?: string;
}

const ButtonLink = ({
  children,
  className,
  href,
  variant = ButtonLinkVariant.SECONDARY,
  sizeType = ButtonLinkSize.DEFAULT,
  target,
  icon,
  ...props
}: PropsWithChildren<ButtonLinkProps>) => (
  <Link
    href={href}
    target={target}
    {...props}
    scroll={false}
    className={clsx(
      'btn relative flex items-center justify-center',
      variant,
      sizeType,
      className
    )}
  >
    {!!icon && <div className={children ? 'pr-1' : 'px-1'}>{icon}</div>}
    {children}
  </Link>
);

export default ButtonLink;
