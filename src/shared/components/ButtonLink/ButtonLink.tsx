import clsx from 'clsx';
import { LegacyRef, PropsWithChildren } from 'react';
import { forwardRef } from 'react';
import {
  ButtonProps,
  ButtonSize,
  ButtonVariant,
} from 'shared/components/Button/Button';

export const ButtonLinkVariant = ButtonVariant;
export const ButtonLinkSize = ButtonSize;

interface ButtonLinkProps extends ButtonProps {
  onClick?: () => void;
}

const ButtonLink = (
  {
    children,
    className,
    variant = ButtonLinkVariant.SECONDARY,
    sizeType = ButtonLinkSize.DEFAULT,
    ...props
  }: PropsWithChildren<ButtonLinkProps>,
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
