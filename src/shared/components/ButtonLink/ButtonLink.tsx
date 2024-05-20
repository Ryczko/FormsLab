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
  target?: string;
  position?: 'start' | 'center' | 'end';
}

const ButtonLink = ({
  children,
  className,
  href,
  variant = ButtonLinkVariant.SECONDARY,
  sizeType = ButtonLinkSize.DEFAULT,
  position = 'center',
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
      'btn relative flex items-center',
      position === 'start' && 'justify-start',
      position === 'center' && 'justify-center',
      position === 'end' && 'justify-end',
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
