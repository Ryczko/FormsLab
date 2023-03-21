import clsx from 'clsx';
import { LegacyRef } from 'react';
import { forwardRef } from 'react';
import { ButtonProps } from '../Button/Button';
import { ButtonSize, ButtonVariant } from '../Button/Button';

export const ButtonLinkVariant = ButtonVariant;
export const ButtonLinkSize = ButtonSize;

interface ButtonLinkProps extends ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const ButtonLink = (
  {
    children,
    className,
    variant = ButtonLinkVariant.SECONDARY,
    sizeType = ButtonLinkSize.DEFAULT,
    ...props
  }: ButtonLinkProps,
  ref: LegacyRef<HTMLAnchorElement>
) => (
  <a
    {...props}
    ref={ref}
    className={clsx('btn', variant, sizeType, 'hover:no-underline', className)}
  >
    {children}
  </a>
);

export default forwardRef(ButtonLink);
