import React, { LegacyRef, PropsWithChildren } from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';
import { ButtonProps, ButtonSize, ButtonVariant } from '../Button/Button';

export const IconButtonLinkVariant = ButtonVariant;
export const IconButtonLinkSize = ButtonSize;
interface IconButtonLinkProps extends ButtonProps {
  onClick?: () => void;
}

const IconButtonLink = (
  {
    children,
    className,
    variant = IconButtonLinkVariant.SECONDARY,
    sizeType = IconButtonLinkSize.DEFAULT,
    icon,
    ...props
  }: PropsWithChildren<IconButtonLinkProps>,
  ref: LegacyRef<HTMLAnchorElement>
) => {
  return (
    <a
      ref={ref}
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
    </a>
  );
};

export default forwardRef(IconButtonLink);
