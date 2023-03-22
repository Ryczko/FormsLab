import React from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';
import { ButtonProps, ButtonSize, ButtonVariant } from '../Button/Button';

export const IconButtonLinkVariant = ButtonVariant;
export const IconButtonLinkSize = ButtonSize;

type IconButtonLinkProps = ButtonProps;

const IconButtonLink = forwardRef(function ButtonLink(
  {
    children,
    className,
    variant = IconButtonLinkVariant.SECONDARY,
    sizeType = IconButtonLinkSize.DEFAULT,
    icon,
    ...props
  }: IconButtonLinkProps & React.HTMLProps<HTMLAnchorElement>,
  _ref
) {
  return (
    <a
      {...props}
      className={clsx(
        'btn',
        'hover:no-underline',
        'flex items-center justify-center',
        variant,
        sizeType,
        className
      )}
    >
      <div className="px-1">{icon}</div>
      {children}
    </a>
  );
});

export default IconButtonLink;
