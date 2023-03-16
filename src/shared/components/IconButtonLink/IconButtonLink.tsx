import type React from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';
import {
  IconButtonProps,
  IconButtonSize,
  IconButtonVariant,
} from '../IconButton/IconButton';

export const IconButtonLinkVariant = IconButtonVariant;
export const IconButtonLinkSize = IconButtonSize;

type IconButtonLinkProps = IconButtonProps;

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
        'flex items-center w-fit',
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
